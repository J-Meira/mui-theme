import React from 'react';
import { Grid } from '@mui/material';
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
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Button color='success' onClick={() => setCookie()}>
          Set Cookie
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button color='error' onClick={() => removeCookie()}>
          Remove Cookie
        </Button>
      </Grid>
    </Grid>
  );
};
