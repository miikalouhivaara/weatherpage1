const apiUrl = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50';
const formatDateTime = (date) => date.toLocaleDateString('en-US') + ' ' + date.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'});
const tableConfig = {
  humidity_in: '#humidity-in-table',
  humidity_out: '#humidity-out-table',
  wind_speed: '#wind-speed-table',
  temperature: '#temperature-table',
  rain: '#rain-table',
  light: '#light-table',
  wind_direction: '#wind-direction-table'
};

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const filteredData = data.reduce((acc, d) => {
      for (const [key, value] of Object.entries(d.data)) {
        if (value !== undefined) {
          acc[key].push({date_time: new Date(d.date_time), value});
        }
      }
      return acc;
    }, {
      humidity_in: [],
      humidity_out: [],
      wind_speed: [],
      temperature: [],
      rain: [],
      light: [],
      wind_direction: []
    });

    for (const [key, value] of Object.entries(filteredData)) {
      const tableBody = value.map(d => `<tr><td>${formatDateTime(d.date_time)}</td><td>${d.value}</td></tr>`).join('');
      document.querySelector(tableConfig[key] + ' tbody').innerHTML = tableBody;
    }
  })
  .catch(error => console.error(error));
