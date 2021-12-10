// definition
function loadScript(scriptUrl) {
	const script = document.createElement('script');
	script.src = scriptUrl;
	document.body.appendChild(script);

	return new Promise((res, rej) => {
		script.onload = function() {
			res();
		}
		script.onerror = function () {
			rej();
		}
	});
}

// use
loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js')
	.then(() => {
		console.log('Script loaded!');
		$(document).ready(function() { 
			$("#partial_header").load("partials/header.htm");
			$("#partial_footer").load("partials/footer.htm"); }); 

	})
	.catch(() => {
		console.error('Script loading failed! Handle this error');
	});
