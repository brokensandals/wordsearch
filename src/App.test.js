import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders a <Grid />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Connect(Grid)')).toHaveLength(1);
  });

  it('renders a <WordList />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Connect(WordList)')).toHaveLength(1);
  });
});
