import React from 'react';

/* Dumb component */
export default class LandingPageAuth extends React.Component {
  
  constructor() {
    super();
    
    this.state = {
      emailOrUsername: 'admin',
      password: 'password',
    };
  }
  
  handleInput(key, e) {
    this.setState({
      [key]: e.target.value
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.loginAction(); // todo: proptypes
  }
  
  render() {
    
    return <div>
      <form onSubmit={this.handleSubmit.bind(this)} >
        <span>Log in</span>
        <input 
          type='text' 
          value={this.state.emailOrUsername}
          placeholder='Email or username'
          onChange={this.handleInput.bind(this, 'emailOrUsername')} />
        <input 
          type='password' 
          value={this.state.password} 
          placeholder='Password'
          onChange={this.handleInput.bind(this, 'password')} />
        <input 
          type='submit' 
          value='Go!' />
        </form>
      <div>
        Or
      </div>
      <div>
        <input type='submit' value='Start new adventure!' onClick={this.props.signupAction}/>
      </div>
    </div>;
  }
}
