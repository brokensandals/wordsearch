import React from 'react';
import { connect } from 'react-redux';
import './Letter.css'

export function Letter({ letter }) {
  return (
    <span className="Letter">
      {letter}
    </span>
  );
}

const mapStateToProps = ({ grid }, { position: { x, y } }) => {
  return {
    letter: grid[y][x]
  };
};

export default connect(mapStateToProps, {})(Letter);
