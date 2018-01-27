export function attemptSolution(start, end) {
  return { type: 'ATTEMPT_SOLUTION', start, end };
}

export function mergeSettings(updatedSettings) {
  return { type: 'MERGE_SETTINGS', updatedSettings };
}

export function setWordHinted(word, hinted) {
  return { type: 'SET_WORD_HINTED', word, hinted };
}
