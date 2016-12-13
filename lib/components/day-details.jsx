import React from 'react';
import HourlyDetails from './hourly-details';

const DayDetails = (props) => {
  let timeBreakDown = props.timeBreakDown;
  return (
    <div>
      <aside>
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

module.exports = DayDetails;
