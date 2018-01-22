import React from 'react';
import { connect } from 'react-redux';
import Letter from './Letter';
import './Grid.css';

export function Grid({ grid }) {
  return (
    <table className="Grid">
      {grid.map((row, y) => (
        <tr key={y}>
          {row.map((_, x) => (
            <td key={x}>
              <Letter position={{x, y}} />
            </td>))}
        </tr>))}
    </table>
  );
}

const mapStateToProps = ({ grid }) => ({ grid });

export default connect(mapStateToProps, {})(Grid);
