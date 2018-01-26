export function setWordHinted(word, hinted) {
  return { type: 'SET_WORD_HINTED', word, hinted };
}

export function attemptSolution(start, end) {
  return { type: 'ATTEMPT_SOLUTION', start, end };
}
