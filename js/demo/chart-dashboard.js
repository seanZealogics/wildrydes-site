// Set new default font family and font color to mimic Bootstrap's default styling
/* Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
 */
// Pie Chart Example

//var ctxIndustries = document.getElementById("industriesChart");
var ctx = document.getElementById("myPieChart");
var ctxFramework = document.getElementById('frameworkChart');
var ctxLibrary = document.getElementById('librariesChart');
var ctxCoding = document.getElementById('codingChart');
var loading = document.getElementById('loading');
let programming_languages;
let percentages;
let jObjItem;
let firstCodingToolName;
let firstCodingToolValue;

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Bar Chart Example




function showLoading() {
  loading.style.display = 'block';
}

function hideLoading() {
  loading.style.display = 'none';
}

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const alpha = 0.5; // 固定透明度為0.5
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function generateUniqueColors(count) {
  const colors = [];
  const usedColors = new Set();

  while (colors.length < count) {
    const color = generateRandomColor();
    if (!usedColors.has(color)) {
      usedColors.add(color);
      colors.push(color);
    }
  }

  return colors;
}

function completeRequest(result) {
	
	
	
	
	var jsonData = JSON.stringify(result);
	console.log("completeRequest ");
	console.log(jsonData);
	const jsonObject = jQuery.parseJSON(jsonData);
	

	
	jObjItem = jsonObject.item;

		
	let degrees = jsonObject.item.degrees;	
	let resultdegrees = degrees.map(obj => [obj.degree, obj.percentage]);

	resultdegrees.sort((a, b) => {
		const order = ["bachelor", "master", "doctor"];
		return order.indexOf(a[0]) - order.indexOf(b[0]);
	});
	
	
	console.log("completeRequest " + resultdegrees);
	
	let xTools = [];
	let yTools = [];
	xTools[0] = "x";
	yTools[0] = "Usage";
	degrees = ['x']; // 將 'x' 添加到 degrees 陣列的開頭
	percentages = ['Usage']; // 將 'Usage' 添加到 percentages 陣列的開頭

	degrees.length = 0;
	percentages.length = 0;

	// 將 resultdegrees 中的 key 和 value 分別存到陣列
	resultdegrees.forEach(([degree, percentage]) => {
		xTools.push(degree);
		yTools.push(percentage);
	});

	console.log("degrees: " + degrees);
	console.log("percentages: " + percentages);

	console.log("xTools " + xTools);
	console.log("yTools " + yTools);
	var chartDegrees= bb.generate({
	   data: {
            x: "x",
            columns: [
                xTools,
                yTools
            ],
            type: "bar", // for ESM specify as: bar()
            colors: {  
                Usage: "#96deff",			
            },
            names: {
                Usage: ""  // set "Usage" lable to empty
            },
            labels: {
                format: function (v, id, i, j) { return v + '%'; },  // 在這裡添加這行
            }
        },
        axis: {
            x: {
                type: "category",
                tick: {
                    rotate: -70,
                    multiline: false,
                    tooltip: true
                }
            },
            y: {
                label: {
                    text: '%',
                    position: 'outer-middle'  // y lable poistion
                }
            }
        },
        legend: {
            show: false  // hide bar lable
        },
	  bindto: "#degreePieChart"
	});
	document.getElementById("chartHeader").textContent = "Degree";




	
	let seniority = jsonObject.item.seniority;
	let resultSeniority = Object.entries(seniority).map(([key, value]) => [key+ ' years', parseFloat(value)]);

	resultSeniority.sort((a, b) => a[0].localeCompare(b[0]));
	let chartSeniority = bb.generate({
		data: {
			columns: resultSeniority,
			type: "donut",
			/* onclick: function (d, i) {
				console.log("onclick", d, i);
			},
			onover: function (d, i) {
				console.log("onover", d, i);
			},
			onout: function (d, i) {
				console.log("onout", d, i);
			}, */
		},
		donut: {
			title: "100%",
		},
		color: {
        pattern: ["#96deff", "#6cb2eb", "#4285f4", "#1967d2", "#174ea6"],
		},
		bindto: "#seniorityChart",
	});
	
	
	showCodingChart();
	showPlatformsChart();
	updateCardInfo();
	//let resultIndustries = Object.entries(industries).map(([key, value]) => [key, parseFloat(value)]);
/* 	var myBarChart = new Chart(ctxIndustries, {
	  type: 'bar',
	  data: {
		labels: ["January", "February", "March", "April", "May", "June"],
		datasets: [{
		  label: "Revenue",
		  backgroundColor: "#4e73df",
		  hoverBackgroundColor: "#2e59d9",
		  borderColor: "#4e73df",
		  data:  [4215, 5312, 6251, 7841, 9821, 14984],
		}],
	  },
	  options: {
		maintainAspectRatio: false,
		layout: {
		  padding: {
			left: 10,
			right: 25,
			top: 25,
			bottom: 0
		  }
		},
		scales: {
		  xAxes: [{
			time: {
			  unit: 'month'
			},
			gridLines: {
			  display: false,
			  drawBorder: false
			},
			ticks: {
			  maxTicksLimit: 6
			},
			maxBarThickness: 25,
		  }],
		  yAxes: [{
			ticks: {
			  min: 0,
			  max: 15000,
			  maxTicksLimit: 5,
			  padding: 10,
			  // Include a dollar sign in the ticks
			  callback: function(value, index, values) {
				return '$' + number_format(value);
			  }
			},
			gridLines: {
			  color: "rgb(234, 236, 244)",
			  zeroLineColor: "rgb(234, 236, 244)",
			  drawBorder: false,
			  borderDash: [2],
			  zeroLineBorderDash: [2]
			}
		  }],
		},
		legend: {
		  display: false
		},
		tooltips: {
		  titleMarginBottom: 10,
		  titleFontColor: '#6e707e',
		  titleFontSize: 14,
		  backgroundColor: "rgb(255,255,255)",
		  bodyFontColor: "#858796",
		  borderColor: '#dddfeb',
		  borderWidth: 1,
		  xPadding: 15,
		  yPadding: 15,
		  displayColors: false,
		  caretPadding: 10,
		  callbacks: {
			label: function(tooltipItem, chart) {
			  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
			  return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
			}
		  }
		},
	  }
	}); */
	

/* 
	let frameworks = jsonObject.item.frameworks;
	let frameworkNames = frameworks.map(item => item.framework);
	let frameworkPercentages = frameworks.map(item => parseFloat(item.percentage));
	
	for (let key in frameworks) {
		uniqueColors = generateUniqueColors(frameworkPercentages.length);
	}
		
	console.log(frameworkNames); // 這將輸出 ["doctor", "bachelor", "master"]
	console.log(frameworkPercentages); // 這將輸出 ["6.25", "67.5", "26.25"]


	new Chart(ctxFramework, {
		type: 'bar',
		data: {
		  labels: frameworkNames,
		  datasets: [{
			label: '',
			data: frameworkPercentages,
			backgroundColor: uniqueColors,
			borderColor: uniqueColors,
			borderWidth: 1
		  }]
		},
		options: {
		  scales: {
			y: {
			  beginAtZero: true
			}
		  },
		  legend: { display: false }
		}
	});



	let libraries = jsonObject.item.libraries;
	let librariesNames = libraries.map(item => item.library);
	let librariesPercentages = libraries.map(item => parseFloat(item.percentage));
	
	for (let key in libraries) {
		uniqueColors = generateUniqueColors(librariesPercentages.length);
	}
		
	console.log(librariesNames); // 這將輸出 ["doctor", "bachelor", "master"]
	console.log(librariesPercentages); // 這將輸出 ["6.25", "67.5", "26.25"]


	new Chart(librariesChart, {
		type: 'bar',
		data: {
		  labels: librariesNames,
		  datasets: [{
			data: librariesPercentages,
			backgroundColor: uniqueColors,
			borderColor: uniqueColors,
			borderWidth: 1
		  }]
		},
		options: {
		  scales: {
			y: {
			  beginAtZero: true
			}
		  },
		  legend: { display: false }
		}
	});




	let databases = jsonObject.item.databases;
	let databaseNames = databases.map(item => item.database);
	let databasePercentages = databases.map(item => parseFloat(item.percentage));
	
	for (let key in databases) {
		uniqueColors = generateUniqueColors(databasePercentages.length);
	}
		
	console.log(databaseNames); // 這將輸出 ["doctor", "bachelor", "master"]
	console.log(databasePercentages); // 這將輸出 ["6.25", "67.5", "26.25"]
	
	new Chart(document.getElementById("databasesBar"), {
		"type": "horizontalBar",
		"data": {
		  "labels": databaseNames,
		  "datasets": [{
			"label": "My First Dataset",
			"data": databasePercentages,
			"fill": false,
			"backgroundColor": uniqueColors,
			"borderColor": uniqueColors,
			"borderWidth": 1
		  }]
		},
		"options": {
		  "scales": {
			"xAxes": [{
			  "ticks": {
				"beginAtZero": true
			  }
			}]
		  },"legend": { "display": false }
		}
	  });
	  
	  
	  
	  
	  
	let programming_languages = jsonObject.item.programming_languages;
	let programming_languageNames = programming_languages.map(item => item.programming_language);
	let programming_languagePercentages = programming_languages.map(item => parseFloat(item.percentage));
	
	for (let key in programming_languages) {
		uniqueColors = generateUniqueColors(programming_languagePercentages.length);
	}
		
	console.log(programming_languageNames); // 這將輸出 ["doctor", "bachelor", "master"]
	console.log(programming_languagePercentages); // 這將輸出 ["6.25", "67.5", "26.25"]


	new Chart(document.getElementById("codingChart"), {
		type: 'bar',
		data: {
		  labels: programming_languageNames,
		  datasets: [{
			data: programming_languagePercentages,
			backgroundColor: uniqueColors,
			borderColor: uniqueColors,
			borderWidth: 1
		  }]
		},
		options: {
		  scales: {
			y: {
			  beginAtZero: true
			}
		  },
		  legend: { display: false }
		}
	});




	let cloud_platforms = jsonObject.item.cloud_platforms;
	let cloud_platformNames = cloud_platforms.map(item => item.cloud_platform);
	let cloud_platformPercentages = cloud_platforms.map(item => parseFloat(item.percentage));
	
	for (let key in cloud_platforms) {
		uniqueColors = generateUniqueColors(cloud_platformPercentages.length);
	}
		
	console.log(cloud_platformNames); // 這將輸出 ["doctor", "bachelor", "master"]
	console.log(cloud_platformPercentages); // 這將輸出 ["6.25", "67.5", "26.25"]
	
	new Chart(document.getElementById("cloudPlatformChart"), {
		"type": "horizontalBar",
		"data": {
		  "labels": cloud_platformNames,
		  "datasets": [{
			"label": "My First Dataset",
			"data": cloud_platformPercentages,
			"fill": false,
			"backgroundColor": uniqueColors,
			"borderColor": uniqueColors,
			"borderWidth": 1
		  }]
		},
		"options": {
		  "scales": {
			"xAxes": [{
			  "ticks": {
				"beginAtZero": true
			  }
			}]
		  },"legend": { "display": false }
		}
	  });
 */
/* 	for(let i = 0; i < degrees.length; i++) {
		degreeNames.push(degrees[i].degree);
		degreePercentages.push(degrees[i].percentage);
		uniqueColors = generateUniqueColors(degreePercentages.length);
	} */
	
/* 	programming_languages = jsonObject.response.programming_languages.map(item => item.programming_language);
	percentages = jsonObject.response.programming_languages.map(item => item.percentage);
	const uniqueColors = generateUniqueColors(percentages.length);
	console.log(programming_languages); // 輸出所有的程式語言
	console.log(percentages); // 輸出所有的百分比 */
	
/* 	var ctx = $("#chart-line");
	var myLineChart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: degreeNames,
			datasets: [{
				data: degreePercentages,
				backgroundColor: uniqueColors
			}]
		},
		options: {
			title: {
				display: true,
				text: "Degrees"
			}
		}
	}); */


	//hideLoading();
}

