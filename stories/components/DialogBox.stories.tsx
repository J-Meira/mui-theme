import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Button, DialogBox } from '../../src';

const meta = {
  title: 'Components/DialogBox',
  component: DialogBox,
  tags: ['autodocs'],
} satisfies Meta<typeof DialogBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    dialog: {
      open: true,
      cancel: true,
      title: 'Title here',
      message: 'Message body here...',
      origin: 'test',
      successLabel: 'Ok',
      return: {},
    },
    cancelLabel: 'Cancel',
    close: (s) => console.log(s),
  },
  render: (args) => {
    const [dialog, setDialog] = useState({
      open: false,
      cancel: true,
      title: '',
      message: '',
      origin: '',
      successLabel: 'Ok',
      return: {},
    });

    const close = (status: boolean) =>
      setDialog({
        open: false,
        cancel: true,
        title: '',
        message: '',
        origin: '',
        successLabel: 'Ok',
        return: {
          origin: dialog.origin,
          status,
        },
      });

    const open = () =>
      setDialog({
        open: true,
        cancel: true,
        title: 'Title here',
        message: 'Message body here...',
        origin: 'test',
        successLabel: 'Ok',
        return: {},
      });

    return (
      <div>
        <Button onClick={open}>Open</Button>
        <DialogBox
          cancelLabel={args.cancelLabel}
          dialog={dialog}
          close={close}
        />
      </div>
    );
  },
};
