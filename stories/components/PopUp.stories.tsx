import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Button, PopUp } from '../../src';
import { Grid } from '@mui/material';

const meta = {
  title: 'Components/PopUp',
  component: PopUp,
  tags: ['autodocs'],
} satisfies Meta<typeof PopUp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    open: false,
    cancel: true,
    cancelLabel: 'Cancel',
    disableBackdropClick: false,
    grided: true,
    name: 'PopUpExample',
    successLabel: 'Ok',
    title: 'Title here',
    toggle: () => null,
    maxWidth: 'md',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
      setOpen(!open);
    };

    useEffect(() => {
      setOpen(args.open);

      // eslint-disable-next-line
    }, [args.open]);

    return (
      <div className='story-book'>
        <Button onClick={toggle}>Open</Button>
        <PopUp {...args} action={toggle} open={open} toggle={toggle}>
          <Grid size={12}>PopUp body message here...</Grid>
        </PopUp>
      </div>
    );
  },
};