function handleRequest(result) {		
	var jsonData = JSON.stringify(result);
	console.log("handleRequest");
	//console.log(jsonData);
	const jsonObject = jQuery.parseJSON(jsonData);
	
		
	let number = jsonObject.number;	
	console.log("employee numbers " + number);
	
	var element = document.getElementById('numbers');

	// 改變元素的內容
	element.textContent = number;
}

function fetchChartSummary() {
	console.log("fetchChartSummary");
	//showLoading();

	const fetchChartData = async () => {
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), 600000); // Set timeout to 600000ms (10 minutes)

	try {
		  
		  const response = await fetch(_config.api.chartUrl, {
		  method: "GET",
		  mode: "cors",
		  signal: controller.signal,
		});

		clearTimeout(id);

		const data = await response.json();

		//console.log(data);
		completeRequest(data);
	} catch (e) {
		if (e.name === 'AbortError') {
		  console.log('Fetch aborted');
		} else {
		  throw e;
		}
	  }
	};

	fetchChartData();

	
}

function showIndustriesChart()
{
	let industries = jObjItem.industries;
	let xTools = [];
	let yTools = [];
	xTools[0] = "x";
	yTools[0] = "Usage";
	industries.forEach((item) => {
	   xTools.push(item.industry);
	   yTools.push(item.percentage);
	});

	
	var chartIndustries = bb.generate({
	  data: {
		x: "x",
		columns: [
			xTools,
			yTools
		],
		type: "bar", // for ESM specify as: bar()
        colors: {  
            Usage: "#6cb2eb",			
        },
		names: {
            Usage: ""  // set "Usage" lable to empty
        },
		labels: {
			format: function (v, id, i, j) { return v + '%'; },
		}			
	  },
	  axis: {
		x: {
		  type: "category",
		  tick: {
			rotate: -70,
			multiline: false,
			tooltip: true
		  }
		},
		y: {
			label: {
				text: '%',
				position: 'outer-middle'  // y lable poistion
			}
		}
	  },
	  legend: {
		show: false 
	  },
	  bindto: "#areaChart"
	});
	document.getElementById("chartHeader").textContent = "Industries";

}

