/*global WildRydes _config*/


(function rideScopeWrapper($) {

    function requestUnicorn() {
		var sub_sett;
		var settings = {
		  "url": "https://6sjd6e7vlefx6o5bqdqv2jsj2u0zlygb.lambda-url.ap-northeast-1.on.aws?bucket_name=zealogics-resume&object_key=Resumes/Alvin Pon.pdf",
		  "method": "GET",
		  "timeout": 0,
		};
		
		$.ajax(settings).done(function (response) {
		  console.log(response);	
	      sub_sett = response;		  
		});
		displayUpdate(sub_sett);       
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
