import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import WeatherInfo from './components/weather-info.jsx';

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
        <header>
          <h1>Weathrly!</h1>
          <p>The premier 7-day forecast tool...</p>
        </header>
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

ReactDOM.render(<Main />, document.getElementById('app'));
