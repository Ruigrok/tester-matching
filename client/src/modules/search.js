import axios from 'axios';

export const REQUEST_DATA = 'search/REQUEST_DATA'
export const RECEIVE_DATA = 'search/RECEIVE_DATA'

export const TOGGLE_COUNTRY = 'search/TOGGLE_COUNTRY'
export const TOGGLE_DEVICE = 'search/TOGGLE_DEVICE'
export const ALL_COUNTRIES = 'search/ALL_COUNTRIES'
export const ALL_DEVICES = 'search/ALL_DEVICES'
export const CLEAR_COUNTRIES = 'search/CLEAR_COUNTRIES'
export const CLEAR_DEVICES = 'search/CLEAR_DEVICES'

const initialState = {
  countries: [],
  devices: [],
  initialData: [],
  isFetching: false,
  lastUpdated: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_DATA:
      return {
        ...state,
        isFetching: true,
      }

    case RECEIVE_DATA:
      return {
        ...state,
        isFetching: false,
        countries: action.countries,
        devices: action.devices,
        initialData: action.initialData,
        lastUpdated: action.receivedAt
      }

    case TOGGLE_COUNTRY:
      return {
        ...state,
        countries: state.countries.map(country =>
          (country.countryId === action.countryId)
            ? { ...country, selected: !country.selected }
            : country
        )
      }

    case TOGGLE_DEVICE:
      return {
        ...state,
        devices: state.devices.map(device =>
          (device.deviceId === action.deviceId)
            ? { ...device, selected: !device.selected }
            : device
        )
      }

    case ALL_COUNTRIES:
      return {
        ...state,
        countries: state.countries.map(country =>
          ({ ...country, selected: true })
        )
      }

    case ALL_DEVICES:
      return {
        ...state,
        devices: state.devices.map(device =>
          ({ ...device, selected: true })
        )
      }

    case CLEAR_COUNTRIES:
    return {
      ...state,
      countries: state.countries.map(country =>
        ({ ...country, selected: false })
      )
    }

    case CLEAR_DEVICES:
      return {
        ...state,
        devices: state.devices.map(device =>
          ({ ...device, selected: false })
        )
      }

    default:
      return state
  }
}

export const requestData = () => {
  return dispatch => {
    dispatch({
      type: REQUEST_DATA
    })
  }
}

export const receiveData = (response) => {
  console.log(response);
  return dispatch => {
    dispatch({
      type: RECEIVE_DATA,
      countries: response.data.countries.map((country, index) => ({
        countryId: index + 1,
        name: country,
        selected: false
      })),
      devices: response.data.devices,
      initialData: response.data.bugs,
      receivedAt: Date.now()
    })
  }
}

export const fetchData = () => {
  return dispatch => {
    dispatch(requestData())
    return axios.get('api/data')
      .then(response => dispatch(receiveData(response)))
  }
}

export const toggleCountry = (countryId) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_COUNTRY,
      countryId
    })
  }
}

export const toggleDevice = (deviceId) => {
  return dispatch => {
    dispatch({
      type: TOGGLE_DEVICE,
      deviceId
    })
  }
}

export const allCountries = () => {
  return dispatch => {
    dispatch({
      type: ALL_COUNTRIES
    })
  }
}

export const allDevices = () => {
  return dispatch => {
    dispatch({
      type: ALL_DEVICES
    })
  }
}

export const clearCountries = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_COUNTRIES
    })
  }
}

export const clearDevices = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_DEVICES
    })
  }
}