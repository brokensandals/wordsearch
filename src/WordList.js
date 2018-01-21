import React from 'react';
import { connect } from 'react-redux';
import WordListEntry from './WordListEntry';

export function WordList({ words }) {
  return (
    <ul>
      {words.map(word => (
        <li key={word}>
          <WordListEntry word={word} />
        </li>))}
    </ul>
  );
}

const mapStateToProps = ({ words }) => ({ words: words.map(word => word.word) });

export default connect(mapStateToProps, {})(WordList);
