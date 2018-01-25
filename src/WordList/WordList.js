import React from 'react';
import { connect } from 'react-redux';
import { setWordHinted } from '../actions';
import './WordList.css';

export function WordList({ words, onWordMouseOut, onWordMouseOver }) {
  return (
    <ul className="WordList">
      {words.map(word => (
        <li key={word}
            onMouseOut={() => onWordMouseOut(word)}
            onMouseOver={() => onWordMouseOver(word)}>
          {word}
        </li>))}
    </ul>
  );
}

function mapStateToProps({ words }) {
  return {
    words: Object.keys(words)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onWordMouseOut: word => dispatch(setWordHinted(word, false)),
    onWordMouseOver: word => dispatch(setWordHinted(word, true))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordList);
