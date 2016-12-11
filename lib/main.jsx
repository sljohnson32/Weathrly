import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
      data: null
    };
  }

  componentDidMount(){
    let storedLocation = localStorage.getItem('location');

    this.setState({
      location: storedLocation ? storedLocation : ''
    })
    this.setState({
      data: JSON.parse(localStorage.getItem('data'))
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
        <h1>Weathrly</h1>
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
        <WeatherInfo data={this.state.data} location={this.state.location}  />
      </div>
    );
  }
};

const WeatherInfo = ( {data}, {location} ) => {
  let displayLocation = location;
  if (data === null) {
    return (
      <div className="WelcomeMessage">
        Please enter a location!
      </div>
    )
  } else return (
    <div>
      <h2>{displayLocation + "'s 7 Day Forcast"}</h2>
      <ul className='WeatherList'>
      {data.map((day, index) => {
        return <DayWeather key={index} {...day} />;
      })
      }
      </ul>
    </div>
  );
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
    const { date, hourly, temp, weatherType } = this.props;

    if (this.state.showDetails === false) {
      return (
        <div>
          <section className='DayOverview'>
            <article className='DayHeader'>
              <h3>{ date }</h3>
              <button
                className="ShowDetails-button"
                onClick=
                  {this.showHideDetails.bind(this)
                }
              >Hourly</button>
            </article>
            <article className='DayInfo'>
              <h4>Today's Forecast: </h4>
              <p>{ weatherType.type.toUpperCase() + " with a high of " + temp.high + " and a low of " + temp.low + "."}</p>
              <article className='HighLows'>
                <h4>{ "Today's high: " + temp.high }</h4>
                <h4>{ "Today's low: " + temp.low }</h4>
              </article>
            </article>
          </section>
        </div>
      )
    } else return (
        <div>
          <section className='DayOverview'>
            <article className='DayHeader'>
              <h3>{ date }</h3>
              <button
                className="ShowDetails-button"
                onClick=
                  {this.showHideDetails.bind(this)
                }
              >Hourly</button>
            </article>
            <article className='DayInfo'>
              <h4>Today's Forecast: </h4>
              <p>{ weatherType.type + " with a high of " + temp.high + " and a low of " + temp.low + "."}</p>
              <article className='HighLows'>
                <h4>{ "Today's high: " + temp.high }</h4>
                <h4>{ "Today's low: " + temp.low }</h4>
              <DayDetails {...hourly} display={this.state.showDetails} />
              </article>
            </article>
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
            let value = <HourlyDetails key={index} {...timeBreakDown} />
            return value;
          })}
        </ul>
      </aside>
    </div>
  )
}

const HourlyDetails = (props) => {
  return (
    <div>
      hi
    </div>
  )
}

ReactDOM.render(<Main />, document.getElementById('app'));
