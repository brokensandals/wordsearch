import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WordListEntry } from './WordListEntry';

Enzyme.configure({ adapter: new Adapter() });

describe('<WordListEntry />', () => {
  it('renders the given word', () => {
    const wrapper = shallow(<WordListEntry word="HUNGRY" />);
    const span = wrapper.find('span .WordListEntry');
    expect(span).toHaveLength(1);
    expect(span.text()).toBe('HUNGRY');
  });
});
