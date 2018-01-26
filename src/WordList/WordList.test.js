import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WordList } from './WordList';

Enzyme.configure({ adapter: new Adapter() });

describe('<WordList />', () => {
  it('renders an <li /> for each word', () => {
    const words = [
      { word: 'HUNGRY' },
      { word: 'SATIATED' }
    ];
    const wrapper = shallow(<WordList words={words} />);
    const entries = wrapper.find('li');
    expect(entries).toHaveLength(2);
    expect(entries.at(0).text()).toBe('HUNGRY');
    expect(entries.at(1).text()).toBe('SATIATED');
  });

  it('handles mouseover events for words', () => {
    const words = [{ word: 'TEST' }];
    const fn = jest.fn();
    const wrapper = shallow(<WordList words={words} onWordMouseOver={fn} />);
    wrapper.find('li').at(0).simulate('mouseover');
    expect(fn).toHaveBeenCalledWith('TEST');
  });

  it('handles mouseout events for words', () => {
    const words = [{ word: 'TEST' }];
    const fn = jest.fn();
    const wrapper = shallow(<WordList words={words} onWordMouseOut={fn} />);
    wrapper.find('li').at(0).simulate('mouseout');
    expect(fn).toHaveBeenCalledWith('TEST');
  });

  it('does not set hinted or solved class when word is not hinted or solved', () => {
    const words = [{ word: 'TEST' }];
    const wrapper = shallow(<WordList words={words} />);
    expect(wrapper.find('li .hinted')).toHaveLength(0);
    expect(wrapper.find('li .solved')).toHaveLength(0);
  });

  it('sets hinted class when word is hinted', () => {
    const words = [{ word: 'TEST', hinted: true }];
    const wrapper = shallow(<WordList words={words} />);
    expect(wrapper.find('li .hinted')).toHaveLength(1);
    expect(wrapper.find('li .solved')).toHaveLength(0);
  });

  it('sets solved class when word is solved', () => {
    const words = [{ word: 'TEST', solved: true }];
    const wrapper = shallow(<WordList words={words} />);
    expect(wrapper.find('li .hinted')).toHaveLength(0);
    expect(wrapper.find('li .solved')).toHaveLength(1);
  });

  it('set hinted and solved classes when word is both hinted and solved', () => {
    const words = [{ word: 'TEST', hinted: true, solved: true }];
    const wrapper = shallow(<WordList words={words} />);
    expect(wrapper.find('li .hinted.solved')).toHaveLength(1);
  });
});
