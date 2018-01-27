import React from 'react';
import { connect } from 'react-redux';
import { setWordHinted } from '../actions';
import './WordList.css';

export function WordList({ words, showWordHints, setWordHinted }) {
  setWordHinted = showWordHints ? setWordHinted : (() => null);

  return (
    <ul className="WordList">
      {words.map(({ word, hinted, solved }) => (
        <li key={word}
            className={((hinted ? 'hinted ' : ' ') + (solved ? 'solved' : '')).trim()}
            onMouseOut={() => setWordHinted(word, false)}
            onMouseOver={() => setWordHinted(word, true)}>
          {word}
        </li>))}
    </ul>
  );
}

function mapStateToProps({ settings, words }) {
  return {
    showWordHints: settings.showWordHints,
    words: Object.values(words)
  };
}

export default connect(mapStateToProps, { setWordHinted })(WordList);
