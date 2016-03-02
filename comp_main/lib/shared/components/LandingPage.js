import React from 'react';
import { connect } from 'react-redux';

import ac from '../state/actionCreators';
import LandingPageAuth from './LandingPageAuth';

class LandingPage extends React.Component {
  
  render() {
    
    return <div className='landing_wrapper'>
      {`App is working! _ LandingPage`}
      <br />
      <br />
      <LandingPageAuth 
        loginAction={params => this.props.dispatch(ac.login(params))}
        signupAction={() => this.props.history.push('/dev/new_adventure')}
      />
    </div>;
  }
}

export default connect()(LandingPage);
