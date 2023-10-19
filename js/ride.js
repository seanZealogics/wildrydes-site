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
		 // 發出 HTTP GET 請求
  $.ajax({
    url: "https://w2byy0wk17.execute-api.ap-northeast-1.amazonaws.com/resume/schema",
    method: "GET",
    headers: {
      "Host": "w2byy0wk17.execute-api.ap-northeast-1.amazonaws.com",
      "User-Agent": "curl/8.0.1",
      "Accept": "*"
    }
  }).done(function(response) {
    // 處理回應
    console.log(response);
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
