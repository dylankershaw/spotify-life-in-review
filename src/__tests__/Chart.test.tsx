import React from 'react';
import {render} from '@testing-library/react';

import Chart from '../components/Chart';
import songData from './__mocks__/songData.json';

test('matches snapshot', () => {
  const {container} = render(<Chart selectedArtist='The Doors' songData={songData} />);
  expect(container).toMatchSnapshot();
});
