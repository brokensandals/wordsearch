import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const TEST_STATE = {
  grid: [['H', 'I', 'X', 'Y', 'Z'],
         ['O', 'T', 'R', 'I', 'P'],
         ['W', 'S', 'U', 'X', 'A'],
         ['A', 'B', 'N', 'M', 'M'],
         ['Z', 'W', 'U', 'P', 'V']]
};

function placeholderReducer(state = TEST_STATE, action) {
  return state;
}

let store = createStore(placeholderReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
