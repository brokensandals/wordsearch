import words from './words';

describe('words array', () => {
  it('has a bunch of entries', () => {
    expect(words.length).toBeGreaterThan(100000);
  });

  it('contains only alphabetic characters', () => {
    words.forEach(word => {
      expect(word).toMatch(/^[a-zA-Z]+$/);
    });
  });
});
