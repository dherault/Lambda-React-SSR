import React from 'react';
// import { Link } from 'react-router';

export default class NotFound extends React.Component {
  
  static getName() {
    return 'NotFound';
  }
  
  render() {
    return (
      <div>
        <div style={{
          marginTop: '10%',
          fontSize: '10rem',
          width: '100%',
          textAlign: 'center',
        }}>
          404 
        </div>
      </div>
    );
  }
}
