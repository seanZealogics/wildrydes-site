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
		
		var invocation = new XMLHttpRequest();
		var url = "https://w2byy0wk17.execute-api.ap-northeast-1.amazonaws.com/resume/schema";

		
		  if (invocation) {
			invocation.open("GET", url, true);
			invocation.addEventListener("readystatechange", function() {
			  if (invocation.readyState === XMLHttpRequest.DONE) {
				if (invocation.status === 200) {
				  // Success!
				  var response = invocation.response;
				  // Do something with the response data.
				  console.log("response: " + response);
				} else {
				  // Error!
				  // Handle the error.
				  console.log("Error: "+ invocation.status);
				}
			  }
			});
			invocation.send();
		  }
		


  
		
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
		//event.preventDefault();
		showLoading();
		currentTime = new Date();
		console.log('start Time: ', currentTime);
        requestUnicorn();
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
