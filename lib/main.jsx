import React from 'react';
import ReactDOM from 'react-dom';


export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
      data: {},
    };
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
           />
          <button className='SetLocation-submit'>Set Location</button>
        </section>
        <section className='WeatherInfoBox'>Weather Info Will Go Here</section>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));
