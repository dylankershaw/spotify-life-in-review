import React from 'react';
import {render} from '@testing-library/react';

import ArtistDropdown from '../components/ArtistDropdown';

test('matches snapshot', () => {
  const {container} = render(
    <ArtistDropdown
      selectedArtist='The Doors'
      setSelectedArtist={(a: string) => {}}
      artists={['The Who', 'The Doors', 'Lou Reed']}
    />
  );
  expect(container).toMatchSnapshot();
});
