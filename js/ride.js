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


const xhr = new XMLHttpRequest();

xhr.open("GET", "https://w2byy0wk17.execute-api.ap-northeast-1.amazonaws.com/resume/schema");
xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
xhr.addEventListener("load", function() {
  if (xhr.status === 200) {
    // 處理回應
    const schema = xhr.responseText;
    console.log(schema);
  } else {
    // 處理錯誤
    console.error(xhr.statusText);
  }
});
xhr.send();


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
