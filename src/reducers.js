import { combineReducers } from 'redux';
import _ from 'lodash';

const TEST_STATE = {
  grid: [['H', 'I', 'X', 'Y', 'Z'],
         ['O', 'T', 'R', 'I', 'P'],
         ['W', 'S', 'U', 'U', 'A'],
         ['A', 'B', 'M', 'M', 'N'],
         ['Z', 'W', 'U', 'P', 'V']],
  settings: {
    expandMenu: false,
    showWordList: true,
    showWordHints: false
  },
  words: {
    HI: {
      word: 'HI',
      start: {x: 0, y: 0},
      end: {x: 1, y: 0}
    },
    HOW: {
      word: 'HOW',
      start: {x: 0, y: 0},
      end: {x: 0, y: 2}
    },
    RUN: {
      word: 'RUN',
      start: {x: 2, y: 1},
      end: {x: 4, y: 3}
    },
    RUM: {
      word: 'RUM',
      start: {x: 2, y: 1},
      end: {x: 2, y: 3}
    },
    TRIP: {
      word: 'TRIP',
      start: {x: 1, y: 1},
      end: {x: 4, y: 1}
    }
  }
};

export function grid(state = TEST_STATE.grid, action) {
  return state;
}

export function settings(state = TEST_STATE.settings, action) {
  switch (action.type) {
    case 'MERGE_SETTINGS':
      return {...state, ...action.updatedSettings };
    default:
      return state;
  }
}

export function words(state = TEST_STATE.words, action) {
  switch (action.type) {
    case 'SET_WORD_HINTED':
      if (state[action.word]) {
        return { ...state,
          [action.word]: { ...state[action.word], hinted: action.hinted }
        };
      } else {
        return state;
      }
    case 'ATTEMPT_SOLUTION':
      const word = Object.values(state).find(word =>
        (_.isEqual(word.start, action.start) && _.isEqual(word.end, action.end)) ||
        (_.isEqual(word.start, action.end) && _.isEqual(word.end, action.start)));
      if (word) {
        return { ...state,
          [word.word]: { ...word, solved: true }
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}

export default combineReducers({
  grid,
  settings,
  words
});
