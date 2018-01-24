import React from 'react';
import { connect } from 'react-redux';
import './Grid.css';

const CELL_WIDTH = 30;
const CELL_HEIGHT = 30;
const CELL_FONT_SIZE = 24;
const CELL_MIDDLE_Y = 22; // unsure if this number just happens to work or has significance

export function Grid({ grid, hintedWordPositions }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={30*grid[0].length} height={30*grid.length}
         className="Grid">
      {grid.map((row, y) =>
        row.map((letter, x) => (
          <text key={[x, y]}
                x={x * CELL_WIDTH + (CELL_WIDTH / 2)}
                y={(y + 1) * CELL_HEIGHT}
                font-size={CELL_FONT_SIZE}
                text-anchor="middle">
            {letter}
          </text>)))}
      {hintedWordPositions.map(({word, start, end}) => (
        <line className="hint"
              key={word}
              x1={start.x * CELL_WIDTH + (CELL_WIDTH / 2)}
              y1={start.y * CELL_HEIGHT + CELL_MIDDLE_Y}
              x2={end.x * CELL_WIDTH + (CELL_WIDTH / 2)}
              y2={end.y * CELL_HEIGHT + CELL_MIDDLE_Y} />))}
    </svg>
  );
}

const mapStateToProps = ({ grid, hintedWords, wordPositions }) => (
  {
    grid,
    hintedWordPositions: hintedWords.map(hinted => wordPositions[hinted])
  }
);

export default connect(mapStateToProps, {})(Grid);
