import React from 'react';
import { connect } from 'react-redux';
import { attemptSolution } from '../actions';
import './Grid.css';

const CELL_WIDTH = 30;
const CELL_HEIGHT = 30;
const CELL_FONT_SIZE = 24;
const CELL_MIDDLE_Y = 22; // unsure if this number just happens to work or has significance

export class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposedSolution: null
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown(event) {
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
    const coords = {
      x: event.clientX - this.svg.getBoundingClientRect().left,
      y: event.clientY - this.svg.getBoundingClientRect().top
    }
    this.setState(prevState => {
      if (prevState.proposedSolution) {
        return {
          proposedSolution: {
            start: prevState.proposedSolution.start,
            end: coords
          }
        }
      }
    });
    event.preventDefault();
  }

  handleMouseUp(event) {
    if (this.state.proposedSolution) {
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
    }
    this.setState({ proposedSolution: null });
    event.preventDefault();
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
           ref={svg => this.svg = svg} >
        {grid.map((row, y) =>
          row.map((letter, x) => (
            <text key={[x, y]}
                  x={x * CELL_WIDTH + (CELL_WIDTH / 2)}
                  y={(y + 1) * CELL_HEIGHT}
                  fontSize={CELL_FONT_SIZE}
                  textAnchor="middle">
              {letter}
            </text>)))}
        {words.filter(word => word.hinted || word.solved)
              .map(({word, start, end, hinted, solved}) => (
          <line className={hinted ? 'hinted' : 'solved'}
                key={word}
                x1={start.x * CELL_WIDTH + (CELL_WIDTH / 2)}
                y1={start.y * CELL_HEIGHT + CELL_MIDDLE_Y}
                x2={end.x * CELL_WIDTH + (CELL_WIDTH / 2)}
                y2={end.y * CELL_HEIGHT + CELL_MIDDLE_Y} />))}

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
