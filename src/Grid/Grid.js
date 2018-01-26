import React from 'react';
import { connect } from 'react-redux';
import { attemptSolution } from '../actions';
import _ from 'lodash';
import './Grid.css';

const CELL_WIDTH = 30;
const CELL_HEIGHT = 30;
const CELL_FONT_SIZE = 24;
const CELL_PADDING_Y = CELL_HEIGHT - CELL_FONT_SIZE;

export class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposedSolution: null,
      hoverCell: null
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseDown(event) {
    if (this.state.proposedSolution) {
      // The user already clicked on the grid earlier to start a
      // selection; we'll complete their selection on the next
      // mouseup event.
      return;
    }

    // Start a selection.
    const coords = {
      x: event.clientX - this.svg.getBoundingClientRect().left,
      y: event.clientY - this.svg.getBoundingClientRect().top
    };
    this.setState({
      proposedSolution: {
        start: coords,
        end: coords
      }});
    event.preventDefault();
  }

  handleMouseMove(event) {
    // Update hoverCell in order to highlight the cell that the
    // mouse is currently in, and also update proposedSolution
    // if the user is in the process of making a selection.
    const coords = {
      x: event.clientX - this.svg.getBoundingClientRect().left,
      y: event.clientY - this.svg.getBoundingClientRect().top
    };
    const cellCoords = {
      x: Math.floor(coords.x / 30),
      y: Math.floor(coords.y / 30)
    };
    this.setState(prevState => {
      const state = { hoverCell: cellCoords };
      if (prevState.proposedSolution) {
        state.proposedSolution = {
          start: prevState.proposedSolution.start,
          end: coords
        };
      }
      return state;
    });
    event.preventDefault();
  }

  handleMouseUp(event) {
    if (this.state.proposedSolution) {
      const { start, end } = this.state.proposedSolution;
      // If the mouse hasn't moved since the mousedown event,
      // we'll assume the user just clicked to choose their starting
      // point and wants to click again to choose the ending point.
      // Otherwise, the user has either finished dragging from the
      // start to the end point, or they've finished clicking to
      // indicate the end point, so it's time to check whether
      // they've actually found a word.
      if (!_.isEqual(start, end)) {
        this.props.attemptSolution(
          {
            x: Math.floor(this.state.proposedSolution.start.x / 30),
            y: Math.floor(this.state.proposedSolution.start.y / 30)
          },
          {
            x: Math.floor(this.state.proposedSolution.end.x / 30),
            y: Math.floor(this.state.proposedSolution.end.y / 30)
          }
        )
        this.setState({ proposedSolution: null });
        event.preventDefault();
      }
    }
  }

  handleMouseLeave() {
    this.setState({ hoverCell: null });
  }

  render() {
    const { grid, words } = this.props;
    return (
      <svg xmlns="http://www.w3.org/2000/svg"
           width={30*grid[0].length} height={30*grid.length}
           className="Grid"
           onMouseDown={this.handleMouseDown}
           onMouseMove={this.handleMouseMove}
           onMouseUp={this.handleMouseUp}
           onMouseLeave={this.handleMouseLeave}
           ref={svg => this.svg = svg} >

        {this.state.hoverCell &&
          <rect className="hover"
                x={this.state.hoverCell.x * CELL_WIDTH}
                y={this.state.hoverCell.y * CELL_HEIGHT}
                width={CELL_WIDTH}
                height={CELL_HEIGHT} />}

        {grid.map((row, y) =>
          row.map((letter, x) => (
            <text key={[x, y]}
                  x={x * CELL_WIDTH + (CELL_WIDTH / 2)}
                  y={(y + 1) * CELL_HEIGHT - CELL_PADDING_Y}
                  fontSize={CELL_FONT_SIZE}
                  textAnchor="middle">
              {letter}
            </text>)))}

        {words.filter(word => word.hinted || word.solved)
              .map(({word, start, end, hinted, solved}) => (
          <line className={hinted ? 'hinted' : 'solved'}
                key={word}
                x1={start.x * CELL_WIDTH + (CELL_WIDTH / 2)}
                y1={start.y * CELL_HEIGHT + (CELL_HEIGHT / 2)}
                x2={end.x * CELL_WIDTH + (CELL_WIDTH / 2)}
                y2={end.y * CELL_HEIGHT + (CELL_HEIGHT / 2)} />))}

        {this.state.proposedSolution &&
          <line className="solved"
                key="_proposed_solution"
                x1={this.state.proposedSolution.start.x}
                x2={this.state.proposedSolution.end.x}
                y1={this.state.proposedSolution.start.y}
                y2={this.state.proposedSolution.end.y} />}
      </svg>
    );
  }
}

const mapStateToProps = ({ grid, words }) => ({ grid, words: Object.values(words) });

function mapDispatchToProps(dispatch) {
  return {
    attemptSolution: (start, end) => dispatch(attemptSolution(start, end))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
