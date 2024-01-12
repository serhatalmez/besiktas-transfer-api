const axios = require('axios');
const jsonWrapper = require('./jsonWrapper.js');
var db = jsonWrapper.readJSON("data.json");
const WEBHOOK_URL = "";
const API_KEY = "";
const options = {
  method: 'GET',
  url: 'https://transfermarket.p.rapidapi.com/transfers/list-by-club',
  params: {
    id: '114',
    seasonID: '2023',
    domain: 'de'
  },
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com'
  }
};

async function fetchData() {
  try {
    const response = await axios.request(options);
    let transferData = response.data.currentSeason.transferArrivals;
    console.log(db.lastUpdatedCounter, transferData.length);
    if (db.lastUpdatedCounter != transferData.length) {
      db.lastUpdatedCounter = transferData.length;

      // NEW TRANSFER ARRIVED!!!!!
      console.log(transferData[0].playerName);
      log(transferData[0].playerName);
      jsonWrapper.writeJSON("data.json", db);  
    }
  } catch (error) {
    console.error(error);
  }
}

fetchData();

setInterval(() => {
  fetchData();
}, 1000 * 60 * 10);

function log(playerName){
  var params = {
      username: "BESIKTAS TRANSFER API",
      avatar_url: "",
      content: playerName + " isimli oyuncu Beşiktaş'a transfer oldu!🦅🦅🦅 @everyone",
  }

  axios.post(WEBHOOK_URL, params)
}