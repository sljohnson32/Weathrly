
const getImg = (type) => {
  switch (type) {
    case 'cloudy':
      return 'lib/img/cloudy.png';
    case 'foggy':
      return 'lib/img/foggy.png';
    case 'rain':
      return 'lib/img/rain.png';
    case 'snow':
      return 'lib/img/snow.png';
    case 'sunny':
      return 'lib/img/sunny.png';
    case 'thunder storms':
      return 'lib/img/thunderstorm.png';
    case 'windy':
      return 'lib/img/windy.png';
  };
}

module.exports = getImg;
