import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonProps, Grid, Slider, Typography } from '@mui/material';
import { Button, MultiProvider, useToast } from '../../src';

const meta = {
  title: 'Hooks/useToast',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const msgTypes: ButtonProps['color'][] = [
  'inherit',
  'error',
  'info',
  'success',
  'warning',
];

export const Basic: Story = {
  args: {},
  render: () => {
    const [snackMax, setSnackMax] = React.useState(5);
    const [snackAutoHideDuration, setSnackAutoHideDuration] =
      React.useState(5000);

    const handleSnackMax = (newValue: number | number[]) => {
      setSnackMax(Array.isArray(newValue) ? newValue[0] : newValue);
    };

    const handleDuration = (newValue: number | number[]) => {
      setSnackAutoHideDuration(
        Array.isArray(newValue) ? newValue[0] : newValue,
      );
    };

    const onCloseTest = () => {
      alert('Test');
    };

    const openToast = (
      msg: string,
      type: ButtonProps['color'],
      onClose?: () => void,
    ) => {
      switch (type) {
        case 'error':
          return useToast.error(msg, { onClose: onClose });
        case 'info':
          return useToast.info(msg, { onClose: onClose });
        case 'success':
          return useToast.success(msg, { onClose: onClose });
        case 'warning':
          return useToast.warning(msg, { onClose: onClose });
        default:
          return useToast.basic(msg, { onClose: onClose });
      }
    };

    return (
      <MultiProvider
        adapterLocalePtBR
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
        snackAutoHideDuration={snackAutoHideDuration}
        snackMax={snackMax}
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
        <Grid container spacing={3}>
          <Grid size={6}>
            <Typography color='primary' gutterBottom>
              Snack Max: {snackMax}
            </Typography>
            <Slider
              aria-label='snackMax'
              value={snackMax}
              min={1}
              max={10}
              step={1}
              valueLabelDisplay='auto'
              onChange={(e, newValue) => handleSnackMax(newValue)}
            />
          </Grid>
          <Grid size={6}>
            <Typography color='primary' gutterBottom>
              Auto Hide Duration: {snackAutoHideDuration}
            </Typography>
            <Slider
              aria-label='snackAutoHideDuration'
              value={snackAutoHideDuration}
              min={1000}
              max={10000}
              step={100}
              valueLabelDisplay='auto'
              onChange={(e, newValue) => handleDuration(newValue)}
            />
          </Grid>
          {msgTypes.map((m) => (
            <Grid key={m} size={12}>
              <Button
                color={m}
                onClick={() =>
                  openToast(`${m === 'inherit' ? 'Default' : m} Alert!`, m)
                }
              >
                {`Open ${m === 'inherit' ? 'Default' : m}`}
              </Button>
            </Grid>
          ))}
          <Grid size={12}>
            <Button
              color='inherit'
              onClick={() =>
                openToast(`Alert with close function!`, 'inherit', onCloseTest)
              }
            >
              {`Open Default with Close function`}
            </Button>
          </Grid>
        </Grid>
      </MultiProvider>
    );
  },
};
