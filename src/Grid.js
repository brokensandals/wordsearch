import React from 'react';
import { connect } from 'react-redux';

function Grid({ grid }) {
  return (
    <table>
      {grid.map(row => (
        <tr>
          {row.map(cell => (
            <td>
              {cell}
            </td>))}
        </tr>))}
    </table>
  );
}

const mapStateToProps = ({ grid }) => ({ grid });

export default connect(mapStateToProps, {})(Grid);
