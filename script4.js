const table = document.querySelector('#light-data tbody');

function createTableCell(row, text) {
    const cell = document.createElement("td");
    if (text !== undefined) {
      cell.innerText = text;
    }
    row.appendChild(cell);
  }
  
  

function addTableRow(data) {
    const newRow = document.createElement("tr");
    const dateTime = new Date(data.date_time);
    const date = dateTime.getDate().toString().padStart(2, '0') + '.' + (dateTime.getMonth()+1).toString().padStart(2, '0') + '.' + dateTime.getFullYear().toString();
    const time = dateTime.getHours().toString().padStart(2, '0') + ':' + dateTime.getMinutes().toString().padStart(2, '0');
    createTableCell(newRow, date);
    createTableCell(newRow, time);
    createTableCell(newRow, data.light);
    table.appendChild(newRow);
    updateChartData(data);
  }
  
async function fetchLightData() {
    try {
        const response = await fetch("https://webapi19sa-1.course.tamk.cloud/v1/weather/light");
        const data = await response.json();
        const lightData = data.slice(0, 20);
        lightData.forEach((item) => addTableRow(item));
    } catch (error) {
        console.error(error);
    }
}

fetchLightData();
