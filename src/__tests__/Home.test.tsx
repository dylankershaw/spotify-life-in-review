import React from 'react';
import {render, fireEvent, RenderResult} from '@testing-library/react';

import Home from '../pages/index';
import songData from './__mocks__/songData.json';

function uploadFile(container: RenderResult) {
  const uploadButton = container.getByLabelText('UPLOAD');
  const file = new File([JSON.stringify(songData)], 'EndSong.json', {type: 'application/json'});

  if (!uploadButton) throw Error('uploadButton not found');

  Object.defineProperty(uploadButton, 'files', {value: [file]});
  fireEvent.change(uploadButton);
}

test('can upload a JSON file', async () => {
  const container = render(<Home />);
  uploadFile(container);

  const artistDropdownContainer = await container.findByText('Select an artist:');
  expect(artistDropdownContainer).toBeInTheDocument();
});

test('can change the artist', async () => {
  const container = render(<Home />);
  uploadFile(container);

  const [
    {master_metadata_album_artist_name: artist1},
    {master_metadata_album_artist_name: artist2}
  ] = songData;

  await container.findByText('Select an artist:');
  const artistDropdown = container.getByDisplayValue(artist1);

  fireEvent.change(artistDropdown, {target: {value: artist2}});
  expect(container.getByDisplayValue(artist2)).toBeInTheDocument();
});

test('can toggle the full plays only checkbox', async () => {
  const container = render(<Home />);
  uploadFile(container);

  await container.findByText('Select an artist:');

  const playedInFullToggle = container.getByLabelText('Only include songs played in full');
  fireEvent.click(playedInFullToggle);
  expect(playedInFullToggle).toBeChecked();
});