function showPlatformsChart()
{
	let platforms = jObjItem.cloud_platforms;	
	let xTools = [];
	let yTools = [];
	xTools[0] = "x";
	yTools[0] = "Usage";
	platforms.forEach((item) => {
	   xTools.push(item.cloud_platform);
	   yTools.push(item.percentage);
	});

	
	var chartIndustries = bb.generate({
	  data: {
		x: "x",
		columns: [
			xTools,
			yTools
		],
		type: "bar", // for ESM specify as: bar()
        colors: {  
            Usage: "#b5d6eb",
        },
		names: {
            Usage: ""  // set "Usage" lable to empty
        },
		labels: {
			format: function (v, id, i, j) { return v + '%'; },  // 在這裡添加這行
		}
	  },
	  axis: {
		x: {
		  type: "category",
		  tick: {
			rotate: -70,
			multiline: false,
			tooltip: true
		  }
		},
		y: {
			label: {
				text: '%',
				position: 'outer-middle'  // y lable poistion
			}
		}
	  },
	  legend: {
		show: false
	  },
	  bindto: "#menuBarChart"
	});
	document.getElementById("chartHeader2").textContent = "Cloud Platforms";
}


function showFrameworksChart()
{
	let frameworks = jObjItem.frameworks_or_libraries;	
	let xTools = [];
	let yTools = [];
	xTools[0] = "x";
	yTools[0] = "Usage";
	frameworks.forEach((item) => {
	   xTools.push(item.framework_or_library);
	   yTools.push(item.percentage);
	});

	
	var chartIndustries = bb.generate({
	  data: {
		x: "x",
		columns: [
			xTools,
			yTools
		],
		type: "bar", // for ESM specify as: bar()
        colors: {  
            Usage: "#4285f4",			
        },
		names: {
            Usage: ""  // set "Usage" lable to empty
        },
		labels: {
			format: function (v, id, i, j) { return v + '%'; },  // 在這裡添加這行
		}
	  },
	  axis: {
		x: {
		  type: "category",
		  tick: {
			rotate: -70,
			multiline: false,
			tooltip: true
		  }
		},
		y: {
			label: {
				
				text: '%',
				position: 'outer-middle'  // y lable poistion
			}
		}
	  },
	  legend: {
		show: false
	  },
	  bindto: "#menuBarChart"
	});
	document.getElementById("chartHeader2").textContent = "Frameworks or Libraries";
}

