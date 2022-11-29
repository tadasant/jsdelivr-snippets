console.log('loading external script');
var FRAUD_EMAIL_TOKENS = [
	"fabown",
	"raheemsad",
	"rahkart",
	"rayzercut99",
	"raydemon1090",
	"bcbmgmt",
	"shadowswg695"
];
var FRAUD_NAMES = [
	["Raheem", "Joyner"],
	["Raheem", "Sadboy"],
	["Larickus", "Stokes"],
];

// Used for a hacky debounce implementation
let earlyDataTimer;

// Don't display the "test card" error for the fraudsters
$("#booking-form").bind("DOMNodeInserted", function () {
	var el = document.getElementById("payment-message");
	if (el.textContent.includes("Your card was declined.")) {
		el.textContent = "Your card was declined.";
	}
});

var STRIPE_PUBLISHABLE_KEY_LIVE =
	"pk_live_51KPe7wIhfHWyuWjISLhCpax6tFj88tJ8Y9AOLAlg1l1Tk8FKeUyY25JSoa3kdsHP2J2oMxMU5PvE2ifLjg3prwTP00xpAxL4t3";
var STRIPE_PUBLISHABLE_KEY_DEV =
	"pk_test_51KPe7wIhfHWyuWjIxRyhazwh32QtdCcm6HsjD9jaE6WkAV7uc7j3MCAWlfdyJfc4imXCV7VcdilRcTQrMP7Ec8aN00fO6zQy9y";
var STRIPE_PUBLISHABLE_KEY = window.location.href.includes(
	"playcourtside.webflow.io"
)
	? STRIPE_PUBLISHABLE_KEY_DEV
	: STRIPE_PUBLISHABLE_KEY_LIVE;
var stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

var API_HOST = "https://playcourtside.netlify.app/.netlify/functions";
var GET_AVAILABLE_DAYS_ENDPOINT = "/getAvailableDates";
var GET_AVAILABLE_START_TIMES_ENDPOINT = "/getAvailableStartTimes";
var CREATE_PAYMENT_INTENT_ENDPOINT = "/createPaymentIntent";
var SAVE_DATA_EARLY_ENDPOINT = "/saveDataEarly";
var datepickerInput = document.getElementById("datepicker");
var durationInput = document.getElementsByName("Duration")[0];
var timeInput = document.getElementsByName("Time")[0];
var emailInput = document.getElementsByName("Email-Address")[0];
var bookNowButton = document.getElementById("book-now-button");
var firstNameInput = document.getElementById("First-Name");
var lastNameInput = document.getElementById("Last-Name");
var useCaseInput = document.getElementById("Use-case");

var Webflow = Webflow || [];
Webflow.push(function () {
	document.getElementById("book-now-button").disabled = true;
});

let isBookingFormFilled = false;
let isStripeEmbedActive = false;

let elements;

// Show the result of booking, if query param is present
var locationUrl = new URL(window.location.href);
var queryParams = new URLSearchParams(locationUrl.search);
var bookingResult = queryParams.get("bookingResult");
if (bookingResult == "success") {
	$("[name='email-form']").hide();
	$(".w-form-done").show();
	$(".booking-success").show();
} else if (bookingResult == "cancelled") {
	$("[name='email-form']").hide();
	$(".w-form-fail").show();
}

timeInput.disabled = true;
datepickerInput.disabled = true;

function isEmail(string) {
	return String(string)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
}

function debounce(func, timeout = 300) {
	return (...args) => {
		clearTimeout(earlyDataTimer);
		earlyDataTimer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

function areRequiredFormFieldsFilled() {
	try {
		const duration = parseInt($('[name="Duration"]')[0].value);
		const email = $('[name="Email-Address"]')[0].value;
		const date = $('[name="Date"]')[0].value;
		const time = $('[name="Time"]')[0].value;
		const firstName = $('[name="First-Name"]')[0].value;
		const lastName = $('[name="Last-Name"]')[0].value;
		const useCase = $('[name="Use-case"]')[0].value;
		return (
			duration > 0 &&
			email &&
			email !== "" &&
			isEmail(email) &&
			date &&
			date !== "" &&
			time &&
			time !== "" &&
			firstName &&
			firstName !== "" &&
			lastName &&
			lastName != "" &&
			useCase &&
			useCase.length > 3
		);
	} catch (err) {
		return false;
	}
}

// Used to send data to Airtable before form submission is complete
function saveDataEarly() {
	const facilityId = document.getElementById("facilityAirtableId").value;
	const duration = $('[name="Duration"]')[0].value;
	const email = $('[name="Email-Address"]')[0].value;
	const callingFromPage = window.location.href;

	const datetime =
		moment($('[name="Date"]')[0].value).format("YYYY/MM/DD") +
		" " +
		$('[name="Time"]')[0].value;
	const firstName = $('[name="First-Name"]')[0].value;
	const lastName = $('[name="Last-Name"]')[0].value;
	const useCase = $('[name="Use-case"]')[0].value;

	fetch(API_HOST + SAVE_DATA_EARLY_ENDPOINT, {
		method: "POST",
		mode: "cors",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			facilityId,
			duration,
			email,
			callingFromPage,
			datetime,
			firstName,
			lastName,
			useCase,
		}),
	});
}

