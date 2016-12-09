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

  updateLocation(e) {
    const location = e.target.value;
    this.setState({ location: location });
  }

  setWeatherData(e) {
    e.preventDefault();
    let location = this.state.location;
    $.get('http://weatherly-api.herokuapp.com/api/weather/' + location).then(function(input) {
      this.setState( {data: input} );
    }.bind(this));
  }

  render() {
    return (
      <div className='WeatherBox'>
        <h1>Weathrly</h1>
        <section className='SetLocation'>
          <h2 className='SetLocation-message'></h2>
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
        <WeatherInfo data={this.state.data}  />
      </div>
    );
  }
}

const WeatherInfo = ( {data} ) => {
  render() {
    if (data === null) {
      return (
        <div>
          Please enter a location!
        </div>
      )
    }

  return (
    <div className='WeatherList'>
      <ul>
      {data.map((day) => {
        return <DayWeather key={day.date} {...day} />;
      })
      }
      </ul>
    </div>
  );
  }
}

const DayWeather = (props) => {
  const { date, hourly, temp, weatherType } = props;
  let ShowDetails = false;

  showHideDetails() {
    ShowDetails = !ShowDetails;
  }

  render() {
    return (
      <div>
        <section
          className='DayOverview'
          onClick=
            {this.showHideDetails.bind(this);
          }
          >
          <h2>{ date }</h2>
            <p>{ "Today's Summary: " + weatherType.type + " with a high of " + temp.high + " and a low of " + temp.low + "."}</p>
          <article className='HighLows'>
            <h4>{ "Today's high: " + temp.high }</h4>
            <h4>{ "Today's low: " + temp.low }</h4>
            <DayDetails {...hourly} display={showDetails} />
          </article>
        </section>
      </div>
    )
  }
}


const DayDetails = (props, display) => {
  let timeBreakDown = props.timeBreakDown;
  let displayStatus = display;

  render() {
    if (!displayStatus) {
      return <div></div>
    }

    return (
      <div>
        <aside className='DayDetails'>
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
}

const HourlyDetails = (props) => {
  render() {
    return (
      <div>
        hi
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));
