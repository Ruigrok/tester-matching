import React from 'react'
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
    <div className={'countries'}>
      <h3 className={'header'}>Countries</h3>
      <p>
        <button className={'selectorBtn'} onClick={props.allCountries}>Select All</button>
        <button className={'selectorBtn'} onClick={props.clearCountries}>Clear All</button>
      </p>

      <div className={'flex-container country-div'}>
        {props.isFetching ?
          <h4>Loading...</h4> :
          props.countries.map((item, index) => {
            return <CountryButton
              name={item.name}
              selected={item.selected}
              handleClick={props.toggleCountry}
              key={index}
              countryId={item.countryId}
            />
          })}
      </div>
    </div>

    <div className={'countries'}>
      <h3 className={'header'}>Devices</h3>
      <p>
        <button className={'selectorBtn'} onClick={props.allDevices}>Select All</button>
        <button className={'selectorBtn'} onClick={props.clearDevices}>Clear All</button>
      </p>
      <div className={'flex-container device-div'}>
        {props.isFetching ?
          <h4>Loading...</h4> :
          props.devices.map((item, index) => {
            return <DeviceButton
              description={item.description}
              selected={item.selected}
              handleClick={props.toggleDevice}
              key={index}
              deviceId={item.deviceId}
            />
          })}
      </div>
    </div>

    <Results />

  </div>
)

const mapStateToProps = state => ({
  isFetching: state.search.isFetching,
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
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
