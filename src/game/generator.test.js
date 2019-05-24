import { createGame } from './generator';

describe('createGame', () => {
  it('returns grid and words', () => {
    const state = createGame({dictionary: {}, height: 10, pick: () => null, width: 15, wordCount: 3});
    expect(state.grid).toBeDefined();
    expect(state.words).toBeDefined();
    expect(state.grid).toHaveLength(10);
    state.grid.forEach(columns => expect(columns).toHaveLength(15));
    expect(state.words).toHaveLength(3);
  });
});

