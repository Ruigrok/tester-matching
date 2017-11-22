import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


const Home = props => (
  <div className='landing-wrapper'>
    <h2 className={'landing-text'}>The world’s largest community of digital experience quality experts</h2>
      <button
        className={'landing-button'}
        onClick={() => props.changePage()}>
        Search the Community
      </button>

  </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/search')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Home)

