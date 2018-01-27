import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Menu } from './Menu';

Enzyme.configure({ adapter: new Adapter() });

describe('<Menu />', () => {
  var settings;
  var mergeSettings;

  beforeEach(() => {
    settings = {
      expandMenu: false,
      showWordList: false,
      showWordHints: false
    };
    mergeSettings = jest.fn();
  });

  const build = () => shallow(<Menu settings={settings} mergeSettings={mergeSettings} />);

  describe('when expandMenu is false', () => {
    it('shows button for expanding menu', () => {
      const wrapper = build();
      expect(wrapper.find('button')).toHaveLength(1);
      expect(wrapper.find('button').at(0).text()).toBe('menu');
    });

    it('expands menu when button is clicked', () => {
      build().find('button').simulate('click');
      expect(mergeSettings).toHaveBeenCalledWith({ expandMenu: true });
    });

    it('does not render the rest of the menu', () => {
      const wrapper = build();
      expect(wrapper.find('input')).toHaveLength(0);
    });
  });

  describe('when expandMenu is true', () => {
    beforeEach(() => {
      settings.expandMenu = true;
    });

    it('shows button for closing menu', () => {
      const wrapper = build();
      expect(wrapper.find('button')).toHaveLength(1);
      expect(wrapper.find('button').at(0).text()).toBe('close');
    });

    it('closes menu when button is clicked', () => {
      build().find('button').simulate('click');
      expect(mergeSettings).toHaveBeenCalledWith({ expandMenu: false });
    });

    describe('when showWordList is false', () => {
      it('renders unchecked box for showing word list', () => {
        const wrapper = build();
        const checkbox = wrapper.find('input#show-word-list[type="checkbox"]');
        expect(checkbox).toHaveLength(1);
        expect(checkbox.props().checked).toBe(false);
        const label = wrapper.find('label[htmlFor="show-word-list"]');
        expect(label).toHaveLength(1);
      });

      it('sets showWordList to true when checkbox is changed', () => {
        const event = { target: { checked: true } };
        build().find('input#show-word-list').simulate('change', event);
        expect(mergeSettings).toHaveBeenCalledWith({ showWordList: true });
      });

      it('does not render controls for showing word hints', () => {
        const wrapper = build();
        expect(wrapper.find('input#show-word-hints')).toHaveLength(0);
        expect(wrapper.find('label[for="show-word-hints"]')).toHaveLength(0);
      });
    });

    describe('when showWordList is true', () => {
      beforeEach(() => {
        settings.showWordList = true;
      });

      it('renders checked box for showing word list', () => {
        const wrapper = build();
        const checkbox = wrapper.find('input#show-word-list[type="checkbox"]');
        expect(checkbox).toHaveLength(1);
        expect(checkbox.props().checked).toBe(true);
        const label = wrapper.find('label[htmlFor="show-word-list"]');
        expect(label).toHaveLength(1);
      });

      it('sets showWordList to false when checkbox is changed', () => {
        const event = { target: { checked: false } };
        build().find('input#show-word-list').simulate('change', event);
        expect(mergeSettings).toHaveBeenCalledWith({ showWordList: false });
      });

      describe('when showWordHints is false', () => {
        it('renders unchecked box for showing word hints', () => {
          const wrapper = build();
          const checkbox = wrapper.find('input#show-word-hints[type="checkbox"]');
          expect(checkbox).toHaveLength(1);
          expect(checkbox.props().checked).toBe(false);
          const label = wrapper.find('label[htmlFor="show-word-hints"]');
          expect(label).toHaveLength(1);
        });

        it('sets showWordHints to true when checkbox is changed', () => {
          const event = { target: { checked: true } };
          build().find('input#show-word-hints').simulate('change', event);
          expect(mergeSettings).toHaveBeenCalledWith({ showWordHints: true });
        });
      });

      describe('when showWordHints is true', () => {
        beforeEach(() => {
          settings.showWordHints = true;
        });

        it('renders unchecked box for showing word hints', () => {
          const wrapper = build();
          const checkbox = wrapper.find('input#show-word-hints[type="checkbox"]');
          expect(checkbox).toHaveLength(1);
          expect(checkbox.props().checked).toBe(true);
          const label = wrapper.find('label[htmlFor="show-word-hints"]');
          expect(label).toHaveLength(1);
        });

        it('sets showWordHints to false when checkbox is changed', () => {
          const event = { target: { checked: false } };
          build().find('input#show-word-hints').simulate('change', event);
          expect(mergeSettings).toHaveBeenCalledWith({ showWordHints: false });
        });
      });
    });
  });
});
