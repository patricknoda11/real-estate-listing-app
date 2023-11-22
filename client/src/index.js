import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Import Components:
import App from './App';
import store from './state/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
