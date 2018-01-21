import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Letter } from './Letter';

Enzyme.configure({ adapter: new Adapter() });

describe('<Letter />', () => {
  it('renders the given letter', () => {
    const wrapper = shallow(<Letter letter="J" />);
    const span = wrapper.find('span .Letter');
    expect(span).toHaveLength(1);
    expect(span.text()).toBe('J');
  });
});
