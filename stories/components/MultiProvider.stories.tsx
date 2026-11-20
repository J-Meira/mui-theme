import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs, Grid, Paper, Typography } from '@mui/material';

import { Button, DarkSwitch, MainContainer, MultiProvider } from '../../src';

const meta = {
  title: 'Components/MultiProvider',
  component: MultiProvider,
  tags: ['autodocs'],
  argTypes: {
    locale: {
      control: 'select',
      options: ['en', 'pt-BR'],
    },
    mode: {
      control: 'select',
      options: [undefined, 'dark', 'light', 'system'],
    },
    palette: {
      primary: {
        light: { control: 'color' },
        main: { control: 'color' },
        dark: { control: 'color' },
        contrastText: { control: 'color' },
      },
      secondary: {
        light: { control: 'color' },
        main: { control: 'color' },
        dark: { control: 'color' },
        contrastText: { control: 'color' },
      },
    },
  },
} satisfies Meta<typeof MultiProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    locale: 'pt-BR',
    snackAnchorHorizontal: 'right',
    snackAnchorVertical: 'top',
    snackAutoHideDuration: 5000,
    snackMax: 3,
    palette: {
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
    },
    children: (
      <Grid container>
        <Grid size={12}>
          <Button>Basic</Button>
        </Grid>
      </Grid>
    ),
  },
};

const ModeDemo = () => (
  <Paper sx={{ padding: '1rem' }}>
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography>
          The switch below is hidden while the mode prop is set.
        </Typography>
      </Grid>
      <Grid size={12}>
        <DarkSwitch />
      </Grid>
      <Grid size={12}>
        <Button>Basic</Button>
      </Grid>
    </Grid>
  </Paper>
);

export const ForcedDark: Story = {
  args: {
    ...Basic.args,
    mode: 'dark',
    children: <ModeDemo />,
  },
};

export const ForcedLight: Story = {
  args: {
    ...Basic.args,
    mode: 'light',
    children: <ModeDemo />,
  },
};

export const FollowSystem: Story = {
  args: {
    ...Basic.args,
    mode: 'system',
    children: <ModeDemo />,
  },
};

const ThemingDemo = () => (
  <Paper sx={{ padding: '1rem' }}>
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography>Primary text on the paper surface.</Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Secondary text.
        </Typography>
      </Grid>
      <Grid size={12}>
        <MainContainer>Page background comes from the palette.</MainContainer>
      </Grid>
      <Grid size={12}>
        <Breadcrumbs maxItems={2} aria-label='breadcrumb'>
          <Typography>One</Typography>
          <Typography>Two</Typography>
          <Typography>Three</Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  </Paper>
);

export const CustomBackground: Story = {
  args: {
    ...Basic.args,
    mode: 'light',
    palette: {
      ...Basic.args.palette,
      background: { default: '#fff8e1', paper: '#ffecb3' },
    },
    children: <ThemingDemo />,
  },
};

export const FullDarkPalette: Story = {
  args: {
    ...Basic.args,
    mode: 'dark',
    paletteDark: {
      background: { default: '#0b1020', paper: '#141a33' },
      text: { primary: '#e6e9ff', secondary: '#9aa3d6' },
      divider: '#2a3360',
    },
    children: <ThemingDemo />,
  },
};

export const English: Story = {
  args: {
    ...Basic.args,
    locale: 'en',
    children: <ThemingDemo />,
  },
};
