/*global WildRydes _config*/
var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};


(function rideScopeWrapper($) {
    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/index.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/index.html';
    });
    function requestUnicorn() {
		var settings = {
		  "url": "https://6sjd6e7vlefx6o5bqdqv2jsj2u0zlygb.lambda-url.ap-northeast-1.on.aws",
		  "method": "GET",
		  "timeout": 0,
		  "headers": {
			"bucket_name": "zealogics-resume",
			"object_key": "Resumes/Alvin Pon.pdf"
		  },
		};
		$.ajax(settings).done(function (response) {
		  console.log(response);
		  displayUpdate(response);
		});
       
    }

    function completeRequest(result) {
        console.log('Response received from API: ', result);
        displayUpdate(result);
    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#request').click(handleRequestClick);
        
    });

    function handleRequestClick(event) {		
		event.preventDefault();
		displayUpdate(_config.api.functionUrl);
        requestUnicorn();
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
