import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from '@mui/material';
import { Button, useCookies } from '../../src';

const setCookie = () => {
  useCookies.set('test', 'true');
};

const removeCookie = () => {
  useCookies.remove('test');
};

const meta = {
  title: 'Hooks/useCookies',
  tags: ['autodocs'],
} satisfies Meta<{}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
  render: () => {
    return (
      <Grid container spacing={3}>
        <Grid size={6}>
          <Button color='success' onClick={() => setCookie()}>
            Set Cookie
          </Button>
        </Grid>
        <Grid size={6}>
          <Button color='error' onClick={() => removeCookie()}>
            Remove Cookie
          </Button>
        </Grid>
      </Grid>
    );
  },
};
