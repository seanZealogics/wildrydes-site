/*global WildRydes _config*/

(function rideScopeWrapper($) {
	const dummyData = {
	  "items": [
        {
            "publications": [],
            "certificates": [
                {
                    "date": "N/A",
                    "title": "JLPT N2",
                    "certifying_authority": "Japanese Language Proficiency Test"
                }
            ],
            "profile": {
                "name": "Yen-Chih Liao",
                "location": "Wuri Dist, Taichung City, 414 Taiwan",
                "phone": "(886) 972-190-248",
                "email": "yen.yenchih.liao@gmail.com",
                "personal_urls": []
            },
            "computer_skills": [
                "Python",
                "C/C  ",
                "Java",
                "Solidity",
                "Golang",
                "JavaScript",
                "Sell Script",
                "Matlab"
            ],
            "patents": [],
            "educations": [
                {
                    "date": "Sep. 2018 - Jan. 2021",
                    "degree": "Master in Networking and Multimedia",
                    "description": "Publication: View-based Federated Byzantine Agreement System for Environmental Blockchain (BRAINS Jul. 2021)",
                    "school": "National Taiwan University"
                },
                {
                    "date": "Sep. 2014 - Jun. 2018",
                    "degree": "B.S. in Computer Science and Information Engineering",
                    "description": "Publications: Applying Blockchain to an Automated Clearinghouse System (TANET Oct. 2017), Governance on the Drug Supply Chain via Gcoin Blockchain (IJERPH May 2018)",
                    "school": "National Taiwan University"
                }
            ],
            "id": "43452950-4411-4d93-9639-791d630536df",
            "experiences": [
                {
                    "date": "Nov. 2021 - Now",
                    "company": "Taisys",
                    "position": "R&D Software Engineer",
                    "responsibility": "• Automated Data Handling and Notification System.\n• Developed a Docker container deployed on Google Kubernetes Engine (GKE) for robust data handling.\n• Implemented a system to store incoming data into a PostgreSQL database, ensuring efficient data management.\n• Engineered a cron job that dispatched events to Pub/Sub, providing real-time notifications to subscribers.\n• Utilized mail services to notify subscribers about relevant events, improving user engagement and experience.\n• Smart contract and decentralized application (DApp) development.\n• Developed, tested, and launched Solidity smart contracts using Hardhat (Node.js) and designed demo DApps utilizing React (JavaScript).\n• Created API servers with the gin-gonic (Golang web framework), integrated with MySQL for efficient data management.\n• Customized and deployed open-source blockchain projects such as Omni/Tokenbridge, Project OpenSea/seadrop, and Gnosis/MultiSigWallet to meet specific company needs, enhancing overall system effectiveness.\n• Conducted comprehensive analysis of open-source codes using sequence diagrams and class diagrams to identify areas of improvement.\n• Authored detailed documentation complemented with JavaScript demo code, facilitating knowledge sharing and collaboration among diverse engineering teams.\n• Developed and managed smart contracts, integrating features such as ERC20, ERC721, Ownable, Accessible, Upgradeable, etc., enhancing system functionality.\n• Stress test our own consortium chain (Quorum).\n• Undertook rigorous testing of TPS and latency under various gas consumption scenarios using Python multithreading, ensuring optimal system performance.\n• Visualized analytical results using matplotlib, supporting data-driven decision-making."
                },
                {
                    "date": "Apr. 2019 - May. 2020",
                    "company": "HTC DeepQ",
                    "position": "Contractor (R&D)",
                    "responsibility": "• Adopted and implemented MedRec, a paper published by Stanford University, prototype on Ethereum private chain in a group of five people."
                }
            ]
        },
        {
            "publications": [],
            "certificates": [],
            "profile": {
                "name": "Lichen Hsu"
            },
            "computer_skills": [
                "C",
                "8051/52 MCU"
            ],
            "patents": [
                {
                    "date": "N/A",
                    "title": "I702569 METHOD FOR ENHANCING INSTANT IMAGE SHARPNESS"
                },
                {
                    "date": "N/A",
                    "title": "I687672 OPTICAL INSPECTION SYSTEM AND IMAGE PROCESSING METHOD THEREOF"
                },
                {
                    "date": "N/A",
                    "title": "I690692 INSPECTION SYSTEM WTH LINE CAMERA UNDER EXTERNAL TRIGGER AND IMAGE EXPOSURE PROCESSING METHOD"
                },
                {
                    "date": "N/A",
                    "title": "I677680 INSPECTION SYSTEM WTH LINE CAMERA UNDER EXTERNAL TRIGGER AND IMAGE UNIFORMITY PROCESSING METHOD"
                }
            ],
            "educations": [
                {
                    "date": "July 1999 - June 2001",
                    "degree": "Master’s degree",
                    "description": "Communications Engineering",
                    "school": "National Chiao Tung University"
                },
                {
                    "date": "September 1997 - June 1999",
                    "degree": "Bachelor’s degree",
                    "description": "Electronic and Computer Engineering",
                    "school": "National Taiwan University of Science and Technology"
                }
            ],
            "id": "c00c83b5-63ff-471c-a0a5-a619ef4d011e",
            "experiences": [
                {
                    "date": "February 2016 - Present",
                    "company": "Creative Sensor Inc.",
                    "position": "Senior Deputy Project Manager",
                    "responsibility": "Leading the development of new products in the new product department of CSI. Participating in projects such as AOI wide-format camera products development, thermal imaging products development, and conducting research and analysis on related problems."
                },
                {
                    "date": "April 2010 - June 2014",
                    "company": "OPPO Digital Inc.",
                    "position": "Technical Service Engineer",
                    "responsibility": "Designed and implemented FPGA and CPLD based on system requirements. Provided technology study, technical support, and services for related OPPO digital products."
                },
                {
                    "date": "March 2010 - January 2016",
                    "company": "TIC Inc.",
                    "position": "Technical Service, Sales & Marketing",
                    "responsibility": "Performed technology study, refurbished, re-modified, and repaired thermal imaging cameras and cores. Resold them to the public market in the USA."
                },
                {
                    "date": "July 2001 - February 2010",
                    "company": "Opvista Inc.",
                    "position": "Sr. Hardware Engineer",
                    "responsibility": "Designed FPGA codes and schematics based on system requirements. Managed projects using MS Project. Worked with PCB Layout Company, tested and verified PCBs, and collaborated with testing department for quality assurance. Contributed to various FPGA-based projects."
                }
            ]
        }
    ]
	};

	
	var dropdownMainMenu = document.querySelector(".dropdown1 .dropdown-menu");
	var dropDownMainBtn = document.querySelector("#mainAttrBtn");
	var dropdownSubMenu = document.querySelector(".dropdown2 .dropdown-menu");
	var dropDownSubBtn = document.querySelector("#subAttrBtn");
	var searchInput = document.querySelector("#searchInput");
	var thead = document.querySelector("table thead");
	var tfoot = document.querySelector("table tfoot");
	var mapMainAttr = new Map(); 
	var arrSubAttr = [];
	
	var currentTime;
	var loading = document.getElementById('loading');
	
	var queryDataStr;
	
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
				
				//console.log("selectedIndex "+ selectedIndex + " selectedNextIndex "+selectedNextIndex);
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
						//console.log(this.textContent); // 印出 menu item 的內容
					});
					
					// 將 <a> 元素加入到 <li> 內
					li.appendChild(aSubTag);

					// 最後，將 <li> 元素加入到 dropdown menu 中
					dropdownSubMenu.appendChild(li);

					//console.log(arrSubAttr[index]);
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

			const data = {
				united: false,
				filter_condition: {
				  [dropDownMainBtn.textContent]: [{ [dropDownSubBtn.textContent]: searchInput.value }]//[{ institution: searchInput.Text }] //[{ institution: 'Taiwan' }] //
				}
			};
			//console.log("JSON.stringify(data) " + JSON.stringify(data));
			const response = await fetch( _config.api.queryUrl, {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(data)
			});
	  
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
	  
			const jsonResponse = await response.json();
			/* console.log("Type of jsonResponse:", typeof jsonResponse);
			console.log(jsonResponse.items); */
		              var allData = [];
            for (var item of jsonResponse.items) //dummyData.items
            {
                allData.push(item);
            }

			var resultTable = $('#queryResultTable').DataTable({
                "data": allData,
                "scrollX": 200,
                "scrollCollapse": true,
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
                    { "data": "id" },
                    { "data": "profile.name" },
                    { "data": "profile.location",
                        "render": function (data, type, row) {
                            if (data.length) {
                                return type === 'display' ? data: ''; 
                            } else {
                                return type === 'display' ? 'N / A' : '';  
                            } 
                        }
                    },
                    { "data": "profile.phone",
                        "render": function (data, type, row) {
                            if (data.length) {
                                return type === 'display' ? data : ''; 
                            } else {
                                return type === 'display' ? 'N / A' : '';  
                            }
                        }
                    },
                    { "data": "profile.email",
                        "render": function (data, type, row) {
                            if (data.length) {
                                return type === 'display' ? data : ''; 
                            } else {
                                return type === 'display' ? 'N / A' : '';  
                            }
                        }
                    },
                    { "data": "profile.personal_urls",
                        "render": function (data, type, row) {
                            if (data.length) {
                                return type === 'display' ? data.length + " Records" : ''; 
                            } else { 
                                return type === 'display' ? 'N / A' : '';
                            }
                        } 
					},
                    { "data": "educations",
                      "render": function (data, type, row) {
                            if (data.length) {
                                if (type === 'display') {
									var educations = data.map(function (education) {									
										return education.date + ' - ' + education.degree + ' (' + education.school + ')';
                                });				
								educations.join('<br>');
                                return educations.length + " Records";
                            } 
                            } else { 
                                return type === 'display' ? 'N / A' : '';
                            }
                            
							
                            return data; 
                        }
                    },                       
                    { "data": "computer_skills",
						"render": function (data, type, row) {
                            if (data.length) {
                                return type === 'display' ? data.length + " Records" : ''; 
                            } else { 
                                return type === 'display' ? 'N / A' : '';
                            }
                        } 
					},
                    { "data": "certificates",
                        "render": function (data, type, row) {
                            if (data.length) {
                                if (type === 'display') {
									var certificates = data.map(function (certificates) {
										return certificates.date + ' - ' + certificates.title + ' (' + certificates.certifying_authority + ')';
                                });
                                certificates.join('<br>');
								return certificates.length + " Records";
                            }
                            } else { 
                                return type === 'display' ? 'N / A' : '';
                            }
                            
                            return data; 
                        }
                    },
                    { "data": "publications",
                        "render": function (data, type, row) {
                             if (data.length) {
                                if (type === 'display') {
									var publications = data.map(function (publications) {
										return publications.date + ' - ' + publications.title ;
									});
									publications.join('<br>');
									return publications.length + " Records";
								}
                            } else { 
                                return type === 'display' ? 'N / A' : '';
                            }
                            
                            return data; 
                        }
                    },
                    { "data": "patents",
                        "render": function (data, type, row) {
                            if (data.length) {
                                if (type === 'display') {
									var patents = data.map(function (patents) {
										return patents.date + ' - ' + patents.title;
									});
									patents.join('<br>');
									return patents.length + " Records";
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
                            if (data.length) {
                                if (type === 'display') {
									var experiences = data.map(function (experiences) {
										//console.log(experiences.company);
										return experiences.date + ' - ' + experiences.company + ' (' + experiences.position + ')<br> ' + experiences.responsibility ;
									});
									experiences.join('<br>');
									return experiences.length + " Records";
								}
                            } else { 
                                return type === 'display' ? 'N / A' : '';
                            }
                            
                            return data; 
                        }
                    }

				],
				"order": [[1, 'asc']]
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
			tfoot.style.display = "table-footer-group";

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
		console.log(dropDownSubBtn.textContent);
		console.log(searchInput.value);
		*/
		let mainAttr = dropDownMainBtn.textContent;
		let subAttr = dropDownSubBtn.textContent;
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