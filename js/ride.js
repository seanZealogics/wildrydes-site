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

    function handlePickupChanged() {
        var requestButton = $('#request');
        requestButton.text('Request Unicorn');
        requestButton.prop('disabled', false);
    }

    function handleRequestClick(event) {		
		event.preventDefault();
		displayUpdate(_config.api.functionUrl);
        requestUnicorn();
    }

    function animateArrival(callback) {
        var dest = WildRydes.map.selectedPoint;
        var origin = {};

        if (dest.latitude > WildRydes.map.center.latitude) {
            origin.latitude = WildRydes.map.extent.minLat;
        } else {
            origin.latitude = WildRydes.map.extent.maxLat;
        }

        if (dest.longitude > WildRydes.map.center.longitude) {
            origin.longitude = WildRydes.map.extent.minLng;
        } else {
            origin.longitude = WildRydes.map.extent.maxLng;
        }

        WildRydes.map.animate(origin, dest, callback);
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
