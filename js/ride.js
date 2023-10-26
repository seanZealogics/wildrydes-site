/*global WildRydes _config*/


(function rideScopeWrapper($) {
	var mapMainAttr = new Map(); 
	var arrSubAttr = [];
	
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
	
	function refreshMainAttrBtn() {

		// 獲取 dropdown menu
		var dropdownMainMenu = document.querySelector(".dropdown1 .dropdown-menu");

		// 對每個新的 menuitem
		for (const [key, value] of mapMainAttr) 
		{
			// 建立一個新的 <li> 元素
			var li = document.createElement("li");
			li.setAttribute("role", "presentation");

			// 建立一個新的 <a> 元素
			var a = document.createElement("a");
			a.setAttribute("role", "menuitem");
			a.setAttribute("tabindex", value);
			a.setAttribute("href", "#");
			a.textContent = key;
			// 將 <a> 元素加入到 <li> 內
			li.appendChild(a);

			// 最後，將 <li> 元素加入到 dropdown menu 中
			dropdownMainMenu.appendChild(li);
		}
		
		
// 獲取被選擇項目的索引
var selectedIndex = dropdownMainMenu.selectedIndex;

// 獲取被選擇項目的 tabindex 值
var tabindex = dropdownMainMenu.options[selectedIndex].getAttribute("tabindex");

console.log(tabindex);
	


		var dropdownMainMenu = document.querySelector(".dropdown2 mx-2 .dropdown-menu");

		// 對每個新的 menuitem
		for (const [key, value] of mapMainAttr) 
		{
			// 建立一個新的 <li> 元素
			var li = document.createElement("li");
			li.setAttribute("role", "presentation");

			// 建立一個新的 <a> 元素
			var a = document.createElement("a");
			a.setAttribute("role", "menuitem");
			a.setAttribute("tabindex", value);
			a.setAttribute("href", "#");
			a.textContent = key;
			// 將 <a> 元素加入到 <li> 內
			li.appendChild(a);

			// 最後，將 <li> 元素加入到 dropdown menu 中
			dropdownMenu.appendChild(li);
		}
		
	

	}

	function completeRequest(result) {		
		var jsonData = JSON.stringify(result);
		//jsonData = JSON.stringify(JSON.parse(jsonData));
		jsonData = jsonData.replace(/\\n/g, '').replace(/\\"/g, "\"").replace(/"{/g, "{").replace(/}"/g, "}");
		//displayUpdate(jsonData);

		const jsonObject = jQuery.parseJSON(jsonData);
		const properties = jsonObject.schema.properties;
		let i = 0;
		mapMainAttr.clear();
		arrSubAttr.length = 0;

		for (const attribute in properties) {

		  if (attribute === 'experiences' || attribute === 'educations') {				
			  mapMainAttr.set(attribute, i);	
			  		
			if (!Array.isArray(properties[attribute].items.properties)) {
			  properties[attribute].items.properties = Object.keys(properties[attribute].items.properties);
			}

			for (const item of properties[attribute].items.properties) {
				arrSubAttr.push(item);	
				i=i+1;					
			}
		  }
		}
		refreshMainAttrBtn();
	}

    // Register click handler for #request button
    $(function onDocReady() {
		
        $('#request').click(handleRequestClick);
		requestUnicorn();
				
        
    });

    function handleRequestClick(event) {		
		//event.preventDefault();
		
		currentTime = new Date();
        requestUnicorn();
				
				
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
