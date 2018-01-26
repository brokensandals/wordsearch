import { attemptSolution, setWordHinted } from './actions';

describe('attemptSolution action creator', () => {
  it('creates the action', () => {
    const expected = {
      type: 'ATTEMPT_SOLUTION',
      start: {x: 1, y: 2},
      end: {x: 3, y: 4}
    };
    const result = attemptSolution({x: 1, y: 2}, {x: 3, y: 4});
    expect(result).toEqual(expected);
  });
});

describe('setWordHinted action creator', () => {
  it('creates the action', () => {
    const expected = {
      type: 'SET_WORD_HINTED',
      word: 'HUNGRY',
      hinted: true
    };
    const result = setWordHinted('HUNGRY', true);
    expect(result).toEqual(expected);
  });
});
