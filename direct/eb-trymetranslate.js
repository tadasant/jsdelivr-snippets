$(document).ready(function () {
	const languageSpan = document.getElementById(
		"hidden-element-with-language-text-content"
	);
	const language = languageSpan.textContent;

	const charCountDiv = document.getElementById("click-to-rewrite-char-count");
	const inputTextarea = document.querySelector(
		"#click-to-rewrite-input textarea"
	);
	const outputTextDiv = document.getElementById("click-to-rewrite-output");
	const clickToRewriteButton = document.getElementById(
		"click-to-rewrite-button"
	);
	const clickToRewriteLoadingSpinner = document.getElementById(
		"click-to-rewrite-loading-spinner"
	);

	function updateCharCount(event) {
		const newText = event.target.value;
		const len = newText.length;
		if (len > 1000) {
			// don't allow inputs over 1000 char
			inputTextarea.value = newText.substr(0, 1000);
		} else {
			// update the char counter
			charCountDiv.innerHTML = `${len}/1000 characters`;
		}
	}

	inputTextarea.addEventListener("change", updateCharCount);
	inputTextarea.addEventListener("keyup", updateCharCount);
	inputTextarea.addEventListener("paste", updateCharCount);

	function processRewrite() {
		// get input text
		const textToRewrite = inputTextarea.value;

		// initiate loading spinner
		outputTextDiv.style.display = "none";
		clickToRewriteLoadingSpinner.style.display = "inline-block";

		// pipe it through API
		fetch("https://bend.englishbrain.app/tryme-translate", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				message: textToRewrite,
				language,
			}),
		})
			.then((resp) => {
				return resp.text();
			})
			.then((result) => {
				// update output text, including font color, while removing loading spinner
				outputTextDiv.innerHTML = result;
				outputTextDiv.style.color = "black";
				clickToRewriteLoadingSpinner.style.display = "none";
				outputTextDiv.style.display = "block";
			})
			.catch((err) => {
				console.error({ err });
				outputTextDiv.innerHTML =
					"Sorry, request failed. We're experiencing unusual volume on the website. Scroll down to see examples, and Get Started with your number to continue on your phone.";
				outputTextDiv.style.color = "black";
				clickToRewriteLoadingSpinner.style.display = "none";
				outputTextDiv.style.display = "block";
			});
	}

	clickToRewriteButton.addEventListener("click", processRewrite);
});
