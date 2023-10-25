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
		// 請求物件
		// 請求物件
const request = new Request("https://cors-anywhere.herokuapp.com/https://w2byy0wk17.execute-api.ap-northeast-1.amazonaws.com/resume/schema", {
  method: "GET",
  headers: {
    "Origin": "https://example.com",
    "Sec-Ch-Ua": "Chromium;v=118, Google Chrome;v=118, Not=A?Brand;v=99",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "Windows",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    "Sec-Purpose": "prefetch;prerender",
    "Purpose": "prefetch",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  },
});

// 轉換成XMLHttpRequest物件
const xhr = new XMLHttpRequest();
xhr.open("GET", request.url, true);

// 發送請求
xhr.send();

// 以下是用來記錄協定過程的變數
const startTime = new Date().getTime();
let currentState = "URL_REQUEST";

// 建立一個事件監聽器，用於記錄協定狀態
const stateChangeListener = (event) => {
  const currentTime = new Date().getTime();
  const deltaTime = currentTime - startTime;

  console.log(`${deltaTime}ms [st=${currentTime - startTime}] ${currentState}`);

  currentState = event.type;
};

// 註冊事件監聽器
xhr.addEventListener("loadstart", stateChangeListener);
xhr.addEventListener("httpTransactionReadBody", stateChangeListener);
xhr.addEventListener("urlRequestJobFilteredBytesRead", stateChangeListener);
xhr.addEventListener("corsRequest", stateChangeListener);
xhr.addEventListener("requestAlive", stateChangeListener);

  
		
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
