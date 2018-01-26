import { grid, words } from './reducers';
import { attemptSolution, setWordHinted } from './actions';

describe('grid reducer', () => {
  it('does nothing', () => {
    expect(grid('foo', {})).toEqual('foo')
  })
});

describe('words reducer', () => {
  describe('SET_WORD_HINTED action', () => {
    it('sets hinted to false', () => {
      const state = {
        HUNGRY: {
          hinted: true
        }
      };
      const action = setWordHinted('HUNGRY', false);
      const result = words(state, action);
      expect(result['HUNGRY'].hinted).toBe(false);
    });

    it('sets hinted to true', () => {
      const state = {
        HUNGRY: {
          hinted: false
        }
      };
      const action = setWordHinted('HUNGRY', true);
      const result = words(state, action);
      expect(result['HUNGRY'].hinted).toBe(true);
    });

    it('does not affect other attributes on the word', () => {
      const state = {
        HUNGRY: {
          hinted: false,
          whatever: 12345
        }
      };
      const action = setWordHinted('HUNGRY', true);
      const result = words(state, action);
      expect(result['HUNGRY'].whatever).toBe(12345);
      expect(result['HUNGRY'].hinted).toBe(true);
    });

    it('does not affect other words', () => {
      const state = {
        HAPPY: {
          hinted: false
        },
        HUNGRY: {
          hinted: false,
        }
      };
      const action = setWordHinted('HUNGRY', true);
      const result = words(state, action);
      expect(result['HAPPY']).toEqual(state['HAPPY']);
      expect(result['HUNGRY'].hinted).toBe(true);
    });

    it('ignores unknown words', () => {
      const state = {
        HAPPY: {
          hinted: false
        }
      };
      const action = setWordHinted('HUNGRY', true);
      const result = words(state, action);
      expect(result).toEqual(state);
    });
  });

  describe('ATTEMPT_SOLUTION action', () => {
    it('ignores coordinates that do not match a word', () => {
      const state = {
        HAPPY: {
          word: 'HAPPY',
          start: {x: 1, y: 2},
          end: {x: 5, y: 6},
          solved: false
        }
      };
      const action = attemptSolution({x: 1, y: 2}, {x: 5, y: 7});
      const result = words(state, action);
      expect(result).toEqual(state);
    });

    it('sets solved to true', () => {
      const state = {
        HAPPY: {
          word: 'HAPPY',
          start: {x: 1, y: 2},
          end: {x: 5, y: 6},
          solved: false
        }
      };
      const action = attemptSolution({x: 1, y: 2}, {x: 5, y: 6});
      const result = words(state, action);
      expect(result['HAPPY'].solved).toBe(true);
    });

    it('does not care about order of start and end in action', () => {
      const state = {
        HAPPY: {
          word: 'HAPPY',
          start: {x: 1, y: 2},
          end: {x: 5, y: 6},
          solved: false
        }
      };
      const action = attemptSolution({x: 5, y: 6}, {x: 1, y: 2});
      const result = words(state, action);
      expect(result['HAPPY'].solved).toBe(true);
    });

    it('does not affect other attributes on the word', () => {
      const state = {
        HAPPY: {
          word: 'HAPPY',
          start: {x: 1, y: 2},
          end: {x: 5, y: 6},
          solved: false,
          whatever: 12345
        }
      };
      const action = attemptSolution({x: 1, y: 2}, {x: 5, y: 6});
      const result = words(state, action);
      expect(result['HAPPY'].whatever).toBe(12345);
      expect(result['HAPPY'].solved).toBe(true);
    });

    it('does not affect other words', () => {
      const state = {
        AMIABLE: {
          word: 'AMIABLE',
          start: {x: 1, y: 3},
          end: {x: 7, y: 9},
          solved: false
        },
        HAPPY: {
          word: 'HAPPY',
          start: {x: 1, y: 2},
          end: {x: 5, y: 6},
          solved: false
        }
      };
      const action = attemptSolution({x: 1, y: 2}, {x: 5, y: 6});
      const result = words(state, action);
      expect(result['AMIABLE']).toEqual(state['AMIABLE']);
      expect(result['HAPPY'].solved).toBe(true);
    });
  });
});
