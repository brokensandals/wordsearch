import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WordList } from './WordList';

Enzyme.configure({ adapter: new Adapter() });

describe('<WordList />', () => {
  it('renders an <li /> for each word', () => {
    const testWords = ['HUNGRY', 'SATIATED'];
    const wrapper = shallow(<WordList words={testWords} />);
    const entries = wrapper.find('li');
    expect(entries).toHaveLength(2);
    expect(entries.at(0).text()).toBe('HUNGRY');
    expect(entries.at(1).text()).toBe('SATIATED');
  });

  it('handles mouseover events for words', () => {
    const fn = jest.fn();
    const wrapper = shallow(<WordList words={['TEST']} onWordMouseOver={fn} />);
    wrapper.find('li').at(0).simulate('mouseover');
    expect(fn).toHaveBeenCalledWith('TEST');
  });

  it('handles mouseout events for words', () => {
    const fn = jest.fn();
    const wrapper = shallow(<WordList words={['TEST']} onWordMouseOut={fn} />);
    wrapper.find('li').at(0).simulate('mouseout');
    expect(fn).toHaveBeenCalledWith('TEST');
  });
});
