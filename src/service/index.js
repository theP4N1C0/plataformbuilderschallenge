const axios = require('axios');

import Config from 'react-native-config';

async function getCurrentWeather({latitude, longitude}) {
  let result = await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Config.API_KEY}`,
    )
    .then((response) => {
      let data = response.data;

      let infor = {
        temperature: data.main.temp,
        name: `${data.sys.country}, ${data.name}`,
      };

      return infor;
    })
    .catch((err) => {
      return `Consulting API error${err}`;
    });
  console.log('KEY: ', Config);
  return result;
}

export default getCurrentWeather;
