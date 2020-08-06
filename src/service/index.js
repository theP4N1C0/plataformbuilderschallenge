const axios = require('axios');

async function getCurrentWeather({latitude, longitude}) {
  let result = await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=41945f7193fc9e36b616e863967f2e71`,
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

  return result;
}

export default getCurrentWeather;
