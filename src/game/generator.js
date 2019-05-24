export function createGame({dictionary, height, pick, width, wordCount}) {
  const result = {
    grid: Array(height).fill([]).map(() => Array(width).fill(null)),
    words: {}
  };

  for (var wordIndex = 0; wordIndex < wordCount; wordIndex++) {
    for (var retries = 5; retries >=0; retries--) {
      //...
    }
  }

  return result;
  // plan:
  // wordCount times:
  //   select random location
  //   select random direction
  //   filter dictionary to words that fit
  //     if empty, retry with new location/direction a fixed number of times, then fail
  //   select random word
  // fixed number of retries:
  //   fill all remaining spots with random letters
  //   verify each selected word only appears in the intended location
}

