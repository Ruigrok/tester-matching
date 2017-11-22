import React from 'react';

const DeviceButton = props => {

  let statusClass = '';
  if (props.selected === true) {
    statusClass = 'device selected';
  } else {
    statusClass = 'device';
  }

  return (
    <button
      className={statusClass}
      onClick={e => { 
        e.preventDefault()
        props.handleClick(props.deviceId) 
      }}
    >
      {props.description}
    </button>
  )
};

export default DeviceButton;