function showCodingChart() {
    let codingTools = jObjItem.programming_languages;
    let xTools = [];
    let yTools = [];
    xTools[0] = "x";
    yTools[0] = "Usage";
    codingTools.forEach((item) => {
        xTools.push(item.programming_language);
        yTools.push(item.percentage);
    });
	
	firstCodingToolName = xTools[1];
	firstCodingToolValue = yTools[1];

    var chartIndustries = bb.generate({
        data: {
            x: "x",
            columns: [
                xTools,
                yTools
            ],
            type: "bar", // for ESM specify as: bar()
            colors: {  
                Usage: "#17a2b8",		
            },
            names: {
                Usage: ""  // set "Usage" lable to empty
            },
            labels: {
                format: function (v, id, i, j) { return v + '%'; },  // 在這裡添加這行
            }
        },
        axis: {
            x: {
                type: "category",
                tick: {
                    rotate: -70,
                    multiline: false,
                    tooltip: true
                }
            },
            y: {
                label: {
                    text: '%',
                    position: 'outer-middle'  // y lable poistion
                }
            }
        },
        legend: {
            show: false  // hide bar lable
        },
        bindto: "#areaChart"
    });
    document.getElementById("chartHeader").textContent = "Computer Language Distribution";
}

function updateCardInfo() {
	var languageNameContainer = document.getElementById("languageName");
	var linkElement = document.createElement('a');
	linkElement.textContent = firstCodingToolName;
	linkElement.href = 'search.html';
	languageNameContainer.appendChild(linkElement);
	localStorage.setItem('main_codingTool', firstCodingToolName);

    // 执行页面跳转
	window.location.href = this.getAttribute('href');
	//document.getElementById("languageName").innerText = firstCodingToolName;
	document.getElementById('usagePercentage').innerText = firstCodingToolValue+ '%';
	document.getElementById('usageProgressBar').style.width = firstCodingToolValue + '%';
	document.getElementById('usageProgressBar').setAttribute('aria-valuenow', firstCodingToolValue);
}

