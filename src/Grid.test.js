import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Grid } from './Grid';

Enzyme.configure({ adapter: new Adapter() });

describe('<Grid />', () => {
  it('renders a <text /> for each letter on the grid', () => {
    const testGrid = [['A', 'B'], ['C', 'D']];
    const wrapper = shallow(<Grid grid={testGrid} hintedWordPositions={[]} />);
    const letters = wrapper.find('text');
    expect(letters).toHaveLength(4);
    expect(letters.at(0).text()).toEqual('A');
    expect(letters.at(1).text()).toEqual('B');
    expect(letters.at(2).text()).toEqual('C');
    expect(letters.at(3).text()).toEqual('D');
  });

  it('renders a <line /> for each hinted word', () => {
    const testHints = [
      {
        word: 'HI',
        start: {x: 1, y: 1},
        end: {x: 3, y: 1}
      },
      {
        word: 'YO',
        start: {x: 1, y: 1},
        end: {x: 1, y: 3}
      },
      {
        word: 'HEY',
        start: {x: 1, y: 2},
        end: {x: 3, y: 4}
      }
    ];
    const wrapper = shallow(<Grid grid={[['A']]} hintedWordPositions={testHints} />);
    const lines = wrapper.find('line .hint');
    expect(lines).toHaveLength(3);
    const horizontal = lines.get(0);
    expect(horizontal.props.x1).toEqual(45);
    expect(horizontal.props.x2).toEqual(105);
    expect(horizontal.props.y1).toEqual(52);
    expect(horizontal.props.y2).toEqual(52);
    const vertical = lines.get(1);
    expect(vertical.props.x1).toEqual(45);
    expect(vertical.props.x2).toEqual(45);
    expect(vertical.props.y1).toEqual(52);
    expect(vertical.props.y2).toEqual(112);
    const diagonal = lines.get(2);
    expect(diagonal.props.x1).toEqual(45);
    expect(diagonal.props.x2).toEqual(105);
    expect(diagonal.props.y1).toEqual(82);
    expect(diagonal.props.y2).toEqual(142);
  });
});
