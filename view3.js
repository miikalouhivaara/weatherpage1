const ctx = document.getElementById('myChart').getContext('2d');

const data = {
    labels: [],
    datasets: [{
        label: 'Light',
        data: [],
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
                labelString: 'Light'
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

// Function to update the chart data
function updateChartData(newData) {
    // Format the date and time values
    const dateTime = new Date(newData.date_time);
    const time = dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const date = dateTime.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});

    // Add new data to the chart
    chart.data.labels.push(`${date} ${time}`);
    chart.data.datasets[0].data.push(newData.light);

    // Remove oldest data if chart has more than 20 entries
    if (chart.data.labels.length > 20) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }

    // Update the chart
    chart.update();
}

  

