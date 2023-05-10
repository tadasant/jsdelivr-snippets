// set up my custom form flows

$(document).ready(function () {
	// Get Started redirect to Typeform
	const TYPEFORM_URL = "https://form.typeform.com/to/y3WNQWib";

	function submitWebflowGetStartedForm(formName, phoneValue) {
		// const WEBFLOW_SITE_ID = "639fbb2b3272142ce9a9c1dd";

		const formData = {
			name: formName,
			source: window.location.hostname,
			test: false,
			"fields[phone-number]": phoneValue,
			dolphin: false,
			medium: formName.toLowerCase().includes("sms") ? "SMS" : "WhatsApp",
		};

		const formDataString = Object.keys(formData)
			.map((key) => `${key}=${encodeURIComponent(formData[key])}`)
			.join("&");

		return fetch(`https://bend.englishbrain.app/api/receiveSignup`, {
			method: "POST",
			body: new URLSearchParams(formDataString),
		});
	}

	// find all the fake phone number forms
	const getStartedForms = $('div[data-fake-form="get-started"]');

	// find submit button within each form
	getStartedForms.each(function () {
		const getStartedButton = $(this).find("a");
		const phoneInput = $(this).find("input")[0];

		// attach event listener that pulls the fake form's input field into the modal's form & displays the modal
		getStartedButton[0].addEventListener("click", () => {
			const iniPhoneInput = window.intlTelInputGlobals.getInstance(phoneInput);

			if (iniPhoneInput.isValidNumber()) {
				// Fire GTM event for successful lead conversion
				const dataLayer = window.dataLayer || [];
				dataLayer.push({ event: "get_started_submit_confirmed" });
				const phoneValue = iniPhoneInput.getNumber();

				// if US country code...
				const countryValue = iniPhoneInput.getSelectedCountryData().iso2;
				if (countryValue === "us") {
					// only support SMS for US
					submitWebflowGetStartedForm("Get Started SMS - v2", phoneValue).then(
						() => {
							const resultUrl = `${TYPEFORM_URL}#phone_number=${phoneValue}`;
							// redirect to Typeform. If new-tab doesn't work, give the request 2s to go in flight
							window.open(resultUrl, "_blank") ||
								setTimeout(() => window.location.replace(resultUrl), 2000);
							setTimeout(
								() => window.location.replace("/signup-confirmation"),
								3000
							);
						}
					);
				} else {
					// only support Whatsapp for international
					submitWebflowGetStartedForm("Get Started WhatsApp", phoneValue).then(
						() => {
							const resultUrl = `${TYPEFORM_URL}#phone_number=${phoneValue}`;
							// redirect to Typeform. If new-tab doesn't work, give the request 2s to go in flight
							window.open(resultUrl, "_blank") ||
								setTimeout(() => window.location.replace(resultUrl), 2000);
							setTimeout(
								() => window.location.replace("/signup-confirmation"),
								3000
							);
						}
					);
				}
			} else {
				alert(
					"Invalid phone number. Please enter only numbers for your mobile / WhatsApp phone number. Example: 5551231234."
				);
			}
		});
	});

	const formGetStartedWhatsapp = $("#form-get-started-whatsapp");
	const formGetStartedSMS = $("#form-get-started-sms");

	function redirectOnSubmit(event) {
		event.preventDefault();
	}

	// redirect after the ajax is complete (and not before)
	$(document).ajaxComplete(function (event, xhr, settings) {
		if (
			settings.data &&
			settings.url &&
			settings.data.includes("Get+Started")
		) {
			const data = new URLSearchParams(settings.data);
			const phoneNumber = data.get("fields[phone-number]");

			const resultUrl = `${TYPEFORM_URL}#phone_number=${phoneNumber}`;
			window.open(resultUrl, "_blank") ||
				setTimeout(() => window.location.replace(resultUrl), 2000);
		}
	});

	formGetStartedWhatsapp.submit(redirectOnSubmit);
	formGetStartedSMS.submit(redirectOnSubmit);
});
