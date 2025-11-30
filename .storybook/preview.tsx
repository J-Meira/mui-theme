import React from 'react';

import { themes } from 'storybook/theming';
import type { Preview } from '@storybook/react-vite';

import { MultiProvider } from '../src';

import './styles.scss';

export const withTheme = (Story) => { 
  return (
    <MultiProvider
      adapterLocalePtBR
      snackAnchorHorizontal='right'
      snackAnchorVertical='top'
      snackAutoHideDuration={5000}
      snackMax={3}
      palette={{
        primary: {
          light: '#ff5f4e',
          main: '#ed1c24',
          dark: '#b20000',
          contrastText: '#fff',
        },
        secondary: {
          light: '#cdd0d9',
          main: '#9c9fa8',
          dark: '#6e7179',
          contrastText: '#000',
        },
      }}
    >
      <Story />
    </MultiProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
  decorators: [withTheme],
};

export default preview;
