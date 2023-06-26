import weather from "../assets/svg/weather.svg";
import clear from "../assets/svg/clear.svg";
import cloudy from "../assets/svg/cloudy.svg";
import drizzle from "../assets/svg/drizzle.svg";
import rain from "../assets/svg/rain.svg";
import snow from "../assets/svg/snow.svg";
import thunder from "../assets/svg/thunder.svg";

const ParseWeatherCode = (weathercode) => {
  let icon = "";
  let weatherDesc = "";

  switch (weathercode) {
    case 0:
      icon = clear;
      weatherDesc = "Clear sky";
      break;
    case 1:
    case 2:
    case 3:
    case 45:
    case 48:
      icon = cloudy;
      weatherDesc = "Cloudy";
      break;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      icon = drizzle;
      weatherDesc = "Drizzle";
      break;
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      icon = rain;
      weatherDesc = "Rain";
      break;
    case 71:
    case 73:
    case 75:
    case 77:
      icon = snow;
      weatherDesc = "Snow fall";
      break;
    case 80:
    case 81:
    case 82:
      icon = rain;
      weatherDesc = "Rain showers";
      break;
    case 85:
    case 86:
      icon = snow;
      weatherDesc = "Snow showers";
      break;
    case 95:
    case 96:
    case 99:
      icon = thunder;
      weatherDesc = "Thunderstorm";
      break;
    default:
      icon = weather;
      weatherDesc = "Undefined";
      break;
  }
  return { icon, weatherDesc };
};

export default ParseWeatherCode;
