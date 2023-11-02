/*global WildRydes _config*/

(function rideScopeWrapper($) {
	const dummyData = {
	  "items": [
		{
		  "publications": [],
		  "certificates": [],
		  "profile": {
			"name": "Yu-Che Tsai",
			"location": "3F., No.20 , Ln. 35, Zhuguang Rd., North Dist., City 300, Taiwan (R.O.C.)",
			"phone": " 886 -988-696-414",
			"email": "josephtsai331@gmail.com",
			"personal_urls": []
		  },
		  "computer_skills": [
			"Linux Kernel Driver",
			"Socket programming",
			"Multithreading",
			"VMware certification",
			"TCP/IP",
			"Routing",
			"iSCSI protocol",
			"Embedded System",
			"C/C ",
			"Python",
			"Storage stack",
			"Rust"
		  ],
		  "patents": [],
		  "educations": [
			{
			  "date": "2009 - 2011",
			  "degree": "Master degree [Computer Science]",
			  "institution": "National Chung Hsing University, Taichung",
			  "detail": ""
			},
			{
			  "date": "2005 - 2009",
			  "degree": "Bachelor degree [Computer Science]",
			  "institution": "National Chung Hsing University, Taichung",
			  "detail": ""
			}
		  ],
		  "id": "54b20e3d-bf82-4e52-b379-efc6ba2f33b0",
		  "experiences": [
			{
			  "date": "2021/12 - Now",
			  "company": "Western Digital Corporation",
			  "position": "Staff Engineer (R&D)",
			  "responsibility": "Refactor legacy code and add unittest cases, Rust utilities design, implementation and maintenance, Software packages maintenance, Kernel driver maintenance, Debug/Resolve customer reported issues",
			  "accomplishment": "Refactor legacy C/C  code with unittest cases, Reimplement legacy C utilities in Rust, Port Gplv3 release utility from old product to new one, Work with team for My Cloud Home/Duo and other NAS products"
			},
			{
			  "date": "2016/01 - 2021/11",
			  "company": "Latticework Inc., Taiwan branch",
			  "position": "Staff Engineer (R&D)",
			  "responsibility": "Storage stack design and implementation, Management flow design and implementation, Linux software RAID / LVM / Btrfs kernel driver maintenance, Relay server design and implementation, C /Python RPC library design and implementation",
			  "accomplishment": "Storage architecture design and module implementation, Python unittest for storage module and gitlab CI/CD integration, C /Python RPC library design with gtest unittest and gitlab CI/CD integration, Relay service flow design and related modules implementation with unittest and gitlab CI/CD integration, Work with team for Amber/AmberX NAS product"
			},
			{
			  "date": "2011/09 - 2015/12",
			  "company": "Promise technology",
			  "position": "Senior Engineer (R&D)",
			  "responsibility": "iSCSI target, iSNS client and subsystem management flow implementation and maintenance, iSCSI performance tuning, Ethernet device bring up, Multiple Ethernet devices routing handle",
			  "accomplishment": "Hack Linux kernel TCP flow and Ethernet driver to decrease CPU utilization and increase iSCSI data out performance, Ex50 product integration for 2015 NAB show and 2015 IDF show, Fair core assignment for different threads, Survey Ethernet chips for new product, Work with TW team for VessRAID R2000 series product, Work with US & TW team for VTrak Ex30, VTrak A-Class (Ex30 with scale-out design), VTrak Ex50"
			}
		  ]
		}
	  ]
	};


	function extractKeysAndValues(obj, path = '') {
		let result = [];
		for (let key in obj) {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				result = result.concat(extractKeysAndValues(obj[key], `${path}${key}.`));
			} else {
				/* let regex = /\b[a-zA-Z]+\b/g;
				let matches = `${path}`.match(regex); */
				const match = `${path}`.match(/\b[a-zA-Z_-]+\b/g);


				result.push([match, `${key}`, obj[key]]);
				console.log(match+ ` : ${key}: ${obj[key]}`);
				console.log(match);
			}
		}
		return result;
	}

	
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
		  const response = await fetch( _config.api.fetchUrl, {
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
	
	async function fetchData() {
		try {

			const data = {
				united: false,
				filter_condition: {
				  [dropDownMainBtn.textContent]: [{ [dropDownSubBtn.textContent]: searchInput.value }]//[{ institution: searchInput.Text }] //[{ institution: 'Taiwan' }] //
				}
			};
			console.log("JSON.stringify(data) " + JSON.stringify(data));
			const response = await fetch( _config.api.queryUrl, {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(data)
			});
	  
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
	  
			const jsonResponse = await response.json();
			console.log("Type of jsonResponse:", typeof jsonResponse);
			console.log(jsonResponse.items);
		  
			let queryDataStr = extractKeysAndValues(jsonResponse.items);//(dummyData);//(jsonResponse.items);
			
			$('#queryResultTable').DataTable( {
				ordering: false,
				data: queryDataStr,
				columns: [
					{ title: "" },
					{ title: "" },
					{ title: "" }
				]
			} );
		} catch (error) {
			console.error("Error:", error);
		}
	}
	
	function handleSearchClick(event) {		
		event.preventDefault();
		console.log(dropDownMainBtn.textContent);
		console.log(dropDownSubBtn.textContent);
		console.log(searchInput.value);

		let mainAttr = dropDownMainBtn.textContent;
		let subAttr = dropDownSubBtn.textContent;
		let searchStr = searchInput.value;

		fetchData();
		
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
