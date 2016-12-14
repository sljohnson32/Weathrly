import React from 'react';
import DayWeather from './day-weather';
import formatLocation from './format-location';

export default class WeatherInfo extends React.Component {

  welcomeMessage() {
    return (
      <div className="forecastHeader">
        <p>Please enter a location!</p>
      </div>
      )
  }

  locationNotFound() {
    return (
      <div className="forecastHeader">
        <p>Please enter a valid location!</p>
        <img src='lib/img/location-not-found.jpg' className='Img-LocationNotFound' />
      </div>
    )
  }

  displayWeather(data) {
    let displayLocation = formatLocation(data[0].location);
    return (
      <div>
        <section className='forecastHeader'>
          <h2>{displayLocation + "'S "}7 Day Forecast</h2>
        </section>
        <section className='WeatherList'>
          {data.map((day, index) => {
            return <DayWeather key={index} {...day} />;
        })
        }
        </section>
      </div>
    )
  }

  render() {
    let { data, currentLocation } = this.props;
    if (!data) {
      return this.welcomeMessage();
    } else if (!data.length) {
      return this.locationNotFound();
    } else return this.displayWeather(data);
  }
}
