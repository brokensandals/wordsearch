import React from 'react';
import { connect } from 'react-redux';
import Letter from './Letter';

export function Grid({ grid }) {
  return (
    <table>
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
