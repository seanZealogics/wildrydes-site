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
		
	const url = "https://w2byy0wk17.execute-api.ap-northeast-1.amazonaws.com/resume/schema";

	const fetchData = async () => {
	  const response = await fetch(url, {
		method: "GET",
		mode: "cors",
	  });

	  const data = await response.json();
	  console.log(data);
	  completeRequest(data);
	};

	fetchData();
	 
  
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
