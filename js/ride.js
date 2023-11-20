/*global WildRydes _config*/

(function rideScopeWrapper($) {
		
	var dropdownMainMenu = document.querySelector(".dropdown1 .dropdown-menu");
	var dropDownMainBtn = document.querySelector("#mainAttrBtn");
	var dropDownOperatorBtn = document.querySelector("#operatorBtn");
	var dropDownOperatorMenuBtn = document.querySelector("#operatorMenu");
	var searchInput = document.querySelector("#searchInput");
	var thead = document.querySelector("table thead");

	var mapMainAttr = new Map(); 
	var arrSubAttr = [];
	
	var currentTime;
	var loading = document.getElementById('loading');
	
	var queryDataStr;
	
	document.addEventListener("DOMContentLoaded", function () {
				
		var maxFields = 3; // Maximum input boxes allowed
		var wrapper = document.getElementById("newbelow"); // Fields wrapper
		var addButton = document.getElementById("addDelSearchGroup"); // Add button ID
		var x = 1; // Initial text box count
		// Get the operator menu
		var addDelSearchGroupMenu = document.getElementById("addDelSearchGroupMenu");
		
		dropDownOperatorMenuBtn.addEventListener('click', function(e) {
			e.preventDefault();
			if(e.target && e.target.nodeName == "A") {
				dropDownOperatorBtn.textContent = e.target.textContent;
				//console.log(e.target.textContent);
			}
		});
		
		// Add event listener for click event
		addDelSearchGroupMenu.addEventListener('click', function(e) {
			e.preventDefault();
			if(e.target && e.target.nodeName == "A") {
				if(e.target.classList.contains('fa-plus') && x < maxFields) { // Add new input box
					x++; // Text box increment
					var newElement = document.createElement("p");
					 newElement.className = 'dynamic-control-group';
					 newElement.innerHTML = '<div id="controlContainer'+x+'"" class="input-group container">' +
											'<div id="group'+x+'" class="dropdown1">' +
											'<button id="mainAttrBtn'+x+'" class="btn btn-primary dropdown-toggle" width="100px" type="button" data-toggle="dropdown">' +
											'<span class="caret"></span></button>' +
											'<ul id="mainDropMenu'+x+'" class="dropdown-menu dropdown-menu-right shadow animated--grow-in animated--fade-in">' +
											'</ul>' +
											'</div>' +
											'<input id="searchInput'+x+'" type="text" class="form-control bg-light border-primary mx-2" width="100px" placeholder="" +="" aria-label="Search" aria-describedby="basic-addon2" style="width: 200px;">' +
											'<div class="dropdown2 mx-1">' +
											'<button id="operatorBtn'+x+'" class="btn btn-primary dropdown-toggle" width="100px" type="button" data-toggle="dropdown">OR' +
											'<span class="caret"></span></button>' +
											'<ul id="operatorMenu'+x+'" class="dropdown-menu dropdown-menu-right shadow animated--grow-in animated--fade-in">' +
											'<li><a href="#">AND</a></li>' +
											'<li><a href="#">OR</a></li>' +
											'<li><a href="#">WITHOUT</a></li>' +
											'</ul>' +
											'</div></div>'; // Add field html
					 						
								
					wrapper.appendChild(newElement);
					
					var mainMenuLinks = newElement.getElementsByTagName('ul');
					for(var i = 0; i < mainMenuLinks.length; i++) {
						if(mainMenuLinks[i].id.indexOf("mainDropMenu") !== -1){
							//console.log("mainMenuLinks !!!!!　" +　mainMenuLinks[i].id);
							break;
						}
					}
					
					var mainBtnLinks = newElement.getElementsByTagName('button');
					let operatorBtn = undefined;
					for(var i = 0; i < mainBtnLinks.length; i++) {
						//console.log("mainBtnLinks !!!!!　" +　mainBtnLinks[i].id);
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
							//console.log("operatorBtn=" + operatorBtn.id);							
						}
					}
					
					
					var operationLinks = newElement.getElementsByTagName('a');
					
					for(var i = 0; i < operationLinks.length; i++) {
						//console.log('operationLinks: ' + operationLinks[i].id);
						operationLinks[i].id = 'newId' + x + '_' + i; // Set new id
						operationLinks[i].addEventListener('click', function() { // Register click event listener
							//console.log('Clicked: ' + this.id + ', Text: ' + this.textContent);
							if(operatorBtn !== undefined){
								if(this.textContent === 'AND' || this.textContent === 'OR' || this.textContent === 'WITHOUT'){
									operatorBtn.textContent = this.textContent;
								}
								
							}
						});
					}
				} else if(e.target.classList.contains('fa-minus')  && x > 1) { // Remove input box
					wrapper.lastChild.remove();
					x--;
				}
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

		const fetchData = async () => {
		  const response = await fetch( _config.api.fetchUrl, {
			method: "GET",
			mode: "cors",
		  });

		  const data = await response.json();
		  //console.log(data);
		  completeRequest(data);
		};

		fetchData();
	}
	
	function refreshAttrBtn(attrButton, mainMenu) {

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
			aMainTag.setAttribute("display", "flex");
			aMainTag.setAttribute("justifyContent", "center");
			aMainTag.setAttribute("href", "#");
			aMainTag.textContent = key;
			//console.log(key);
			
			aMainTag.addEventListener("click", function(event) {
				event.preventDefault(); // 防止默認的點擊事件行為
				attrButton.textContent = this.textContent;
				selectedIndex = this.getAttribute("tabindex");
			
				//console.log(this.textContent); // 印出 menu item 的內容
			});
			
			// 將 <a> 元素加入到 <li> 內
			li.appendChild(aMainTag);

			// 最後，將 <li> 元素加入到 dropdown menu 中
			mainMenu.appendChild(li);
			
		}
		attrButton.textContent = key;
		
		
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
		refreshAttrBtn(dropDownMainBtn, dropdownMainMenu);
	}

    // Register click handler for #request button
    $(function onDocReady() {
		
		$('#searchBtn').click(handleSearchClick);

		fetchAttr();
		
       
    });
	
	
	function format(d) {
	// `d` is the original data object for the row
	
	let data =  d.educations;
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
                            
	let educations = d.educations.map(function (m_educations) {									
		return '<p>' + m_educations.date + '<br>' + m_educations.degree + ' at ' + m_educations.school + '<br>' + m_educations.description + '</p>';
	});															
	//////////////////////////////////////////////////
	data =  d.computer_skills;
	let computer_skills = "<p>";
	//console.log("computer_skills.length = "+data.length);
	for (let i = 0; i < data.length; i ++) {
		computer_skills += data[i] + "<br><br>";
		/* const date = data[i].date;
		const degree = data[i].degree;
		const description = data[i].description;
		const school = data[i].school; */

		
		/* console.log(`Date: ${date}`);`
		console.log(`Company: ${company}`);
		console.log(`Position: ${position}`);
		console.log(`Responsibility: ${responsibility}`); */
	}
	computer_skills += "</p>";
	//////////////////////////////////////////////////
	data =  d.certificates;
	for (let i = 0; i < data.length; i ++) {
		
		const date = data[i].date;
		const title = data[i].title;
		const certifying_authority = data[i].certifying_authority;

		
		/* console.log(`Date: ${date}`);
		console.log(`Company: ${company}`);
		console.log(`Position: ${position}`);
		console.log(`Responsibility: ${responsibility}`); */
	}	      
	let certificates = d.certificates.map(function (m_certificates) {									
		return '<p>' + m_certificates.date + '<br>' + m_certificates.title + '<br>' + m_certificates.certifying_authority + '</p>';
	});	
	//////////////////////////////////////////////////
	data =  d.publications;
	for (let i = 0; i < data.length; i ++) {
		
		const date = data[i].date;
		const title = data[i].title;

		
		/* console.log(`Date: ${date}`);
		console.log(`Company: ${company}`);
		console.log(`Position: ${position}`);
		console.log(`Responsibility: ${responsibility}`); */
	}	      
	let publications = d.publications.map(function (m_publications) {									
		return '<p>' + m_publications.date + '<br>' + m_publications.title + '</p>';
	});	
	//////////////////////////////////////////////////
	data =  d.patents;
	for (let i = 0; i < data.length; i ++) {
		
		const date = data[i].date;
		const title = data[i].title;

		
		/* console.log(`Date: ${date}`);
		console.log(`Company: ${company}`);
		console.log(`Position: ${position}`);
		console.log(`Responsibility: ${responsibility}`); */
	}	      
	let patents = d.patents.map(function (m_patents) {									
		return '<p>' + m_patents.date + '<br>' + m_patents.title + '</p>';
	});	
	
	//////////////////////////////////////////////////
	data =  d.experiences;	
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
                            
	let experiences = d.experiences.map(function (m_experiences) {									
		return '<p>' + m_experiences.date + '<br>' + m_experiences.company + '<br>' + m_experiences.position + '<br>' + m_experiences.responsibility+ '</p>';
	});															
	//experiences.join('<br>');								
 
                            
							
                        
	return '<table cellspacing="10" border="1" style="width:100%">' +
		'<tr class="text-muted text-xs">'
		+ '<td>Educations</td>'
		+ '<td>Computer Skills</td>'		
		+ '<td>Certificates</td>'
		+ '<td>Publications</td>' 
		+ '<td>Patents</td>' 
		+ '<td>Experiences</td>' 
		+'</tr>'
		+'<tr class="text-muted text-xs">'
		+ '<td>' + educations + '</td>' 
		+ '<td>' + computer_skills + '</td>'		
		+ '<td>' + certificates + '</td>'
		+ '<td>' + publications + '</td>' 
		+ '<td>' + patents + '</td>'
		+ '<td>' + experiences + '</td>'
		+'</tr>'
		'</table>';
	}
	
	async function fetchData() {
		try {
			
			let queryData ={"united" : true};
			
		 	let previousButtonName = null;
			let nextButtonName = null;
			var prevCondition = "OR";

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
 
						  var key = previousButton.innerText;
						  var key = key.substring(0, key.length - 1);
						  var condition = inputLinks[i].value;
						 
						  var type = prevCondition === "WITHOUT" ? "excluded_conditions" : "included_conditions";
						  
							if (!queryData[key]) {
							queryData[key] = {
								"united": nextButton.innerText === "AND" ? false : true,
								"included_conditions": [],
								"excluded_conditions": []
							};						
							if(prevCondition === "AND"){
								queryData["united"] === "AND" ? false : true;
							}
						  }
						  
						  console.log("queryData " +　JSON.stringify(queryData));
						  console.log(" queryData[key][type] " +queryData[key][type] + " " +  key + " "  +type+ "　"+condition );
						  queryData[key][type].push(condition);
						  console.log("queryData " +　JSON.stringify(queryData));
						  
						  			
						
						  if(nextButton){
							prevCondition = nextButton.innerText;
						  }
					} 
				} 
			}
			//console.log("pre-clean JSON.stringify(queryData) " + JSON.stringify(queryData));
			let elementsQueryData = 0;
			for (var key in queryData) {
				elementsQueryData++;			
				if(key !== "united"){
					console.log("queryData[key]['included_conditions'].length" + queryData[key]["included_conditions"].length);
					if (queryData[key]["included_conditions"].length === 0) {
						delete queryData[key]["included_conditions"];
					}else if (queryData[key]["included_conditions"].length === 1) {
						delete queryData[key]["united"];
					}
					
					if (queryData[key]["excluded_conditions"].length === 0) {
						delete queryData[key]["excluded_conditions"];
					}else if (queryData[key]["excluded_conditions"].length === 1) {
						delete queryData[key]["united"];
					}
				}
			}
			if(elementsQueryData === 2){
				delete queryData["united"];
			}
			console.log("queryData elementsQueryData legnth " + elementsQueryData);
			console.log("JSON.stringify(queryData) " + JSON.stringify(queryData));
			const response = await fetch( _config.api.queryUrl, {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(queryData)
			});
	  
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
	  
			const jsonResponse = await response.json();
			//console.log("Type of jsonResponse:", typeof jsonResponse);
			console.log(JSON.stringify(jsonResponse)); 
		              var allData = [];
            for (var item of jsonResponse.items) //dummyData.items
            {
                allData.push(item);
            }
			$('#queryResultTable').DataTable().clear();
			$('#queryResultTable').DataTable().destroy();

			var resultTable = $('#queryResultTable').DataTable({
                "data": allData,
                "scrollX": 200,
                "scrollCollapse": true,
				"autoWidth": true,
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
                    { "data": "id", "visible": false },
                    { "data": "profile.name",
						"render": function (data, type, row) {
                            if (data && data.length) {								
                                return type === 'display' ? data: ''; 
                            } else {
                                return type === 'display' ? 'N / A' : '';  
                            } 
                        }
					},
                    { "data": "profile.location",
                        "render": function (data, type, row) {
                            if (data && data.length) {
                                return type === 'display' ? data: ''; 
                            } else {
                                return type === 'display' ? 'N / A' : '';  
                            } 
                        }
                    },
                    { "data": "profile.phone",
                        "render": function (data, type, row) {
                            if (data && data.length) {
                                return type === 'display' ? data : ''; 
                            } else {
                                return type === 'display' ? 'N / A' : '';  
                            }
                        }
                    },
                    { "data": "profile.email",
                        "render": function (data, type, row) {
                            if (data && data.length) {
                                return type === 'display' ? data : ''; 
                            } else {
                                return type === 'display' ? 'N / A' : '';  
                            }
                        }
                    },
                    { "data": "profile.personal_urls",
                        "render": function (data, type, row) {
                            if (data && data.length) {
                                return type === 'display' ? data.length + " Personal URLs Records" : ''; 
                            } else { 
                                return type === 'display' ? 'N / A' : '';
                            }
                        } 
					},
                    { "data": "educations",
                      "render": function (data, type, row) {
                            if (data && data.length) {
                                if (type === 'display') {
									var educations = data.map(function (education) {									
										return education.date + ' - ' + education.degree + ' (' + education.school + ')';
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
				//"order": [[1, 'asc']]
			});
			

            $('#queryResultTable tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var row = resultTable.row(tr);

                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                    row.child(format(row.data())).show();
                    tr.addClass('shown');
                }
            });

			thead.style.display = "table-header-group";
			

			//var newWindow = window.open('', '_blank', 'width=400,height=200');			
			//newWindow.document.write('<html><body>');
            //newWindow.document.write(stringWithoutFirstAndLast);
			//newWindow.document.write('</body></html>');			
			//newWindow.document.close();
			// Re-initialize the DataTable
			//ResultTable = $('#queryResultTable').DataTable();
		} catch (error) {
			console.error("Error:", error);
		}
	}
	
	function handleSearchClick(event) {		
		event.preventDefault();
		/* console.log(dropDownMainBtn.textContent);
		console.log(searchInput.value);
		*/
		let mainAttr = dropDownMainBtn.textContent;
		
		let searchStr = searchInput.value;
		
		//$('#queryResultTable').DataTable.destroy();
		//$('#queryResultTable').DataTable.empty();
		

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