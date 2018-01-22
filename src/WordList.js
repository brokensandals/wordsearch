import React from 'react';
import { connect } from 'react-redux';
import WordListEntry from './WordListEntry';
import './WordList.css';

export function WordList({ words }) {
  return (
    <ul className="WordList">
      {words.map(word => (
        <li key={word}>
          <WordListEntry word={word} />
        </li>))}
    </ul>
  );
}

const mapStateToProps = ({ words }) => ({ words: words.map(word => word.word) });

export default connect(mapStateToProps, {})(WordList);
