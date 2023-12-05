// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var loading = document.getElementById('loading');
let programming_languages;
let percentages;

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
	
	programming_languages = jsonObject.response.programming_languages.map(item => item.programming_language);
	percentages = jsonObject.response.programming_languages.map(item => item.percentage);
	const uniqueColors = generateUniqueColors(percentages.length);
	console.log(programming_languages); // 輸出所有的程式語言
	console.log(percentages); // 輸出所有的百分比
	
 var ctx = $("#chart-line");
        var myLineChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: programming_languages,
                datasets: [{
                    data: percentages,
                    backgroundColor: uniqueColors
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "programming_languages"
                }
            }
        });


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