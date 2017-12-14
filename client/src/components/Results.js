import React from 'react'
import { connect } from 'react-redux'


class Results extends React.Component {
  render(props) {

    const selectedCountries = this.props.countries.filter(c => c.selected).map(c => c.name);
    const selectedDevices = this.props.devices.filter(d => d.selected).map(d => d.deviceId);
    const bugs = this.props.bugs;

    const match = bugs
      .filter((bug) => {
        if (selectedCountries.length > 0 && selectedDevices.length > 0) {
          return selectedDevices.indexOf(bug.deviceId) > -1
            && selectedCountries.indexOf(bug.country) > -1;
        }
      })

    var result = [];
    match.reduce((res, item) => {
      if (!res[item.testerId]) {
        res[item.testerId] = {
          ...item,
          qty: 0
        };
        result.push(res[item.testerId])
      }
      res[item.testerId].qty += item.qty
      return res;
    }, {});

    result.sort((a, b) => {
      return b.qty - a.qty
    });

    let display;
    if (selectedCountries.length > 0 && selectedDevices.length > 0) {
      display = (
        result.map((tester, i) => {
          return (
            <div key={i}>
              <p className={'match-name'}>{tester.firstName} {tester.lastName}</p>
              <ul className={'match-list'}>
                <li>{tester.qty} bugs filed for devices in search</li>
              </ul>
            </div>
          )
        })
      )
    } else if (selectedCountries.length > 0) {
      display = (
        <p>Select Devices to See Matches</p>
      )
    } else if (selectedDevices.length > 0) {
      display = (
        <p>Select Countries to See Matches</p>
      )
    } else {
      display = (
        <p>Select Countries and Devices to See Matches</p>
      )
    }

    return (

      <div className={'results-div'}>
        <h3 className={'header matches-header'}>Matches</h3>
        {display}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  countries: state.search.countries,
  devices: state.search.devices,
  bugs: state.search.initialData
})

export default connect(
  mapStateToProps
)(Results)

