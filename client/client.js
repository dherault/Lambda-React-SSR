import React from 'react';
import { render } from 'react-dom';

import { logStart, log } from '../comp_main/lib/shared/utils/logger';
import createApp from '../comp_main/lib/shared/createApp';
import registerSideEffects from './registerSideEffects';
import registerShortcuts from './registerShortcuts';

logStart('Hello client!');

// App creation
const { store, userInterface } = createApp(window.STATE_FROM_SERVER || {});

render(
  userInterface,
  document.getElementById('root'),
  () => log('App rendered')
);

registerSideEffects(store); // Side effects init
registerShortcuts(store); // Keyboard shortcuts init
