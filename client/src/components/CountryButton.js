import React from 'react';

const CountryButton = props => {

  let statusClass = '';
  if (props.selected === true) {
    statusClass = 'country selected';
  } else {
    statusClass = 'country';
  }


  return (
    <button
      className={statusClass}
      onClick={() => { props.handleClick(props.countryId) }}
    >
      {props.name}
    </button>
  )
};

export default CountryButton;