async function fetchCardSummary() {
    console.log("fetchCardSummary");
    
    let mainQueryData = {"tag": {"included_conditions": ["employee"]}};
    let controller = new AbortController();
    let signal = controller.signal;

    setTimeout(() => controller.abort(), 5000); // 5000 milliseconds = 5 seconds

    try {
        const resumesResponse = await fetch(_config.api.queryUrl, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(mainQueryData),
            signal
        });

        if (!resumesResponse.ok) {
            throw new Error(`HTTP error! status: ${resumesResponse.status}`);
        }

        const data = await resumesResponse.json();

        //console.log(data);
        handleRequest(data);		
        document.getElementById('loading').style.display = 'none';
    } catch (e) {
        if (e.name === 'AbortError') {
            console.log('Fetch aborted');
        } else {
            throw e;
        }
        document.getElementById('loading').style.display = 'none';
    }
}


$(function onDocReady() {


   console.log("chart.js onDocReady init!!" );
   showLoading();
   fetchCardSummary();
   fetchChartSummary();
   

	$('#industriesChart').click(function() {
        console.log("industriesChart init!!" );
		showIndustriesChart();
    });

    $('#platformsChart').click(function() {
        console.log("platformsChart init!!" );
		showPlatformsChart();
    });

    $('#frameworksChart').click(function() {
        console.log("frameworksChart init!!" );
		showFrameworksChart();
    });

	$('#codingChart').click(function() {
        console.log("frameworksChart init!!" );
		showCodingChart();
    });
});