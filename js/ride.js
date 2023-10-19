/*global WildRydes _config*/


(function rideScopeWrapper($) {
	var currentTime;
	var loading = document.getElementById('loading');
	
	function showLoading() {
	  loading.style.display = 'block';
	}

	function hideLoading() {
	  loading.style.display = 'none';
	}

    function requestUnicorn() {
		$.ajax({
			url: _config.api.functionUrl,
            method: 'GET',
            "timeout": 0,            
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting resume: ', textStatus, ', Details: ', errorThrown);
				var now = new Date();
				console.log('Took Time: ', now - currentTime , "ms");
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
				hideLoading();
            }
        });    
    }


    function completeRequest(result) {
		var now = new Date();
		console.log('Escaped time ', now - currentTime);
        console.log('Response received from API: ', result);
		hideLoading();
        displayUpdate(JSON.stringify(result));

    }

    // Register click handler for #request button
    $(function onDocReady() {
		hideLoading();
        $('#request').click(handleRequestClick);
        
    });

    function handleRequestClick(event) {		
		event.preventDefault();
		showLoading();
		currentTime = new Date();
		console.log('start Time: ', currentTime);
        requestUnicorn();
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
