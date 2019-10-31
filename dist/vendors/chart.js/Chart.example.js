var barChartData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [{
		label: 'Dataset 1',
		backgroundColor: [
			window.chartColors.red,
			window.chartColors.orange,
			window.chartColors.yellow,
			window.chartColors.green,
			window.chartColors.blue,
			window.chartColors.purple,
			window.chartColors.red
		],
		yAxisID: 'y-axis-1',
		data: [
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor()
		]
	}, {
		label: 'Dataset 2',
		backgroundColor: window.chartColors.grey,
		yAxisID: 'y-axis-2',
		data: [
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor()
		]
	}]

};


var pieChartData = {
	datasets: [{
		data: [
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
		],
		backgroundColor: [
			window.chartColors.red,
			window.chartColors.orange,
			window.chartColors.yellow,
			window.chartColors.green,
			window.chartColors.blue,
		]
	}],
	labels: [
		'Red',
		'Orange',
		'Yellow',
		'Green',
		'Blue'
	]
};


window.onload = function() {
	var ctx = document.getElementById('example-multiaxis').getContext('2d');
	window.myBar = new Chart(ctx, {
		type: 'bar',
		data: barChartData,
		options: {
			responsive: true,
			tooltips: {
				mode: 'index',
				intersect: true
			},
			scales: {
				yAxes: [{
					type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
					display: true,
					position: 'left',
					id: 'y-axis-1',
				}, {
					type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
					display: true,
					position: 'right',
					id: 'y-axis-2',
					gridLines: {
						drawOnChartArea: false
					}
				}],
			}
		}
	});

var abc = document.getElementById('example-pie').getContext('2d');
window.myPieChart = new Chart(abc, {
    type: 'pie',
    data: pieChartData,
    options: {
    	responsive: true
    }
});

};

document.getElementById('rand-multi-axis').addEventListener('click', function() {
	barChartData.datasets.forEach(function(dataset) {
		dataset.data = dataset.data.map(function() {
			return randomScalingFactor();
		});
	});
	window.myBar.update();
});

document.getElementById('rand-pie').addEventListener('click', function() {
	pieChartData.datasets.forEach(function(dataset) {
		dataset.data = dataset.data.map(function() {
			return randomScalingFactor();
		});
	});
	window.myPieChart.update();
});