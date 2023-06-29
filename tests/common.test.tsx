// eslint-disable-next-line
import React from 'react';
import 'jest-canvas-mock';
import { render } from '@testing-library/react';

import { Button } from '../src';

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<Button />);
  });
});
