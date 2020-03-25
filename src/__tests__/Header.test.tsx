import React from 'react';
import {render} from '@testing-library/react';

import Header from '../components/Header';

test('matches snapshot', () => {
  const {container} = render(<Header />);
  expect(container).toMatchSnapshot();
});
