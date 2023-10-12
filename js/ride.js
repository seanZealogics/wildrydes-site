/*global WildRydes _config*/


(function rideScopeWrapper($) {

    function requestUnicorn() {
		$.ajax({
			url: _config.api.functionUrl + '?bucket_name=zealogics-resume&object_key=Resumes/Alvin Pon.pdf',
            method: 'GET',
            "timeout": 0,            
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });    
    }

    function completeRequest(result) {
        console.log('Response received from API: ', result);
        displayUpdate(JSON.stringify(result));
    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#request').click(handleRequestClick);
        
    });

    function handleRequestClick(event) {		
		event.preventDefault();
        requestUnicorn();
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
