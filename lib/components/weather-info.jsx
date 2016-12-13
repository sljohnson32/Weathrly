import React from 'react';
import DayWeather from './day-weather';
import formatLocation from './format-location';

export default class WeatherInfo extends React.Component {

  render() {
    let { data, currentLocation } = this.props;
    if (!data) {
      return (
        <div className="Message-Welcome">
          <p>Please enter a location!</p>
        </div>
        )
    } else if (!data.length) {
      return (
        <div className="Message-LocationNotFound">
          <p>Please enter a valid location!</p>
          <img src='lib/img/location-not-found.jpg' className='Img-LocationNotFound' />
        </div>
        )
    } else {
      let displayLocation = formatLocation(data[0].location);
      return (
        <div>
          <section className='forecastHeader'>
            <h2>{displayLocation + "'s"}</h2>
            <h3>7 Day Forcast</h3>
          </section>
          <section className='WeatherList'>
            {data.map((day, index) => {
              return <DayWeather key={index} {...day} />;
          })
          }
          </section>
        </div>
      );
    }
  }
}
