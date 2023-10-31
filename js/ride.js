/*global WildRydes _config*/

(function rideScopeWrapper($) {
	
	var dropdownMainMenu = document.querySelector(".dropdown1 .dropdown-menu");
	var dropDownMainBtn = document.querySelector("#mainAttrBtn");
	var dropdownSubMenu = document.querySelector(".dropdown2 .dropdown-menu");
	var dropDownSubBtn = document.querySelector("#subAttrBtn");
	var searchInput = document.querySelector("#searchInput");
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

    function fetchAttr() {

		const fetchData = async () => {
		  const response = await fetch(_config.api.fetchUrl, {
			method: "GET",
			mode: "cors",
		  });

		  const data = await response.json();
		  console.log(data);
		  completeRequest(data);
		};

		fetchData();
	}
	
	function refreshAttrBtn() {

		// 獲取 dropdown menu

		var selectedIndex;
		var selectedNextIndex;
		
		// 對每個新的 menuitem
		for (var [key, value] of mapMainAttr) 
		{			
			// 建立一個新的 <li> 元素
			let li = document.createElement("li");
			li.setAttribute("role", "presentation");

			// 建立一個新的 <a> 元素
			var aMainTag = document.createElement("a");
			aMainTag.setAttribute("role", "menuitem");
			aMainTag.setAttribute("tabindex", value);
			aMainTag.setAttribute("href", "#");
			aMainTag.textContent = key;
			
			aMainTag.addEventListener("click", function(event) {
				event.preventDefault(); // 防止默認的點擊事件行為
				dropDownMainBtn.textContent = this.textContent;
				selectedIndex = this.getAttribute("tabindex");
				
				
				let found = false;
				for (var [key, value] of mapMainAttr) {
					if (found) {
						selectedNextIndex = value;
						break;
					}
					if (value == selectedIndex) {
						found = true;
					}
				}
				
				while (dropdownSubMenu.firstChild) {
					dropdownSubMenu.removeChild(dropdownSubMenu.firstChild);
				}
				
				if(selectedIndex == selectedNextIndex || typeof selectedNextIndex === 'undefined')
				{
					selectedNextIndex = arrSubAttr.length
				}
				
				console.log("selectedIndex "+ selectedIndex + " selectedNextIndex "+selectedNextIndex);
				for (var index = selectedIndex; index < selectedNextIndex; index++) {
							// 建立一個新的 <li> 元素
					let li = document.createElement("li");
					li.setAttribute("role", "presentation");

					// 建立一個新的 <a> 元素
					let aSubTag = document.createElement("a");
					aSubTag.setAttribute("role", "menuitem");
					aSubTag.setAttribute("tabindex", index);
					aSubTag.setAttribute("href", "#");
					aSubTag.textContent = arrSubAttr[index];
					aSubTag.addEventListener("click", function(event) {
						event.preventDefault(); // 防止默認的點擊事件行為
						dropDownSubBtn.textContent = this.textContent;
						searchInput.setAttribute("placeholder", this.textContent + "=");
						console.log(this.textContent); // 印出 menu item 的內容
					});
					
					// 將 <a> 元素加入到 <li> 內
					li.appendChild(aSubTag);

					// 最後，將 <li> 元素加入到 dropdown menu 中
					dropdownSubMenu.appendChild(li);

					console.log(arrSubAttr[index]);
					dropDownSubBtn.textContent = arrSubAttr[index];
				}
				
				
				
				
				
				//console.log(); // 印出 menu item 的內容
			});
			
			// 將 <a> 元素加入到 <li> 內
			li.appendChild(aMainTag);

			// 最後，將 <li> 元素加入到 dropdown menu 中
			dropdownMainMenu.appendChild(li);
			
		}
		//dropDownMainBtn.textContent = key;
		
		
		// 獲取被選擇項目的索引
		

		// 獲取被選擇項目的 tabindex 值
		//var tabindex = dropdownMainMenu.options[selectedIndex].getAttribute("tabindex");

		//console.log(selectedIndex);
	



		

		
			//dropDownSubBtn.textContent = arrSubAttr[index];

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
		window.mapMainAttr = mapMainAttr;
		window.arrSubAttr = arrSubAttr;
		refreshAttrBtn();
	}

    // Register click handler for #request button
    $(function onDocReady() {
		
		$('#searchBtn').click(handleSearchClick);

		fetchAttr();
				
        
    });
	
	function handleSearchClick(event) {		
		event.preventDefault();
		console.log(dropDownMainBtn.textContent);
		console.log(dropDownSubBtn.textContent);
		console.log(searchInput.value);
				
		// 定義您的變數
		let mainAttr = dropDownMainBtn.textContent;
		let subAttr = dropDownSubBtn.textContent;
		let searchStr = searchInput.value;

		// 動態創建JSON對象
		var jsonData = {
		  "united": false,
		  "filter_condition": {}
		};

		jsonData.filter_condition[mainAttr] = [{}];
		jsonData.filter_condition[mainAttr][0][subAttr] = searchStr;

		// 將JSON對象轉換為字符串
		var jsonData = JSON.stringify(jsonData);
		console.log(jsonData);
		
		
		const queryStr = async () => {
		  const response = await fetch( _config.api.queryUrl, {
			method: "GET",
			mode: "no-cors",
			redirect: "follow"
		  });

		  const data = await response.json();
		  console.log(data);
		  completeRequest(data);
		};

		queryStr();

		
    }
	
	function handleMainAttrMenuClick(event) {		
		event.preventDefault();
		console.log("handleMainAttrMenuClick!");
				
				
    }
	
	function handleSubAttrMenuClick(event) {		
		event.preventDefault();
		console.log("handleSubAttrMenuClick!");
				
				
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
