import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchData } from '../../modules/search'
import Home from '../home/Home';
import Search from '../search/Search';

class App extends Component {

  componentDidMount() {
    this.props.fetchData()
  }

  render(props) {
    return (!this.props.isFetching &&
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <Link to="/" >Tester Matching</Link>
          </h1>
        </header>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.search.isFetching,
  initialData: state.search.initialData,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchData,
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))

