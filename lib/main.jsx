import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Cloudy from './img/cloudy.png';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
      data: null
    };
  }

  componentDidMount(){
    this.setState({
      data: JSON.parse(localStorage.getItem('data')),
    })
  }

  updateLocation(e) {
    const location = e.target.value;
    this.setState({ location: location });
    localStorage.setItem('location', location);
  }

  setWeatherData(e) {
    e.preventDefault();
    let location = this.state.location;
    $.get('http://weatherly-api.herokuapp.com/api/weather/' + location).then(function(input) {
      let newData = input.slice(0, 7);
      this.setState( {data: newData} );
      localStorage.setItem('data', JSON.stringify(newData))
    }.bind(this));
  }

  render() {
    return (
      <div className='WeatherBox'>
        <h1>Weathrly!</h1>
        <p>The premier 7-day forecast tool...</p>
        <section className='SetLocation'>
          <input
            type='text'
            className='SetLocation-input'
            name='location'
            onChange={
              this.updateLocation.bind(this)
            }
          />
          <button
            className='SetLocation-submit'
            onClick={
              this.setWeatherData.bind(this)
            }
          >Set Location</button>
        </section>
        <WeatherInfo data={this.state.data} currentLocation={this.state.location} />
      </div>
    );
  }
};

const formatLocation = (input) => {
  switch (input) {
    case 'denver':
      return 'DENVER';
    case 'san-diego':
      return 'SAN DIEGO';
    case 'san-fransico':
      return 'SAN FRANCISCO';
    case 'castle-rock':
      return 'CASTLE ROCK';
  };
}

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

export class WeatherInfo extends React.Component {

  render() {
    let { data, currentLocation } = this.props;
    if (!data) {
      return (
        <div className="Message-Welcome">
          Please enter a location!
        </div>
        )
    } else if (!data.length) {
      return (
        <div className="Message-LocationNotFound">
          Please enter a valid location!
        </div>
        )
    } else {
      let displayLocation = formatLocation(data[0].location);
      return (
        <div>
          <h2>{displayLocation + "'s"}</h2>
          <h3>7 Day Forcast</h3>
          <ul className='WeatherList'>
          {data.map((day, index) => {
            return <DayWeather key={index} {...day} />;
          })
          }
          </ul>
        </div>
      );
    }
  }
}

export class DayWeather extends React.Component {
  constructor() {
    super();
    this.state = {
      showDetails: false,
    };
  }
  showHideDetails() {
    this.setState( {showDetails: !this.state.showDetails} )
  }

  render() {
    let { date, hourly, temp, weatherType } = this.props;
    let percent = `${Math.round(weatherType.chance * 100)}%`;
      return (
        <div>
          <section className='DayOverview'>
            <article className='DayHeader'>
              <h3>{ date }</h3>
            </article>
            <article className='DayInfo'>
              <h4>Today's Forecast: </h4>
              <img src={getImg(weatherType.type)} />
              <article className='HighLows'>
                <h4>{ "High: " + temp.high }</h4>
                <h4>{ "Low: " + temp.low }</h4>
              </article>
              <p>{weatherType.type.toUpperCase() + " (" + percent + ") " + " with a high of " + temp.high + " and a low of " + temp.low + "."}</p>
            </article>
            <button
              className="ShowDetails-button"
              onClick=
                {this.showHideDetails.bind(this)
              }
            >Hourly</button>
            { this.state.showDetails && <DayDetails {...hourly} display={this.state.showDetails} /> }
          </section>
        </div>
      )
  }
}

const DayDetails = (props) => {
  let timeBreakDown = props.timeBreakDown;
  return (
    <div>
      <aside className='HourlyInfo'>
        <ul>
          {timeBreakDown.map((hour, index) => {
            let newKey = 'hour' + (index + 1);
            let value = <HourlyDetails key={index} index={index} hour={hour[newKey]} />
            return value;
          })}
        </ul>
      </aside>
    </div>
  )
}

const getHour = {
  0: '12am',
  1: '1am',
  2: '2am',
  3: '3am',
  4: '4am',
  5: '5am',
  6: '6am',
  7: '7am',
  8: '8am',
  9: '9am',
  10: '10am',
  11: '11am',
  12: '12pm',
  13: '1pm',
  14: '2pm',
  15: '3pm',
  16: '4pm',
  17: '5pm',
  18: '6pm',
  19: '7pm',
  20: '8pm',
  21: '9pm',
  22: '10pm',
  23: '11pm'
}

const HourlyDetails = (props) => {
  debugger;
  return (
    <div>
      <h4>{getHour[props.index]}</h4>
      <img src={getImg(props.hour.type)} />
      <h4>{'Temp: ' + props.hour.temp}</h4>
    </div>
  )
};


ReactDOM.render(<Main />, document.getElementById('app'));
