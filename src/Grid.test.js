import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Grid } from './Grid';

Enzyme.configure({ adapter: new Adapter() });

describe('<Grid />', () => {
  it('renders a <Letter /> for each position of the grid', () => {
    const testGrid = [['A', 'B'], ['C', 'D']];
    const wrapper = shallow(<Grid grid={testGrid} />);
    const letters = wrapper.find('Connect(Letter)');
    expect(letters).toHaveLength(4);
    expect(letters.get(0).props.position).toEqual({x: 0, y: 0});
    expect(letters.get(1).props.position).toEqual({x: 1, y: 0});
    expect(letters.get(2).props.position).toEqual({x: 0, y: 1});
    expect(letters.get(3).props.position).toEqual({x: 1, y: 1});
  });
});
