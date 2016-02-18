import React from 'react';
import { Link } from 'react-router';

const menuStyle = {
  position: 'absolute',
  top: 0,
  zIndex: 9999,
};

export default () => <div style={menuStyle}>
  <Link to='/'>Home</Link> -&nbsp;
  <Link to='/test'>Test page</Link> -&nbsp;
  <Link to='/@admin'>Admin user page</Link> -&nbsp;
  <Link to='/@thisUserDoesNotExist'>404 user page</Link> -&nbsp;
  <Link to='/thisPageDoesNotExist'>404 page</Link> -&nbsp;
  <a href="https://github.com/dherault/Aquest" target="_blank">Github</a>
</div>;
