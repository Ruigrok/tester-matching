import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  toggleCountry,
  toggleDevice,
  allCountries,
  allDevices,
  clearCountries,
  clearDevices
} from '../../modules/search'
import CountryButton from '../../components/CountryButton'
import DeviceButton from '../../components/DeviceButton'
import Results from '../../components/Results'

const Search = props => (
  <div className={'search-wrapper'}>
    <h3>Countries</h3>
    <p>
      <button className={'selectorBtn'} onClick={props.allCountries}>Select All</button>
      <button className={'selectorBtn'} onClick={props.clearCountries}>Clear All</button>
    </p>

    {props.countries.map((item, index) => {
      return <CountryButton
        name={item.name}
        selected={item.selected}
        handleClick={props.toggleCountry}
        key={index}
        countryId={item.countryId}
      />
    })}

    <br />

    <h3>Devices</h3>
    <p>
      <button className={'selectorBtn'} onClick={props.allDevices}>Select All</button>
      <button className={'selectorBtn'} onClick={props.clearDevices}>Clear All</button>
    </p>
    <div className={'flex-container device-div'}>
      {props.devices.map((item, index) => {
        return <DeviceButton
          description={item.description}
          selected={item.selected}
          handleClick={props.toggleDevice}
          key={index}
          deviceId={item.deviceId}
        />
      })}
    </div>


    {/* <p><button onClick={() => props.changePage()}>Go to Home</button></p> */}

    <Results />

  </div>
)

const mapStateToProps = state => ({
  countries: state.search.countries,
  devices: state.search.devices,
  sortedResults: state.search.sortedResults
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleCountry,
  toggleDevice,
  allCountries,
  allDevices,
  clearCountries,
  clearDevices,
  changePage: () => push('/')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
