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
         ['W', 'S', 'U', 'U', 'A'],
         ['A', 'B', 'M', 'M', 'N'],
         ['Z', 'W', 'U', 'P', 'V']],
  words: [
    {
      word: 'HI',
      start: {x: 0, y: 0},
      end: {x: 1, y: 0}
    },
    {
      word: 'HOW',
      start: {x: 0, y: 0},
      end: {x: 0, y: 2}
    },
    {
      word: 'RUN',
      start: {x: 2, y: 1},
      end: {x: 4, y: 3}
    },
    {
      word: 'RUM',
      start: {x: 2, y: 1},
      end: {x: 2, y: 3}
    },
    {
      word: 'TRIP',
      start: {x: 1, y: 1},
      end: {x: 4, y: 1}
    }
  ]
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
