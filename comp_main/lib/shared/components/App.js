import React from 'react';
import DevMenu from './DevMenu';

export default class App extends React.Component {
  
  render() {
    return <div>
      <DevMenu />
      { this.props.children }
    </div>;
  }
}
