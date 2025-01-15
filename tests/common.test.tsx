import 'jest-canvas-mock';

import React from 'react';

import { render } from '@testing-library/react';

import { Button } from '../src';

describe('Common render', () => {
  it('renders without crashing', () => {
    console.log(React.version);
    render(<Button />);
  });
});
