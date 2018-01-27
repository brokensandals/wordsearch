import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders a <Menu />', () => {
    const wrapper = shallow(<App showWordList={false} />);
    expect(wrapper.find('Connect(Menu)')).toHaveLength(1);
  });

  it('renders a <Grid />', () => {
    const wrapper = shallow(<App showWordList={false} />);
    expect(wrapper.find('Connect(Grid)')).toHaveLength(1);
  });

  it('does not render a <WordList /> when showWordList is false', () => {
    const wrapper = shallow(<App showWordList={false} />);
    expect(wrapper.find('Connect(WordList)')).toHaveLength(0);
  });

  it('renders a <WordList /> when showWordList is true', () => {
    const wrapper = shallow(<App showWordList={true} />);
    expect(wrapper.find('Connect(WordList)')).toHaveLength(1);
  });
});
