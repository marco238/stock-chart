const key = 'demo';
const functionName = 'TIME_SERIES_DAILY';
const symbolName = 'MSFT';
const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbolName}&apikey=${key}`;
 
axios
  .get(apiUrl)
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data); // <== call the function here where you used to console.log() the response
  })
  .catch(err => console.log('Error while getting the data: ', err));
 
function printTheChart(stockData) {
  const dailyData = stockData['Time Series (Daily)'];
 
  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map(date => dailyData[date]['4. close']);
 
  const ctx = document.getElementById('my-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDates,
      datasets: [
        {
          label: 'Stock Chart',
          backgroundColor: '#adb5bd',
          borderColor: '#343a40',
          data: stockPrices
        }
      ]
    }
  }); // closes chart = new Chart()
} // closes printTheChart()