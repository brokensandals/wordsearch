import React from 'react';
import { connect } from 'react-redux';
import { mergeSettings } from '../actions';
import './Menu.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleShowHideClick = this.handleShowHideClick.bind(this);
    this.handleShowWordListChange = this.handleShowWordListChange.bind(this);
    this.handleShowWordHintsChange = this.handleShowWordHintsChange.bind(this);
  }

  handleShowHideClick() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  handleShowWordListChange(event) {
    this.props.mergeSettings({ showWordList: event.target.checked });
  }

  handleShowWordHintsChange(event) {
    this.props.mergeSettings({ showWordHints: event.target.checked });
  }

  render() {
    return (
      <div className={'Menu' + (this.state.expanded ? ' expanded' : '')}>
        <nav>
          <button onClick={this.handleShowHideClick}>
            {this.state.expanded ? 'close' : 'menu'}
          </button>
        </nav>

        {this.state.expanded &&
          <div>
            <div>
              <input type="checkbox"
                     id="show-word-list"
                     onChange={this.handleShowWordListChange}
                     checked={this.props.settings.showWordList} />
              <label htmlFor="show-word-list">Show word list</label>
            </div>

            <div style={ this.props.settings.showWordList ? {} : { display: 'none' } }>
              <input type="checkbox"
                     id="show-word-hints"
                     onChange={this.handleShowWordHintsChange}
                     checked={this.props.settings.showWordHints} />
              <label htmlFor="show-word-hints">
                Touch or hover over words to show their location in the grid
              </label>
            </div>
          </div>}
      </div>
    );
  }
}

function mapStateToProps({ settings }) {
  return { settings };
}

export default connect(mapStateToProps, { mergeSettings })(Menu);
