import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WordList } from './WordList';

Enzyme.configure({ adapter: new Adapter() });

describe('<WordList />', () => {
  it('renders a <WordListEntry /> for each word', () => {
    const testWords = ['HUNGRY', 'SATIATED'];
    const wrapper = shallow(<WordList words={testWords} />);
    const wordListEntries = wrapper.find('WordListEntry');
    expect(wordListEntries).toHaveLength(2);
    expect(wordListEntries.get(0).props.word).toBe('HUNGRY');
    expect(wordListEntries.get(1).props.word).toBe('SATIATED');
  });
});
