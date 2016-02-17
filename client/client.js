import React from 'react';
import { render } from 'react-dom';

import App from '../comp_rendering/lib/shared/components/App';

console.log('Hello client!');

render(
  <App />,
  document.getElementById('root'),
  () => console.log('App rendered')
);
