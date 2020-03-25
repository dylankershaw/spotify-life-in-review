import React from 'react';
import {render, fireEvent, waitForElement} from '@testing-library/react';

import Header from '../components/Header';

test('matches snapshot', async () => {
  const {container} = render(<Header />);
  expect(container).toMatchSnapshot();
});
