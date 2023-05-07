const ctx = document.getElementById('myChart').getContext('2d');

const data = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [{
        label: 'Temperature (°C)',
        data: [10, 20, 30],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

const options = {
    scales: {
        xAxes: [{
            type: 'time',
            time: {
                unit: 'hour',
                displayFormats: {
                    hour: 'HH:mm'
                }
            },
            distribution: 'series',
            ticks: {
                source: 'data'
            },
            gridLines: {
                drawOnChartArea: false
            },
            offset: true
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true,
                suggestedMax: 35,
                stepSize: 5
            },
            gridLines: {
                drawBorder: false
            },
            scaleLabel: {
                display: true,
                labelString: 'Temperature (°C)'
            }
        }]
    },
    legend: {
        display: false
    }
};

const chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});
