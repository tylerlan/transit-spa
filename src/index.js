import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { transit as rootReducer } from './reducers/index';

import App from './App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { WIDGET_ID } from './constants/constants';

/* eslint-disable react/jsx-filename-extension */

ReactDOM.render(
  <Provider store={store}>
    <App widgetId={WIDGET_ID} />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();

export default App;
export { rootReducer };
