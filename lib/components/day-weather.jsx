import React from 'react';
import DayDetails from './day-details';
import getImg from './get-img';

export default class DayWeather extends React.Component {
  constructor() {
    super();
    this.state = {
      showDetails: false,
    };
  }
  showHideDetails() {
    this.setState( {showDetails: !this.state.showDetails} )
  }

  showExtremeWeather() {
    return (
      <div className='ExtremeWeather'>
        <img src='lib/img/extreme-weather.png' />
        <p>Extreme weather</p>
      </div>
    )
  }

  render() {
    let { date, hourly, temp, weatherType } = this.props;
    let percent = `${Math.round(weatherType.chance * 100)}%`;
    let extremeWeatherScale = weatherType.scale;
      return (
        <div>
          <section className='DayOverview'>
            <article className='DayHeader'>
              <h3>{ date }</h3>
            </article>
            <article className='DayInfo'>
              <h4>Forecast: </h4>
              {extremeWeatherScale > 2 && <this.showExtremeWeather />}
              <img src={getImg(weatherType.type)} />
              <article className='HighLows'>
                <h4>{ "High: " + temp.high }</h4>
                <h4>{ "Low: " + temp.low }</h4>
              </article>
              <p>{weatherType.type.toUpperCase() + " (" + percent + ") " + " with a high of " + temp.high + " and a low of " + temp.low + "."}</p>
            </article>
            <article className='ShowDetails-container'>
              <button
                className="ShowDetails-button"
                onClick=
                  {this.showHideDetails.bind(this)
                }
              >Hourly</button>
              { this.state.showDetails && <DayDetails {...hourly} /> }
            </article>
          </section>
        </div>
      )
  }
}
