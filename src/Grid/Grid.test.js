import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Grid } from './Grid';

Enzyme.configure({ adapter: new Adapter() });

describe('<Grid />', () => {
  it('renders a <text /> for each letter on the grid', () => {
    const testGrid = [['A', 'B'], ['C', 'D']];
    const wrapper = shallow(<Grid grid={testGrid} words={[]} />);
    const letters = wrapper.find('text');
    expect(letters).toHaveLength(4);
    expect(letters.at(0).text()).toEqual('A');
    expect(letters.at(1).text()).toEqual('B');
    expect(letters.at(2).text()).toEqual('C');
    expect(letters.at(3).text()).toEqual('D');
  });

  it('renders a <line /> for each hinted word', () => {
    const words = [
      {
        word: 'HI',
        start: {x: 1, y: 1},
        end: {x: 3, y: 1},
        hinted: true
      },
      {
        word: 'YO',
        start: {x: 1, y: 1},
        end: {x: 1, y: 3},
        hinted: true
      },
      {
        word: 'HEY',
        start: {x: 1, y: 2},
        end: {x: 3, y: 4},
        hinted: true
      }
    ];
    const wrapper = shallow(<Grid grid={[['A']]} words={words} />);
    const lines = wrapper.find('line .hinted');
    expect(lines).toHaveLength(3);
    const horizontal = lines.get(0);
    expect(horizontal.props.x1).toEqual(45);
    expect(horizontal.props.x2).toEqual(105);
    expect(horizontal.props.y1).toEqual(45);
    expect(horizontal.props.y2).toEqual(45);
    const vertical = lines.get(1);
    expect(vertical.props.x1).toEqual(45);
    expect(vertical.props.x2).toEqual(45);
    expect(vertical.props.y1).toEqual(45);
    expect(vertical.props.y2).toEqual(105);
    const diagonal = lines.get(2);
    expect(diagonal.props.x1).toEqual(45);
    expect(diagonal.props.x2).toEqual(105);
    expect(diagonal.props.y1).toEqual(75);
    expect(diagonal.props.y2).toEqual(135);
  });

  it('renders a <line /> for each solved word', () => {
    const words = [
      {
        word: 'HI',
        start: {x: 1, y: 1},
        end: {x: 3, y: 1},
        solved: true
      },
      {
        word: 'YO',
        start: {x: 1, y: 1},
        end: {x: 1, y: 3},
        solved: true
      },
      {
        word: 'HEY',
        start: {x: 1, y: 2},
        end: {x: 3, y: 4},
        solved: true
      }
    ];
    const wrapper = shallow(<Grid grid={[['A']]} words={words} />);
    const lines = wrapper.find('line .solved');
    expect(lines).toHaveLength(3);
    const horizontal = lines.get(0);
    expect(horizontal.props.x1).toEqual(45);
    expect(horizontal.props.x2).toEqual(105);
    expect(horizontal.props.y1).toEqual(45);
    expect(horizontal.props.y2).toEqual(45);
    const vertical = lines.get(1);
    expect(vertical.props.x1).toEqual(45);
    expect(vertical.props.x2).toEqual(45);
    expect(vertical.props.y1).toEqual(45);
    expect(vertical.props.y2).toEqual(105);
    const diagonal = lines.get(2);
    expect(diagonal.props.x1).toEqual(45);
    expect(diagonal.props.x2).toEqual(105);
    expect(diagonal.props.y1).toEqual(75);
    expect(diagonal.props.y2).toEqual(135);
  });

  it('gives hints precedence over solutions', () => {
    const words = [
      {
        word: 'HI',
        start: {x: 1, y: 1},
        end: {x: 3, y: 1},
        solved: true,
        hinted: true
      }
    ];
    const wrapper = shallow(<Grid grid={[['A']]} words={words} />);
    expect(wrapper.find('line .solved')).toHaveLength(0);
    expect(wrapper.find('line .hinted')).toHaveLength(1);
  });
});
