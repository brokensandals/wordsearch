import React from 'react';
import { connect } from 'react-redux';

const Grid = ({ grid }) => {
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
