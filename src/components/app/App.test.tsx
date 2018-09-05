import { shallow } from 'enzyme';
import * as React from 'react';

import App from './App';

describe('the App', () => {
  const defaultProps = {
    switchTab: jest.fn()
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<App {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
