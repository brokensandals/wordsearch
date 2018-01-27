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

  it('sets hinted and solved classes when word is both hinted and solved', () => {
    const words = [{ word: 'TEST', hinted: true, solved: true }];
    const wrapper = shallow(<WordList words={words} />);
    expect(wrapper.find('li .hinted.solved')).toHaveLength(1);
  });

  describe('when showWordHints is true', () => {
    const showWordHints = true;

    it('sets hinted to true on mouseover', () => {
      const words = [{ word: 'TEST' }];
      const fn = jest.fn();
      const wrapper = shallow(<WordList words={words} setWordHinted={fn} showWordHints={showWordHints} />);
      wrapper.find('li').at(0).simulate('mouseover');
      expect(fn).toHaveBeenCalledWith('TEST', true);
    });

    it('sets hinted to false on mouseout', () => {
      const words = [{ word: 'TEST' }];
      const fn = jest.fn();
      const wrapper = shallow(<WordList words={words} setWordHinted={fn} showWordHints={showWordHints} />);
      wrapper.find('li').at(0).simulate('mouseout');
      expect(fn).toHaveBeenCalledWith('TEST', false);
    });
  });

  describe('when showWordHints is false', () => {
    const showWordHints = false;

    it('does not set hinted on mouseover', () => {
      const words = [{ word: 'TEST' }];
      const fn = jest.fn();
      const wrapper = shallow(<WordList words={words} setWordHinted={fn} showWordHints={showWordHints} />);
      wrapper.find('li').at(0).simulate('mouseover');
      expect(fn).not.toBeCalled();
    });

    it('does not set hinted on mouseout', () => {
      const words = [{ word: 'TEST' }];
      const fn = jest.fn();
      const wrapper = shallow(<WordList words={words} setWordHinted={fn} showWordHints={showWordHints} />);
      wrapper.find('li').at(0).simulate('mouseout');
      expect(fn).not.toBeCalled();
    });
  });
});
