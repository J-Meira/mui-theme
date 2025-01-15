import 'jest-canvas-mock';
import { render } from '@testing-library/react';

import { Button } from '../src';
import React from 'react';

describe('Common render', () => {
  it('renders without crashing', () => {
    console.log(React.version);
    render(<Button />);
  });
});
