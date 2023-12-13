// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctxDegreePie = document.getElementById("degreePieChart").getContext('2d');
//var ctxIndustries = document.getElementById("industriesChart");
var ctx = document.getElementById("myPieChart");
var ctxFramework = document.getElementById('frameworkChart');
var ctxLibrary = document.getElementById('librariesChart');
var ctxCoding = document.getElementById('codingChart');
var loading = document.getElementById('loading');
let programming_languages;
let percentages;



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

  // 生成不重複的顏色
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
	console.log("completeRequest");
	console.log(jsonData);
	const jsonObject = jQuery.parseJSON(jsonData);
	
	let degrees = jsonObject.item.degrees;
	let degreeNames = [];
	let degreePercentages = [];
	let uniqueColors = [];

	for (let key in degrees) {
		degreeNames.push(key);
		degreePercentages.push(degrees[key]);
		uniqueColors = generateUniqueColors(degreePercentages.length);
	}
		
	console.log(degreeNames); // 這將輸出 ["doctor", "bachelor", "master"]
	console.log(degreePercentages); // 這將輸出 ["6.25", "67.5", "26.25"]
	let floatArray = degreePercentages.map(function(item) {
	  return parseFloat(item);
	});
	var myPieChart = new Chart(ctxDegreePie, {
	  plugins: [ChartDataLabels],
	  type: 'pie',
	  data: {
		labels: degreeNames,
		datasets: [{
		  data: floatArray,
		  backgroundColor: uniqueColors,
		  hoverBackgroundColor: uniqueColors
		}]
	  },
	  options: {
		responsive: true,
		legend: {
		  position: 'bottom',
		  labels: {
			padding: 10,
			boxWidth: 10
		  }
		},
		plugins: {
		  datalabels: {
			formatter: (value, ctx) => {
			  let sum = 0;
			  let dataArr = ctx.chart.data.datasets[0].data;
			  dataArr.map(data => {
				sum += data;
			  });
			  let percentage = (value * 100 / sum).toFixed(2) + "%";
			  return percentage;
			},
			color: 'white',
			labels: {
			  title: {
				font: {
				  size: '16'
				}
			  }
			}
		  }
		}
	  }
	});
	

	let seniority = jsonObject.item.seniority;
	let resultSeniority = Object.entries(seniority).map(([key, value]) => [key, parseFloat(value)]);

	let chart = bb.generate({
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
		bindto: "#seniorityChart",
	});
	
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
	
	let industries = jsonObject.item.industries;
	let industriesNames = industries.map(item => item.industry);
	let industriesPercentages = industries.map(item => parseFloat(item.percentage));
	
	for (let key in industries) {
		uniqueColors = generateUniqueColors(industriesPercentages.length);
	}
		
	console.log(industriesNames); // 這將輸出 ["doctor", "bachelor", "master"]
	console.log(industriesPercentages); // 這將輸出 ["6.25", "67.5", "26.25"]


	
	new Chart(document.getElementById("horizontalBar"), {
		"type": "horizontalBar",
		"data": {
		  "labels": industriesNames,
		  "datasets": [{
			"label": "My First Dataset",
			"data": industriesPercentages,
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


	hideLoading();
}

function fetchChartSummary() {
	console.log("fetchChartSummary");
	showLoading();

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

		console.log(data);
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

$(function onDocReady() {


   console.log("chart.js onDocReady init!!" );
   fetchChartSummary();





});