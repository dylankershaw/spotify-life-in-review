import React from 'react';
import {render} from '@testing-library/react';

import FileUploader from '../components/FileUploader';
import {Song} from '../Types';

test('matches snapshot', () => {
  const {container} = render(<FileUploader setSongData={(s: Array<Song>) => {}} />);
  expect(container).toMatchSnapshot();
});
