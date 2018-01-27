import React from 'react';
import { connect } from 'react-redux';
import { mergeSettings } from '../actions';
import './Menu.css';

function Menu({ settings, mergeSettings }) {
  const { expandMenu, showWordList, showWordHints } = settings;

  const handleShowHideClick = () => {
    mergeSettings({ expandMenu: !expandMenu });
  }

  const handleShowWordListChange = event => {
    mergeSettings({ showWordList: event.target.checked });
  }

  const handleShowWordHintsChange = event => {
    mergeSettings({ showWordHints: event.target.checked });
  }

  return (
    <div className={'Menu' + (expandMenu ? ' expanded' : '')}>
      <nav>
        <button onClick={handleShowHideClick}>
          {expandMenu ? 'close' : 'menu'}
        </button>
      </nav>

      {expandMenu &&
        <div>
          <div>
            <input type="checkbox"
                   id="show-word-list"
                   onChange={handleShowWordListChange}
                   checked={showWordList} />
            <label htmlFor="show-word-list">Show word list</label>
          </div>

          <div style={ showWordList ? {} : { display: 'none' } }>
            <input type="checkbox"
                   id="show-word-hints"
                   onChange={handleShowWordHintsChange}
                   checked={showWordHints} />
            <label htmlFor="show-word-hints">
              Touch or hover over a word to highlight its location
            </label>
          </div>
        </div>}
    </div>
  );
}

function mapStateToProps({ settings }) {
  return { settings };
}

export default connect(mapStateToProps, { mergeSettings })(Menu);