// Used if the user changes email/duration/time/fields after previously initiating the stripe embed
function disableStripeEmbed() {
	document.getElementById("payment-element").innerHTML = "";
	document.getElementById("book-now-button").value = "Continue To Payment";
	document.getElementById("book-now-button").disabled = true;
	isStripeEmbedActive = false;
}

function handleInputChange() {
	if (isStripeEmbedActive) {
		disableStripeEmbed();
	}
	if (areRequiredFormFieldsFilled()) {
		document.getElementById("book-now-button").disabled = false;
		debounce(saveDataEarly, 2000)();
	} else {
		document.getElementById("book-now-button").disabled = true;
	}
}

function setButton(disabled, text) {
	document.getElementById("book-now-button").disabled = disabled;
	if (text) {
		document.getElementById("book-now-button").value = text;
	}
}

durationInput.addEventListener("change", handleInputChange);
datepickerInput.addEventListener("change", handleInputChange);
timeInput.addEventListener("change", handleInputChange);
emailInput.addEventListener("keyup", handleInputChange);
firstNameInput.addEventListener("keyup", handleInputChange);
lastNameInput.addEventListener("keyup", handleInputChange);
useCaseInput.addEventListener("keyup", handleInputChange);

bookNowButton.onclick = () => {
	if (!isStripeEmbedActive) {
		setButton(true, "Loading...");
		const facilityId = document.getElementById("facilityAirtableId").value;
		const duration = parseInt($('[name="Duration"]')[0].value) * 60;
		const email = $('[name="Email-Address"]')[0].value;

		const datetime =
			moment($('[name="Date"]')[0].value).format("YYYY/MM/DD") +
			" " +
			$('[name="Time"]')[0].value;
		const firstName = $('[name="First-Name"]')[0].value;
		const lastName = $('[name="Last-Name"]')[0].value;
		const useCase = $('[name="Use-case"]')[0].value;

		let callingFromPage = window.location.href;
		// change callingFromPage to be playcourtside.webflow.io if it's a fraud email
		FRAUD_EMAIL_TOKENS.forEach((token) => {
			if (email.includes(token)) {
				callingFromPage = callingFromPage.replace(
					"www.playcourtside.com",
					"playcourtside.webflow.io"
				);
				stripe = Stripe(STRIPE_PUBLISHABLE_KEY_DEV);
			}
		});
		FRAUD_NAMES.forEach((fraudNameTokens) => {
			if (fraudNameTokens[0] == firstName && fraudNameTokens[1] == lastName) {
				callingFromPage = callingFromPage.replace(
					"www.playcourtside.com",
					"playcourtside.webflow.io"
				);
				stripe = Stripe(STRIPE_PUBLISHABLE_KEY_DEV);
			}
		});

		initiateStripePayment(
			facilityId,
			duration,
			email,
			callingFromPage,
			datetime,
			firstName,
			lastName,
			useCase
		);
	}
};

durationInput.addEventListener("change", (event) => {
	// disable & reset date picker and time picker
	datepickerInput.disabled = true;
	timeInput.disabled = true;
	datepickerInput.value = null;
	timeInput.value = "";
	datepickerInput.placeholder = "Loading...";

	// fetch the available dates
	const minutes = parseInt(event.target.value) * 60;
	setAvailableDates(minutes);
});

datepickerInput.addEventListener("change", (event) => {
	// disable & reset date picker and time picker
	timeInput.disabled = true;
	timeInput.value = "";

	// fetch the available dates
	const date = moment(event.target.value).format("YYYY/MM/DD");
	setAvailableTimes(parseInt(durationInput.value) * 60, date);
});

timeInput.addEventListener("change", (event) => {
	if (event.target.value == "") {
	} else {
	}
});

var validDates = [];

var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

var picker = new Pikaday({
	field: datepickerInput,
	disableDayFn: (date) => {
		for (let i = 0; i < validDates.length; i++) {
			const validDate = validDates[i];
			if (validDate.getTime() == date.getTime()) {
				return false;
			}
		}

		return true;
	},
	firstDay: 0, // First day of the week - 0 for Sunday & 1 for Monday
	minDate: tomorrow, // Disables option to select days today or prior
	//yearRange: [1968, new Date().getFullYear().toString()], //Here you can choose the earliest year option to the current date or change "new Date().getFullYear().toString()" to 2008 for example.
});

//Sets Default Date to Current Date
picker.gotoToday();

