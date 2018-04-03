import React from 'react';
import LoginForm from '../components/LoginForm';
import { shallow } from 'enzyme';
import { Input } from 'native-base';

it('renders without crashing', () => {
  const wrapper = shallow(<LoginForm />);
  expect(Input).toHaveLength(2);
});
