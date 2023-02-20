// Set up the international phone number selector
$(document).ready(function () {
	var inputs = document.querySelectorAll(`[name="Phone"]`);
	inputs.forEach((input) => {
		window.intlTelInput(input, {
			initialCountry: "auto",
			geoIpLookup: function (success, failure) {
				const res = localStorage.getItem("ENGLISHBRAIN_COUNTRY_FROM_IP");
				if (res) {
					success(res);
				} else {
					$.get("https://ipinfo.io", function () {}, "jsonp").always(function (
						resp
					) {
						var countryCode = resp && resp.country ? resp.country : "us";
						if (resp && resp.country) {
							localStorage.setItem(
								"ENGLISHBRAIN_COUNTRY_FROM_IP",
								resp.country
							);
						}
						success(countryCode);
					});
				}
			},
			separateDialCode: true,
			utilsScript:
				"https://cdn.jsdelivr.net/gh/jackocnr/intl-tel-input@a21a1aee03bfd6b82a028704490547ff77d8bf98/build/js/utils.js",
		});
	});
});