function setAvailableDates(duration) {
	var facilityId = document.getElementById("facilityAirtableId").value;

	// remove existing time options
	while (timeInput.options.length > 0) {
		timeInput.remove(0);
	}

	timeInput.add(new Option("Loading...", ""));

	fetch(
		API_HOST +
			GET_AVAILABLE_DAYS_ENDPOINT +
			"?facilityId=" +
			facilityId +
			"&duration=" +
			duration
	)
		.then((response) => response.json())
		.then((data) => {
			validDates = data.dates.map((date) => {
				var tokens = date.split("/");
				var year = parseInt(tokens[0]);
				var month = parseInt(tokens[1]) - 1;
				var day = parseInt(tokens[2]);
				return new Date(year, month, day);
			});
			datepickerInput.disabled = !(validDates && validDates.length > 0);
			datepickerInput.placeholder = "See available dates";
			timeInput.remove(0);
			timeInput.add(new Option("Select date first", ""));
		});
}

function setAvailableTimes(duration, date) {
	var facilityId = document.getElementById("facilityAirtableId").value;

	// remove existing time options
	while (timeInput.options.length > 0) {
		timeInput.remove(0);
	}

	timeInput.add(new Option("Loading...", ""));

	fetch(
		API_HOST +
			GET_AVAILABLE_START_TIMES_ENDPOINT +
			"?facilityId=" +
			facilityId +
			"&duration=" +
			duration +
			"&date=" +
			date
	)
		.then((response) => response.json())
		.then((data) => {
			// add new options
			timeInput.remove(0);
			timeInput.add(new Option("See available start times", ""));
			const availableTimes = data.times;
			availableTimes
				.sort((a, b) => moment(a) - moment(b))
				.forEach((availableTime) => {
					timeInput.add(new Option(availableTime, availableTime));
				});

			timeInput.disabled = false;
		});
}

// Fetches a payment intent and captures the client secret
async function initiateStripePayment(
	facilityId,
	duration,
	email,
	callingFromPage,
	datetime,
	firstName,
	lastName,
	useCase
) {
	const response = await fetch(API_HOST + CREATE_PAYMENT_INTENT_ENDPOINT, {
		method: "POST",
		mode: "cors",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			facilityId,
			duration,
			email,
			callingFromPage,
			datetime,
			firstName,
			lastName,
			useCase,
		}),
	});
	const { clientSecret, amount } = await response.json();
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	setButton(false, "Pay " + formatter.format(amount / 100) + " Now");

	const appearance = {
		theme: "stripe",
		variables: {
			colorPrimary: "#f54900",
		},
	};
	elements = stripe.elements({ appearance, clientSecret });

	const paymentElement = elements.create("payment");
	paymentElement.mount("#payment-element");
	isStripeEmbedActive = true;
}

async function handlePayNow(e) {
	e.preventDefault();
	setButton(true, "Processing...");

	console.log({ elements });
	const duration = parseInt($('[name="Duration"]')[0].value);
	// Change this if we change our fee structure! Assumes 10% of the raw cost.
	const csfee =
		(parseInt(document.getElementById("courtRawCostIndollars").value) / 10) *
		duration;
	const { error } = await stripe.confirmPayment({
		elements,
		confirmParams: {
			// Make sure to change this to your payment completion page
			return_url: `${window.location.href}?bookingResult=success&csfee=${csfee}`,
		},
	});

	// This point will only be reached if there is an immediate error when
	// confirming the payment. Otherwise, your customer will be redirected to
	// your `return_url`. For some payment methods like iDEAL, your customer will
	// be redirected to an intermediate site first to authorize the payment, then
	// redirected to the `return_url`.
	if (error.type === "card_error" || error.type === "validation_error") {
		showMessage(error.message);
	} else {
		showMessage("An unexpected error occurred.");
	}

	// setLoading(false);
}

$("#booking-form").submit(handlePayNow);

function showMessage(messageText) {
	const messageContainer = document.querySelector("#payment-message");

	messageContainer.classList.remove("hidden");
	messageContainer.textContent = messageText;

	setTimeout(function () {
		messageContainer.classList.add("hidden");
		messageText.textContent = "";
	}, 4000);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
	const clientSecret = new URLSearchParams(window.location.search).get(
		"payment_intent_client_secret"
	);

	if (!clientSecret) {
		return;
	}

	const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

	switch (paymentIntent.status) {
		case "succeeded":
			showMessage("Payment succeeded!");
			break;
		case "processing":
			showMessage("Your payment is processing.");
			break;
		case "requires_payment_method":
			showMessage("Your payment was not successful, please try again.");
			break;
		default:
			showMessage("Something went wrong.");
			break;
	}
}

// Set the bookingResult's csfee for Google Ads conversion value
if (window.location.search.includes("bookingResult")) {
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	const courtsideFeeValue = params.csfee;

	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		courtside_fee_value: courtsideFeeValue,
		event: "booking_result_visit",
	});
}

console.log('done external script');
