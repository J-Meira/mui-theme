import type { Meta } from '@storybook/react';
import { Card, Grid, Typography } from '@mui/material';

import { DarkSwitch } from '../../src';

export default {
  title: 'Components/InputDarkSwitch',
  component: DarkSwitch,
  tags: ['autodocs'],
} satisfies Meta<typeof DarkSwitch>;

export const Basic = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <DarkSwitch />
    </Grid>
    <Grid item xs={12}>
      <Card>
        <Typography component='p' variant='caption' sx={{ padding: '2rem' }}>
          In the midst of a bustling city, where skyscrapers touched the sky and
          neon lights illuminated the night, a peculiar event unfolded. People
          rushed through the streets, their footsteps blending with the symphony
          of car horns and laughter. Hidden within the chaos, a solitary figure
          named Maxwell navigated the urban maze.
        </Typography>
      </Card>
    </Grid>
  </Grid>
);
