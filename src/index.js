
import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import './css/index.css';
import * as serviceWorker from './serviceWorker';

// import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.unregister();
