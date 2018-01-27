import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Menu from './Menu/Menu';
import Grid from './Grid/Grid';
import WordList from './WordList/WordList';

function App({ showWordList }) {
  return (
    <div className="App">
      <Menu />
      <Grid />
      {showWordList && <WordList />}
    </div>
  );
}

function mapStateToProps({ settings: { showWordList } }) {
  return { showWordList };
}

export default connect(mapStateToProps, {})(App);
