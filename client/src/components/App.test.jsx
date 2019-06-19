/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PatientInfo from './PatientInfo';

Enzyme.configure({ adapter: new Adapter() });

describe('Should render App component', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<PatientInfo />);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('when the form is submitted the data is sent to state', () => {
  test('checks for patient data in state', () => {
    const wrapper = shallow(<PatientInfo />);
    let prevented = false;

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {
        prevented = true;
      },
    });
    expect(prevented.toBe(true));
  });
});
