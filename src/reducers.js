import { combineReducers } from 'redux';

const TEST_STATE = {
  grid: [['H', 'I', 'X', 'Y', 'Z'],
         ['O', 'T', 'R', 'I', 'P'],
         ['W', 'S', 'U', 'U', 'A'],
         ['A', 'B', 'M', 'M', 'N'],
         ['Z', 'W', 'U', 'P', 'V']],
  words: {
    HI: {
      start: {x: 0, y: 0},
      end: {x: 1, y: 0},
      hinted: true
    },
    HOW: {
      start: {x: 0, y: 0},
      end: {x: 0, y: 2}
    },
    RUN: {
      start: {x: 2, y: 1},
      end: {x: 4, y: 3},
      hinted: true
    },
    RUM: {
      start: {x: 2, y: 1},
      end: {x: 2, y: 3}
    },
    TRIP: {
      start: {x: 1, y: 1},
      end: {x: 4, y: 1}
    }
  }
};

function grid(state = TEST_STATE.grid, action) {
  return state;
}

function words(state = TEST_STATE.words, action) {
  switch (action.type) {
    case 'SET_WORD_HINTED':
      return { ...state,
        [action.word]: { ...state[action.word], hinted: action.hinted }
      };
    default:
      return state;
  }
}

export default combineReducers({
  grid,
  words
});
