import React from 'react';
import { Link } from 'react-router';

const menuStyle = {
  margin: 'auto',
  textAlign: 'center',
};

const itemStyle = {
  marginRight: 10,
};

export default () => <div style={menuStyle}>
  <Link style={itemStyle} to='/dev/'>Home</Link>
  <Link style={itemStyle} to='/dev/test'>Test page</Link>
  <Link style={itemStyle} to='/dev/@admin'>Admin user page</Link>
  <Link style={itemStyle} to='/dev/@thisUserDoesNotExist'>404 user page</Link>
  <Link style={itemStyle} to='/dev/thisPageDoesNotExist'>404 page</Link>
  <a href="https://github.com/dherault/Aquest" target="_blank">Github</a>
</div>;
