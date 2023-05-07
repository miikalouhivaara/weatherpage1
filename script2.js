const chartData = {
  labels: [],
  datasets: [{
    label: 'Temperature (°C)',
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
        unit: 'minute',
        displayFormats: {
          minute: 'HH:mm'
        }
      },
      distribution: 'linear',
      ticks: {
        source: 'data'
      }
    }, {
      type: 'time',
      time: {
        unit: 'day',
        displayFormats: {
          day: 'DD/MM/YYYY'
        }
      },
      distribution: 'linear',
      ticks: {
        source: 'data'
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'line',
  data: chartData,
  options: options
});

const fetchTemperatureData = async (timespan) => {
  try {
    let apiEndpoint = "";
    switch(timespan) {
      case "20":
        apiEndpoint = "https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/";
        break;
      case "24h":
        apiEndpoint = "https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/24";
        break;
      case "48h":
        apiEndpoint = "https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/48";
        break;
      case "72h":
        apiEndpoint = "https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/72";
        break;
      case "1w":
        apiEndpoint = "https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/168";
        break;
      case "1m":
        apiEndpoint = "https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/720";
        break;
      default:
        console.error("Invalid time span selected");
        return;
    }
    
    const response = await fetch(apiEndpoint);
    const temperatureData = (await response.json());
    const tableBody = document.querySelector('#temperature-data tbody');
    const chartData = {
      labels: [],
      datasets: [{
        label: 'Temperature (°C)',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };

    tableBody.innerHTML = '';

    temperatureData.forEach((item) => {
      const date = new Date(item.date_time);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      chartData.labels.push(`${formattedDate} ${formattedTime}`);
      chartData.datasets[0].data.push(item.temperature);
      const newRow = document.createElement('tr');
      newRow.innerHTML = `<td>${formattedDate}</td><td>${formattedTime}</td><td>${item.temperature}</td>`;
      tableBody.appendChild(newRow);
    });
    myChart.data = chartData;
    myChart.update();
  } catch (error) {
    console.error(error);
  }
};

const updateTemperatureData = (timespan) => {
  fetchTemperatureData(timespan);
};
window.addEventListener('load', () => {
  fetchTemperatureData('20');
});
