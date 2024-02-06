/*global WildRydes _config*/
let personal_urls = null;
let educations = null;
let computer_skills = null;
let certificates = null;
let publications = null;
let patents = null;
let experiences = null;
let changedCells = null;
let originalAllData = null;

(function rideScopeWrapper($) {
		
	var dropdownMainMenu = document.querySelector(".dropdown1 .dropdown-menu");
	var dropDownMainBtn = document.querySelector("#mainAttrBtn1");
	var dropDownOperatorBtn = document.querySelector("#operatorBtn1");
	var dropDownOperatorMenuBtn = document.querySelector("#operatorMenu1");
	var searchInput = document.querySelector("#searchInput1");	
	var wrapper = document.getElementById("newbelow"); // Fields wrapper		
	var tableWrapper = document.getElementById("tableContent"); // Fields wrapper
	var maxFields = 3; // Maximum input boxes allowed
	var thead = null;

	var mapMainAttr = new Map(); 
	var arrSubAttr = [];
	var resultTable;
	var currentTime;
	var loading = document.getElementById('loading');
	var x = 1; // Initial text box count
	var queryDataStr;
	
	var conditions = {
        'educations': { text: 'Educations', value: 'education', color: 'rgb(21,189,255)' }, //blue
        'experiences': { text: 'Experiences', value: 'experience', color: 'rgb(66,185,224)' },
		'certificates': { text: 'Certificates', value: 'certificate', color: 'rgb(170,189,255)' },
		'computer_skills': { text: 'Computer Skills', value: 'computer_skill', color: 'blue' },
        'default': { text: 'Select',value: '', color: 'green' }
    };
	
	document.addEventListener("DOMContentLoaded", function () {
				

		
		// Get the operator menu
		
	
		
		dropDownOperatorMenuBtn.addEventListener('click', function(e) {
			e.preventDefault();
			if(e.target && e.target.nodeName == "A") {
				dropDownOperatorBtn.textContent = e.target.textContent;
				//console.log(e.target.textContent);
			}
		});
		
		
	});
	
	function showLoading() {
	  loading.style.display = 'block';
	}

	function hideLoading() {
	  loading.style.display = 'none';
	}

    function fetchAttr() {

		const fetchAttrData = async () => {
		  const response = await fetch( _config.api.fetchUrl, {
			method: "GET",
			mode: "cors",
		  });

		  const data = await response.json();
		  //console.log(data);
		  completeRequest(data);
		};

		fetchAttrData();
	}
	
	function refreshAttrBtn(attrButton, mainMenu) {

		// 獲取 dropdown menu

		//var selectedIndex;
		var selectedNextIndex;
		var conditionData;
		attrButton.textContent = conditions['default'];
		
		// 對每個新的 menuitem
		for (var [key, value] of mapMainAttr) 
		{			
			// 建立一個新的 <li> 元素
			let li = document.createElement("li");
			li.setAttribute("role", "presentation");

			// 建立一個新的 <a> 元素
			var aMainTag = document.createElement("a");
			aMainTag.setAttribute("role", "menuitem");
			//aMainTag.setAttribute("tabindex", value);
			aMainTag.setAttribute("display", "flex");
			aMainTag.setAttribute("justifyContent", "center");
			aMainTag.setAttribute("href", "#");
			aMainTag.textContent = conditions[key].text;//key;
			//console.log(key);
			
			aMainTag.addEventListener("click", function(event) {
				event.preventDefault(); // 防止默認的點擊事件行為
				attrButton.textContent = this.textContent;
				//selectedIndex = this.getAttribute("tabindex");				
				attrButton.style.backgroundColor = conditions[this.textContent.toLowerCase().replace(/ /g, "_")].color;
			
				//console.log(this.textContent); // 印出 menu item 的內容
			});
			
			// 將 <a> 元素加入到 <li> 內
			li.appendChild(aMainTag);

			// 最後，將 <li> 元素加入到 dropdown menu 中
			mainMenu.appendChild(li);
			
		}
		attrButton.textContent = conditions[key].text;
		attrButton.style.backgroundColor = conditions[key].color;

		
		// 獲取被選擇項目的索引
		

		// 獲取被選擇項目的 tabindex 值
		//var tabindex = dropdownMainMenu.options[selectedIndex].getAttribute("tabindex");

		//console.log(selectedIndex);
	
	}

	function completeRequest(result) {		
		var jsonData = JSON.stringify(result);
		//jsonData = JSON.stringify(JSON.parse(jsonData));
		
		jsonData = jsonData.replace(/\\n/g, '').replace(/\\"/g, "\"").replace(/"{/g, "{").replace(/}"/g, "}");
		//displayUpdate(jsonData);
		//console.log(jsonData);
		const jsonObject = jQuery.parseJSON(jsonData);
		const properties = jsonObject.schema.properties;
		let i = 0;
		mapMainAttr.clear();
		arrSubAttr.length = 0;

		for (const attribute in properties) {	
			//console.log(attribute);
			//if (attribute === 'experiences' || attribute === 'educations' || attribute === 'certificates' || attribute === 'computer_skills') {				
			  mapMainAttr.set(attribute, i);	
				/* if (!Array.isArray(properties[attribute].items.properties)) {
				  properties[attribute].items.properties = Object.keys(properties[attribute].items.properties);
				} */
				i=i+1;	
				/* for (const item of properties[attribute].items.properties) {
					arrSubAttr.push(item);	
									
				} */
			//}
		}
		window.mapMainAttr = mapMainAttr;
		window.arrSubAttr = arrSubAttr;
		refreshAttrBtn(dropDownMainBtn, dropdownMainMenu);
	}

    // Register click handler for #request button
    $(function onDocReady() {
		
		$('#searchBtn').click(handleSearchClick);

		fetchAttr();

		$('#queryResultTable').on( 'init.dt', function () { 
		console.log("queryResultTable init!!" );
		});


    });
	
	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& 表示整个被匹配的字符串
	}
	

	
	function format(d) {
	// `d` is the original data object for the row
		//console.log("d=" + JSON.stringify(d));
		//console.log("personal_urls=" + d.profile.personal_urls);
		let modalTable = {};
		
		personal_urls = d.profile.personal_urls;
		
		let data =  d.educations;
		if (typeof d.educations !== 'undefined') {
			for (let i = 0; i < data.length; i ++) {
				const date = data[i].date;
				const degree = data[i].degree;
				const description = data[i].description;
				const school = data[i].school;

				
				/* console.log(`Date: ${date}`);
				console.log(`Company: ${company}`);
				console.log(`Position: ${position}`);
				console.log(`Responsibility: ${responsibility}`); */
			}	                       
									
			var educations = d.educations.map(function (m_educations) {
				let date = m_educations.date || '';
				let degree = m_educations.degree || '';
				let major = m_educations.major || '';
				let school = m_educations.school || '';
				let detail = m_educations.detail || '';

				return '<p>' + date + '<br>' + degree + '<br>' + major + '<br>' + school + (detail ? '<br>' + detail : '') + '</p>';
						
			});
		}else{ educations = ""; }
		//console.log("educations !!! = "+ Array.isArray( educations));
		//////////////////////////////////////////////////
		computer_skills =  d.computer_skills;
		computer_skills[0] = '<p>' + computer_skills[0] + '<br>';

		for(let i = 1; i < computer_skills.length; i++) {
			if(i !== computer_skills.length - 1) {
				computer_skills[i] += '<br>';
			} else {
				computer_skills[i] += '</p>';
			}
		}


		//console.log("computer_skills !!! = "+  Array.isArray( computer_skills));

		//////////////////////////////////////////////////
		//data =  d.certificates;
		
	/* 	for (let i = 0; i < data.length; i ++) {
			
			const date = data[i].date;
			const title = data[i].title;
			const certifying_authority = data[i].certifying_authority;

			
	
		}	 */      
		if (typeof d.certificates !== 'undefined') {
			var certificates = d.certificates.map(function (m_certificates) {
				let date = m_certificates.date || '';
				let title = m_certificates.title || '';
				let certifying_authority = m_certificates.certifying_authority || '';			
				
				return '<p>' + date + '<br>' + title + '<br>' + certifying_authority + '</p>';
					
				
			});	
		}else{ certificates = ""; }
		//////////////////////////////////////////////////
		data =  d.publications;
		if (typeof data !== 'undefined') {
			for (let i = 0; i < data.length; i ++) {
				
				const date = data[i].date;
				const title = data[i].title;

				
				/* console.log(`Date: ${date}`);
				console.log(`Company: ${company}`);
				console.log(`Position: ${position}`);
				console.log(`Responsibility: ${responsibility}`); */
			}	      
			var publications = d.publications.map(function (m_publications) {									
				let date = m_publications.date || '';
				let title = m_publications.title || '';

				return '<p>' + date + (title ? '<br>' + title : '') + '</p>';
			});	
		}else{ publications = ""; }
		//////////////////////////////////////////////////
		data = d.patents;
		if (typeof data !== 'undefined') {
			for (let i = 0; i < data.length; i ++) {
				
				const date = data[i].date;
				const title = data[i].title;

				
				/* console.log(`Date: ${date}`);
				console.log(`Company: ${company}`);
				console.log(`Position: ${position}`);
				console.log(`Responsibility: ${responsibility}`); */
			}	      
			var patents = d.patents.map(function (m_patents) {									
				let date = m_patents.date || '';
				let title = m_patents.title || '';

				return '<p>' + date + (title ? '<br>' + title : '') + '</p>';
			});	
		}else{ patents = ""; }
		//////////////////////////////////////////////////
		data = d.experiences;	
		console.log("experiences " +data);
		if (typeof data !== 'undefined') {
			console.log("experiences111 " +data);
			for (let i = 0; i < data.length; i ++) {
				
				const date = data[i].date;
				const company = data[i].company;
				const position = data[i].position;
				const responsibility = data[i].responsibility;

				
				/* console.log(`Date: ${date}`);
				console.log(`Company: ${company}`);
				console.log(`Position: ${position}`);
				console.log(`Responsibility: ${responsibility}`); */
			}	                       
									
			var experiences = d.experiences.map(function (m_experiences) {		
		
				let date = m_experiences.date || '';
				let industry = m_experiences.industry || '';
				let company = m_experiences.company || '';
				let position = m_experiences.position || '';
				let responsibility = m_experiences.responsibility || '';
console.log("experiences222 " +'<p>' + date + (industry ? '<br>' + industry : '') + (company ? '<br>' + company : '') + (position ? '<br>' + position : '') + (responsibility ? '<br>' + responsibility : '') + '</p>');	
				return '<p>' + date + (industry ? '<br>' + industry : '') + (company ? '<br>' + company : '') + (position ? '<br>' + position : '') + (responsibility ? '<br>' + responsibility : '') + '</p>';
			});
		}else{ experiences = "1111"; }
		//experiences.join('<br>');
		console.log("experiences333 " +experiences);
		
		//modalTable.personal_urls = d.personal_urls;
		modalTable.educations = educations;
		modalTable.computer_skills = computer_skills;
		modalTable.certificates = certificates;
		modalTable.publications = publications;
		modalTable.patents = patents;
		modalTable.experiences = experiences;
	
										
	 				
		/* educations = educations.replace(regex, '<span style="background-color: yellow;">$&</span>');						 */
	
		let regex;
		 
		var inputLinks = document.getElementsByTagName('input');
		//console.log("inputLinks !!!!!　" +　inputLinks.length);
		for(var i = 0; i < inputLinks.length; i++) {
			//console.log("inputLinks !!!!!　" + i + " "+　inputLinks[i].id);
			if(inputLinks[i].id.indexOf("searchInput") !== -1){
				//console.log("inputLinks !!!!!　" +　inputLinks[i].id + " " +inputLinks[i].value);
				if (inputLinks[i].value.length > 0) {
				   // 尋找最近的前一個 button
					var previousButton = inputLinks[i].previousElementSibling;
					//console.log("previousButton.tagName !!!!!　" +　previousButton.tagName);
					if (previousButton && previousButton.tagName === 'DIV') {
						// Find the button within the div
						previousButton = previousButton.querySelector('button');
						previousButtonName = previousButton.name;
					}

					if (previousButton && previousButton.id.indexOf("mainAttrBtn") !== -1) {						
						//console.log("previousButton.textContent !!!!!　" +　previousButton.textContent + " prevKey " + prevKey);
						var prevKey = previousButton.textContent.toLowerCase().replace(/ /g, "_");
						var colorValueForDynamicKey = conditions[prevKey] ? conditions[prevKey].color : conditions.default.color;
						//console.log("colorValueForDynamicKey " + colorValueForDynamicKey);
						//console.log("previousButton.textContent.toLowerCase() " + previousButton.textContent.toLowerCase());
						let regexString = escapeRegExp(inputLinks[i].value);
						regex = new RegExp(regexString, 'gi'); // 'g'表示全局匹配，'i'表示忽略大小寫
						
						
						
						for (let key in modalTable[prevKey]) {
							
						  if (typeof modalTable[prevKey] === 'object') {
							//console.log("object !!!!!　" +　modalTable[previousButton.textContent.toLowerCase()][key]);
							modalTable[prevKey][key] = modalTable[prevKey][key].replace(regex, function(match) {
								return `<span style='background-color: ${colorValueForDynamicKey}; color: yellow;'>${match}</span>`; 
							});
						  }else if (typeof modalTable[prevKey] === 'string') {
							 //console.log("string !!!!!　" +　modalTable[previousButton.textContent.toLowerCase()]);
							 modalTable[prevKey] = modalTable[prevKey].replace(regex, function(match) {
								return `<span style='background-color: ${colorValueForDynamicKey}; color: yellow;'>${match}</span>`; 
							});
						  }
						}
						
					}
				}
			}
		} 
		
		
						
/* 		
		let regex = new RegExp("taiwan", 'gi');
		 for (let key in educations) {
		  if (typeof educations[key] === 'string') {
			educations[key] = educations[key].replace(regex, function(match) {
			  return `<mark>${match}</mark>`;  // 使用<mark>標籤來反白匹配的字串
			});
		  }
		} 
 */							
		return '<table id="modalTable"  cellspacing="10" border="1" style="width:100%">'
			+ '<tr class="text-muted text-xs">'
			+ '<td>Personal URL</td>'
			+ '<td>' + personal_urls + '</td>' 
			+ '</tr>'
			+ '<tr class="text-muted text-xs">'
			+ '<td>Educations</td>'
			+ '<td>' + educations + '</td>' 
			+ '</tr>'
			+ '<tr class="text-muted text-xs">'
			+ '<td>Computer Skills</td>'	
			+ '<td>' + computer_skills + '</td>'
			+ '</tr>'
			+ '<tr class="text-muted text-xs">'
			+ '<td>Certificates</td>'
			+ '<td>' + certificates + '</td>'
			+ '</tr>'
			+ '<tr class="text-muted text-xs">'
			+ '<td>Publications</td>' 
			+ '<td>' + publications + '</td>' 
			+ '</tr>'
			+ '<tr class="text-muted text-xs">'
			+ '<td>Patents</td>'
			+ '<td>' + patents + '</td>'
			+ '</tr>'
			+ '<tr class="text-muted text-xs">'			
			+ '<td>Experiences</td>' 
			+ '<td>' + experiences + '</td>'
			+ '</tr>'
			+ '</table>';
	}
	
	async function updateChangedResmues(updateData)
	{
		showLoading();
		//console.log(JSON.stringify(updateData)); 
		const response = await fetch( _config.api.updateTagsUrl, {
			method: 'PUT',
			mode: 'cors',
			body: JSON.stringify(updateData)
		});
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const jsonResponse = await response.json();
		//console.log(JSON.stringify(jsonResponse)); 
		hideLoading();
		
	}
	
	async function updateResumeTags(id, tags) {
		//console.log("id　" +　id+ " tags "+ tags);
		try {
			showLoading();
			
			let tagsArr = tags.split(",", 3);
			let tagsQueryData ={"id": id, "tags": [tagsArr[0], tagsArr[1], tagsArr[2]]};
			
			const tagsQueryResponse = await fetch( _config.api.updateTagsUrl, {
				method: 'PUT',
				mode: 'cors',
				body: JSON.stringify(tagsQueryData)
			});
			if (!tagsQueryResponse.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await tagsQueryResponse.json();

			//console.log(data);
				
			hideLoading();
		} catch (error) {
			console.error("Error:", error);
			hideLoading();
		}
		
	}
	
	async function fetchAttrData() {
		try {
			
			let queryData ={"united" : true};
			let mainQueryData ={"united" : true};

			
		 	let previousButtonName = null;
			let nextButtonName = null;
			var prevCondition = "OR";
			var prevKey = null;

			
		 	var inputLinks = document.getElementsByTagName('input');
			//console.log("inputLinks !!!!!　" +　inputLinks.length);
			for(var i = 0; i < inputLinks.length; i++) {
				//console.log("inputLinks !!!!!　" + i + " "+　inputLinks[i].id);
				if(inputLinks[i].id.indexOf("searchInput") !== -1){
					//console.log("inputLinks !!!!!　" +　inputLinks[i].id + " " +inputLinks[i].value);
					if (inputLinks[i].value.length > 0) {
					   // 尋找最近的前一個 button
						var previousButton = inputLinks[i].previousElementSibling;
						if (previousButton && previousButton.tagName === 'button') {
							previousButtonName = previousButton.name;
						}
						// 尋找最近的下一個 button
						var nextButton = inputLinks[i].nextElementSibling;
						if (nextButton && nextButton.tagName === 'button') {
							nextButtonName = nextButton.name;
						}
						/* console.log(previousButton.innerText);
						console.log(inputLinks[i].value);
						console.log(nextButton.innerText);
						 */
							
 
						var key = conditions[previousButton.innerText.toLowerCase().replace(/ /g, "_")].value;
						var condition = inputLinks[i].value;

						var type = prevCondition === "WITHOUT" ? "excluded_conditions" : "included_conditions";
							  
						if (!mainQueryData[key]) {
							queryData[key] = {
								"united": nextButton.innerText === "AND" ? false : true,
								"included_conditions": [],
								"excluded_conditions": []
							};
							//console.log("prevkey " + prevKey + " key " + key + "!!!!!!!!!!!!!!!!    " +　JSON.stringify(mainQueryData));
							if(prevKey !== key)
							{
								//console.log("prevKey !== key prevCondition "+ prevCondition );
								if(prevCondition.includes("AND") || prevCondition.includes("OR")){
									mainQueryData["united"]  = prevCondition.includes("AND")  ? false : true;
									//console.log("mainQueryData['united'] = " + mainQueryData["united"]  + " mainQueryData   " +　JSON.stringify(mainQueryData));
								}
							}
							//console.log(" queryData[key][type] " +queryData[key][type] + " " +  key + " "  +type+ "　"+condition );
							queryData[key][type].push(condition);
							//console.log("queryData " +　JSON.stringify(queryData));
							Object.assign(mainQueryData, queryData);
							queryData = {};
						}else{
							//console.log("mainQueryData[key] key " + key + " " + JSON.stringify(mainQueryData));
							mainQueryData[key]["united"] = prevCondition.includes("AND")  ? false : true;
							mainQueryData[key][type].push(condition);
						}
						  
						  
						

						//console.log("mainQueryData " +　JSON.stringify(mainQueryData));


						if(nextButton){
							prevCondition = nextButton.innerText;
							prevKey = key;
						}
					} 
				} 
			}
			//console.log("pre-clean JSON.stringify(mainQueryData) " + JSON.stringify(mainQueryData));
			let elementsQueryData = 0;
			for (var key in mainQueryData) {
				elementsQueryData++;			
				if(key !== "united"){
					//console.log("mainQueryData[key]['included_conditions'].length" + mainQueryData[key]["included_conditions"].length);
					if (mainQueryData[key]["included_conditions"].length === 0) {
						delete mainQueryData[key]["included_conditions"];
					}else if (mainQueryData[key]["included_conditions"].length === 1) {
						delete mainQueryData[key]["united"];
					}
					
					if (mainQueryData[key]["excluded_conditions"].length === 0) {
						delete mainQueryData[key]["excluded_conditions"];
					}else if (mainQueryData[key]["excluded_conditions"].length === 1) {
						delete mainQueryData[key]["united"];
					}
				}
			}
		 	if(elementsQueryData === 2){
				delete mainQueryData["united"];
			} 
			//console.log("mainQueryData elementsQueryData legnth " + elementsQueryData);
			console.log("JSON.stringify(mainQueryData) " + JSON.stringify(mainQueryData));
			
			const response = await fetch( _config.api.queryUrl, {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(mainQueryData)
			});
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			const jsonResponse = await response.json();
			//console.log("Type of jsonResponse:", typeof jsonResponse);
			//console.log(JSON.stringify(jsonResponse)); 
		    
			var allData = [];
            for (var item of jsonResponse.items) //dummyData.items
            {
                allData.push(item);
            }
			
			let queryResultTableElement = tableWrapper.querySelector('#queryResultTable');
			if (queryResultTableElement) {
				//console.log('Element exists in the container!');
				
				tableWrapper.lastChild.remove();
				$('#queryResultTable').DataTable().clear();
				$('#queryResultTable').DataTable().destroy();
				
				
			} else {
				//console.log('Element does not exist in the container!');
			}
					
			let tableElement = document.createElement("p");
			tableElement.className = 'dynamic-control-group';
			tableElement.innerHTML = '<div class="demo-html "></div><table id="queryResultTable" class="table-responsive display " style="width:100%"><thead class="text-muted text-xs" ><tr><th></th><th>Name</th><th>Location</th><th>Phone</th><th>Email</th><th>Tags</th><th>Educations</th><th>Computer Skills</th><th>Certificates</th><th>Publications</th><th>Patents</th><th>Experiences</th></tr></thead></table>';
			
			tableWrapper.appendChild(tableElement);
			thead = document.querySelector("table thead");
			let tableCard = document.getElementById("tableCard");

			tableCard.querySelectorAll("div").forEach((child) => {
				try {
					child.remove();
				} catch (error) {
					console.error("Error:", error);
				}
			});

			let btnContainer = document.createElement("div");
			btnContainer.className = " d-flex justify-content-end";
 
		
			var editLable = document.createElement("label");
			editLable.textContent = "Edit Mode:";
			editLable.style.fontSize = "15px";
		
			var label = document.createElement("label");
			label.classList.add("switch");

			var tableEditBtn = document.createElement("input");
			tableEditBtn.type = "checkbox";
			tableEditBtn.id = "tableEditBtn";
			tableEditBtn.classList.add("primary");
			
			var span = document.createElement("span");
			span.classList.add("slider");

			label.appendChild(editLable);
			label.appendChild(tableEditBtn);
			label.appendChild(span);
			label.style.boxShadow = "none";
			
			
			let tableApplyBtn = document.createElement("button");
			tableApplyBtn.innerHTML = "Save"; 
			tableApplyBtn.id = "tableApplyBtn";  
			tableApplyBtn.className = "btn btn-primary";  
			tableApplyBtn.disabled = true;
			tableApplyBtn.style.marginLeft = "10px";
			
			let tableCancelBtn = document.createElement("button");
			tableCancelBtn.innerHTML = "Cancel";  
			tableCancelBtn.id = "tableCancelBtn"; 
			tableCancelBtn.className = "btn btn-primary";  
			tableCancelBtn.disabled = true;
			tableApplyBtn.style.lineHeight = "20px";
			tableCancelBtn.style.lineHeight = "20px";
			tableCancelBtn.style.marginLeft = "10px";
			editLable.style.marginRight = "10px";

			// 將按鈕添加到表格中
			tableCard.appendChild(btnContainer);
			btnContainer.appendChild(label);
			btnContainer.appendChild(tableApplyBtn);
			btnContainer.appendChild(tableCancelBtn);			
			$('#tableEditBtn').bootstrapSwitch();
			
    
				
			tableApplyBtn.style.height = '33px';
			tableCancelBtn.style.height = '33px';

			resultTable = $('#queryResultTable').DataTable({
                "data": allData,
                "scrollCollapse": true,
				"autoWidth": false,
				"pageLength": 50, 
				"columnDefs": [
					{
						"targets": "_all",
						"className": "text-xs"
					}
				],
				"columns": [
					{
						"class": 'details-control',
						"orderable": false,
						"data": null,
                        "defaultContent": ''
					},
                    /* { "data": "id", "visible": false }, */
                    { "data": "profile.name",
						"render": function (data, type, row) {
                            if (data && data.length) {								
                                return data; 
                            } else {
                                return type === 'display' ? 'N / A' : '';  
                            } 
                        }
					},
                    { "data": "profile.location",
                        "render": function (data, type, row) {
                            if (data && data.length) {
                                return data; 
                            } else {
                                return type === 'display' ? 'N / A' : '';  
                            } 
                        }
                    },
                    { "data": "profile.phone",
                        "render": function (data, type, row) {
                            if (data && data.length) {
                                return data; 
                            } else {
                                return type === 'display' ? 'N / A' : '';  
                            }
                        }
                    },
                    { "data": "profile.email",
                        "render": function (data, type, row) {
                            if (data && data.length) {
                                return data;
                            } else {
                                return type === 'display' ? 'N / A' : '';  
                            }
                        }
                    },
                    { "data": "tags",
                        "render": function (data, type, row) {
                            if (type === 'display') {
								 if (data && data.length) {
									var tagsHTML = '';
									// 将每个标签转换成一个 badge
									data.forEach(function(tag) {
										tagsHTML += '<span class="badge rounded-pill bg-primary text-white">' + tag + '</span>&nbsp;';
									});
									return tagsHTML;
								} else {
									return 'N / A';
								}
							} else {
								return data && data.length ? data : 'N / A';
							}
                        }                        
					},
                    { "data": "educations",
                      "render": function (data, type, row) {
                            if (data && data.length) {
                                if (type === 'display') {
									var educations = data.map(function (education) {									
										return education.date + ' - ' + education.degree + ' (' + education.school + ')' +　education.detail;
                                });				
								educations.join('<br>');
                                return educations.length + " Education Records";
                            } 
                            } else { 
                                return type === 'display' ? 'N / A' : '';
                            }
                            return data; 
                        }
                    },                       
                    { "data": "computer_skills",
						"render": function (data, type, row) {
                            if (data && data.length) {
                                return type === 'display' ? data.length + " Computer Skills Records" : ''; 
                            } else { 
                                return type === 'display' ? 'N / A' : '';
                            }
                        } 
					},
                    { "data": "certificates",
                        "render": function (data, type, row) {
                            if (data && data.length) {
                                if (type === 'display') {
									var certificates = data.map(function (certificates) {
										return certificates.date + ' - ' + certificates.title + ' (' + certificates.certifying_authority + ')';
                                });
                                certificates.join('<br>');
								return certificates.length + " Certificate Records";
                            }
                            } else { 
                                return type === 'display' ? 'N / A' : '';
                            }
                            
                            return data; 
                        }
                    },
                    { "data": "publications",
                        "render": function (data, type, row) {
                             if (data && data.length) {
                                if (type === 'display') {
									var publications = data.map(function (publications) {
										return publications.date + ' - ' + publications.title ;
									});
									publications.join('<br>');
									return publications.length + " Publication Records";
								}
                            } else { 
                                return type === 'display' ? 'N / A' : '';
                            }
                            
                            return data; 
                        }
                    },
                    { "data": "patents",
                        "render": function (data, type, row) {
                            if (data && data.length) {
                                if (type === 'display') {
									var patents = data.map(function (patents) {
										return patents.date + ' - ' + patents.title;
									});
									patents.join('<br>');
									return patents.length + " Patent Records";
								}
                            } else { 
                                return type === 'display' ? 'N / A' : '';
                            }
                            
                            return data; 
                        }
                    },
                    {
                        "data": "experiences",
                        "render": function (data, type, row) {
                            if (data && data.length) {
                                if (type === 'display') {
									var experiences = data.map(function (experiences) {
										//console.log(experiences.company);
										return experiences.date + ' - ' + experiences.company + ' (' + experiences.position + ')<br> ' + experiences.responsibility ;
									});
									experiences.join('<br>');
									return experiences.length + " Experience Records";
								}
                            } else { 
                                return type === 'display' ? 'N / A' : '';
                            }
                            
                            return data; 
                        }
                    }

				],	
				/* "drawCallback": function(settings) {
					
					
					this.api().cells().every(function() {
						var cell = $(this.node());
						cell.unmark();
					});

					// 獲取查詢字串
					let searchInput2 = document.querySelector("#searchInput2");
					let searchInput3 = document.querySelector("#searchInput3");
					let searchTerm = searchInput.value;
					

					// 如果查詢字串不為空，則使用mark.js來在搜尋結果中高亮顯示匹配的字串
					if (searchTerm !== '') {
						this.api().cells().every(function() {
							var cell = $(this.node());
							cell.mark(searchTerm, { className: 'highlight' });
							if (searchInput2 && (searchInput2.value !== '')) {
								cell.mark(searchInput2.value, { className: 'highlight2' });
							}
							if (searchInput3 && (searchInput3.value !== '')) {
								cell.mark(searchInput3.value, { className: 'highlight3' });
							}
						});
					}
				} */
				
			});
			
			changedCells = new Map();			
			$('#tableEditBtn').on('switchChange.bootstrapSwitch', function (event, state) {
				if (state) {
					originalAllData = JSON.parse(JSON.stringify(allData));
					console.log('Switch is ON');
				
					$('#tableEditBtn').bootstrapSwitch('disabled', true);
					tableApplyBtn.disabled = false;
					tableCancelBtn.disabled = false;			
					label.style.boxShadow = "none";
					
					$('#queryResultTable td').each(function() {
						
						//console.log($(this).closest('table').find('th').eq($(this).index()).text());
						if($(this).closest('table').find('th').eq($(this).index()).text() === 'Tags')
						{
							console.log('whole cellText ' +$(this).html());
							
							var tempDiv = document.createElement('div');
							// 将HTML字符串作为div的innerHTML
							tempDiv.innerHTML = $(this).html();

							// 获取所有的span元素
							var spanElements = tempDiv.querySelectorAll('span');

							// 遍历所有的span元素，获取其文本内容
							var contentArray = [];
							spanElements.forEach(function(span) {
								// 获取每个span元素的文本内容并去除首尾空格
								var content = span.textContent.trim();
								// 将文本内容添加到数组中
								contentArray.push(content);
							});

							// 输出提取到的内容
							console.log("contentArray " +contentArray);												
												
							let changedRow = this;
							let rowData = resultTable.row(this.parentNode).data();
							
							$(this).empty().append($('<input>', {
								type: 'text',
								value: contentArray
							}));

							// add all cells event listener
							$(this).find('input').on('input', function() {
								//let rowData = $(this).val();
								
	//console.log('rowData： ', rowData, " this " + JSON.stringify(this));
								// 將已更改的單元格及其對應的 id 值添加到映射中							
								rowData.tags = $(this).val();
								changedCells.set(changedRow, rowData);
								console.log('rowData.tags： ', rowData.tags);
								//console.log('rowData.tags： ', rowData.tags);
							});
							
						}
					});
				} else {
					console.log('Switch is OFF');
				}
			});
			
			tableApplyBtn.addEventListener("click", function() {
				let updateData = {
					"resumes": []
				};
				
				$('#tableEditBtn').bootstrapSwitch('disabled', false);
				$('#tableEditBtn').bootstrapSwitch('toggleState');
				tableApplyBtn.disabled = true;
				tableCancelBtn.disabled = true;
				label.style.boxShadow = "none";
				
				
				for (let [cell, rowData] of changedCells) {
					
					rowData.tags =  rowData.tags.split(',').slice(0, 3);
					updateData.resumes.push(rowData);
					//console.log('已更改的資料：', cell.textContent, '對應的行的資料：', rowData);
					
					$(this).find('input').val(rowData.tags.slice(0, 3).join(','));
				}
				console.log('updateData： ', updateData);
				updateChangedResmues(updateData);

				changedCells.clear();	

				$('#queryResultTable td').each(function() {
					if ($(this).closest('table').find('th').eq($(this).index()).text() === 'Tags') {
						var inputValue = $(this).find('input[type="text"]').val().split(',').slice(0, 3);
						var badgeHTML = '';
						// 将每个标签转换成一个 badge
						inputValue.forEach(function(tag) {
							badgeHTML += '<span class="badge rounded-pill bg-primary text-white mr-1">' + tag.trim() + '</span>';
						});

						// 将原先的内容替换为 badgeHTML
						$(this).empty().html(badgeHTML);
					}
				});

			});
			
			tableCancelBtn.addEventListener("click", function() {				
				//allData = { ...originalAllData };
				allData = JSON.parse(JSON.stringify(originalAllData));
				$('#tableEditBtn').bootstrapSwitch('disabled', false);
				$('#tableEditBtn').bootstrapSwitch('toggleState');
				tableApplyBtn.disabled = true;
				tableCancelBtn.disabled = true;
				label.style.boxShadow = "none";
				console.log(JSON.stringify(allData));
				resultTable.clear().rows.add(allData).draw();
				/* $('#queryResultTable td').each(function() {
					this.contentEditable = false;
				}); */
			});
			
			/* var originalValue;
			
			$('#queryResultTable').on('dblclick', 'td', function () {
				var tr = $(this).closest('tr');
				var row = resultTable.row(tr);
				var cellIndex = resultTable.cell(this).index().column;
				var columnName = resultTable.settings().init().columns[cellIndex].data;

				if (columnName === 'tags') {
					var tagsValue = row.data().tags;
					originalValue = tagsValue;
					var input = $('<input type="text" value="' + tagsValue + '">');
					var cancel = $('<button class="cancel-edit">Cancel</button>');
					$(this).html(input).append(cancel);
					input.focus();
				}
			});
			
			
			$('#queryResultTable').on('click', '.cancel-edit', function () {
				var tr = $(this).closest('tr');
				var row = resultTable.row(tr);

				$(this).siblings('input').remove();
				$(this).parent().text(originalValue);
				$(this).remove();
			});
			
			$('#queryResultTable').on('keypress', 'input', function (event) {
				if (event.which == 13) {
					var tr = $(this).closest('tr');
					var row = resultTable.row(tr);
					row.data().tags = this.value;
					$(this).siblings('.cancel-edit').remove();
					$(this).parent().text(this.value);
					$(this).remove();
					updateResumeTags(row.data().id,this.value);
				}
			}); */
            $('#queryResultTable tbody').on('click', 'td.details-control', function () {

                var tr = $(this).closest('tr');
                var row = resultTable.row(tr);
				$(this).attr({
					'data-toggle': 'modal',
					'data-target': '#expandModal'
				});
						
				if (row.child.isShown()) {
					// This row is already open - close it
					row.child.hide();
					//tr.removeClass('shown');
				}
				else {
					// Open this row
					var childData = format(row.data());
					$('#modalBody').html(childData); // Add the child table to the modal body										
					$('#expandModal').modal('show'); // Show the modal
					$('#resumeModalLabel').text(row.data().profile.name);
					//tr.addClass('shown');
				}
            });
			
			
			
			resultTable.on('draw.dt', function() {
				// clean last style
				resultTable.cells().every(function() {
					var cell = $(this.node());
					cell.unmark();
				});

				// get query string
				var searchTerm = resultTable.search();

				// use mark.js to highligt the match string in search result
				if (searchTerm !== '') {
					resultTable.cells().every(function() {
						var cell = $(this.node());
						cell.mark(searchTerm, { className: 'highlight' });
					});
				}
			});
			

			hideLoading();
			//var newWindow = window.open('', '_blank', 'width=400,height=200');			
			//newWindow.document.write('<html><body>');
            //newWindow.document.write(stringWithoutFirstAndLast);
			//newWindow.document.write('</body></html>');			
			//newWindow.document.close();
			// Re-initialize the DataTable
			//ResultTable = $('#queryResultTable').DataTable();
		} catch (error) {
			console.error("Error:", error);
			hideLoading();
		}
	}
	
	window.handleKeyDown = function(event) {		
		if (event.keyCode === 13) {			
			event.preventDefault();			
			handleSearchClick(event);
		}
	}
	window.delQueryBtnGrp = function( clickedElement) {
		wrapper.lastChild.remove();
		console.log('11add width: ' + $('#searchInput1').width() + " width2 " +$('#searchInput2').width());
		x--;
		if(x == 2)
		{console.log('11del x: ' + x);
			$('#operatorBtn2').hide();
			$('#delSearchGroup2').hide();
			$('#addSearchGroup2').show();
			
		}else if(x == 1)
		{console.log('11del x: ' + x);
			$('#addSearchGroup1').show();
			$('#delSearchGroup1').hide();
			$('#operatorBtn1').hide();
		}
	}

	
	window.addQueryBtnGrp = function( clickedElement) {
			
			
		if(x < maxFields) { // Add new input box
			x++; // Text box increment
			
			var newElement = document.createElement("p");
			
			newElement.className = 'container-fluid';
			newElement.innerHTML = 
									'<div class="row">' +
										'<div id="group'+x+'" class="dropdown1 col-auto">' +
											'<button id="mainAttrBtn'+x+'" class="btn btn-primary dropdown-toggle fixed-width-attrButton " width="100px" type="button" data-toggle="dropdown" style="border: none;">' +
											'<span class="caret"></span></button>' +
											'<ul id="mainDropMenu'+x+'" class="dropdown-menu dropdown-menu-right shadow animated--grow-in animated--fade-in">' +
											'</ul>' +
										'</div>' +
										
										'<input id="searchInput'+x+'" type="text" class="form-control bg-light border-primary w-100 col-auto w-60" placeholder="" aria-label="Search" aria-describedby="basic-addon2"  onkeydown="handleKeyDown(event)" >' +
										
										'<div class="dropdown2 col-auto">' +
											'<button id="operatorBtn'+x+'" class="btn btn-primary dropdown-toggle fixed-width-operButton" width="100px" type="button" data-toggle="dropdown" style="display: none;">OR' +
											'<span class="caret"></span></button>' +
											'<ul id="operatorMenu'+x+'" class="dropdown-menu dropdown-menu-right shadow animated--grow-in animated--fade-in">' +
											'<li><a href="#" onclick="changeButtonColor(\'AND\', this)">AND</a></li>' +
											'<li><a href="#" onclick="changeButtonColor(\'OR\', this)">OR</a></li>' +
											'<li><a href="#" onclick="changeButtonColor(\'WITHOUT\', this)">WITHOUT</a></li>' +
											'</ul>' +
										'</div>'+
										
										'<div class="dropdown2 col-auto">' +
											'<button id="addSearchGroup'+x+'" class="btn btn-primary" width="100px" type="button" onclick="addQueryBtnGrp(this)" >+'+
											'</button>'+
											'<button id="delSearchGroup'+x+'" class="btn btn-danger" width="100px" type="button" onclick="delQueryBtnGrp(this)" style="display: none;">-'+
											'</button>'+
										'</div>'+
									'</div>';// Add field html
									
						
			wrapper.appendChild(newElement);
	console.log('11add width: ' + $('#searchInput1').width() + " width2 " +$('#searchInput2').width());
			if(x == 2)
			{console.log('11add width: ' + $('#searchInput1').width() + " width2 " +$('#searchInput2').width());
				$('#operatorBtn1').show();
				$('#delSearchGroup1').show();
				$('#addSearchGroup1').hide();
				
 
				//$('#searchInput2').width($('#searchInput1').width());
			}else if(x == 3)
			{console.log('22add x: ' + x);
				$('#operatorBtn2').show();
				$('#delSearchGroup2').show();
				$('#addSearchGroup2').hide();
				//$('#searchInput3').width($('#searchInput1').width());
				
			}
			
			var mainMenuLinks = newElement.getElementsByTagName('ul');
			for(var i = 0; i < mainMenuLinks.length; i++) {
				if(mainMenuLinks[i].id.indexOf("mainDropMenu") !== -1){
					//console.log("mainMenuLinks !!!!!　" +　mainMenuLinks[i].id);
					break;
				}
			}
			
			var mainBtnLinks = newElement.getElementsByTagName('button');
			let operatorBtn = undefined;
			let addBtn = undefined;
			
			for(var i = 0; i < mainBtnLinks.length; i++) {
				console.log("mainBtnLinks !!!!!　" +　mainBtnLinks[i].id);
				//mainBtnLinks[i].id = 'newId' + x + '_' + i; // Set new id
				if(mainBtnLinks[i].id.indexOf("mainAttrBtn") != -1){
					refreshAttrBtn(mainBtnLinks[i], mainMenuLinks[i]);
					mainBtnLinks[i].addEventListener('click', function() { // Register click event listener
						//console.log('mainBtnLinks Clicked: ' + this.id + ', Text: ' + this.textContent);
						
						
					});
				}else if(mainBtnLinks[i].id.indexOf("operatorBtn") != -1){
					operatorBtn = mainBtnLinks[i];	
					if(operatorBtn.id === 'operatorBtn'+maxFields){
						operatorBtn.style.visibility = "hidden";
					}
					console.log("operatorBtn=" + operatorBtn.id);							
				}else if(mainBtnLinks[i].id.indexOf("addSearchGroup") != -1){
					addBtn = mainBtnLinks[i];	
					if(addBtn.id === 'addSearchGroup'+maxFields){
						addBtn.style.visibility = "hidden";
					}
					//console.log("addBtn=" + addBtn.id);							
				}
				
			}
			
			var operationLinks = newElement.getElementsByTagName('a');
			
			for(var i = 0; i < operationLinks.length; i++) {
				console.log('operationLinks: ' + operationLinks[i].id);
				//operationLinks[i].id = 'newId' + x + '_' + i; // Set new id
				operationLinks[i].addEventListener('click', function() { // Register click event listener
					console.log('Clicked: ' + this.id + ', Text: ' + this.textContent);
					if(operatorBtn !== undefined){
						if(this.textContent === 'AND' || this.textContent === 'OR' || this.textContent === 'WITHOUT'){
							operatorBtn.textContent = this.textContent;
						}
						
					}
				});
			}
		} 			


	}
	
	window.changeButtonColor = function(selectedText, clickedElement) {
	
		var operatorBtn = $(clickedElement).closest('ul').prev('button');

		operatorBtn.text(selectedText);

		switch (selectedText) {
			case "AND":
				operatorBtn.css("background-color", "green");
				break;
			case "OR":
				operatorBtn.css("background-color", "blue");
				break;
			case "WITHOUT":
				operatorBtn.css("background-color", "red");
				break;
		}
	}
	
	function handleSearchClick(event) {		
		event.preventDefault();
		/* console.log(dropDownMainBtn.textContent);
		console.log(searchInput.value);
		*/
		let mainAttr = dropDownMainBtn.textContent;
		let searchStr = searchInput.value;
		
		tableWrapper.lastChild.remove();
		$('#queryResultTable').DataTable().clear();
		$('#queryResultTable').DataTable().destroy();
				
			
		showLoading();
		fetchAttrData();
			
    }
	
		
}(jQuery));