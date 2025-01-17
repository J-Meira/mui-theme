import React from 'react';
import { Grid2 } from '@mui/material';
import { Button, useCookies } from '../../src';

export default {
  title: 'Hooks/useCookies',
  tags: ['autodocs'],
};

export const Basic = () => {
  const setCookie = () => {
    useCookies.set('test', 'true');
  };

  const removeCookie = () => {
    useCookies.remove('test');
  };

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={6}>
        <Button color='success' onClick={() => setCookie()}>
          Set Cookie
        </Button>
      </Grid2>
      <Grid2 size={6}>
        <Button color='error' onClick={() => removeCookie()}>
          Remove Cookie
        </Button>
      </Grid2>
    </Grid2>
  );
};
