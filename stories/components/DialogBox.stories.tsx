import React from 'react';
import type { Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Button, DialogBox } from '../../src';

export default {
  title: 'Components/DialogBox',
  component: DialogBox,
  tags: ['autodocs'],
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
  },
} satisfies Meta<typeof DialogBox>;

export const Basic = ({ ...args }) => {
  const [{ isOpen }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ isOpen: !isOpen });

  return (
    <div>
      <Button onClick={() => updateArgs({ isOpen: !isOpen })}>Open</Button>
      <DialogBox
        {...args}
        dialog={{
          ...args.dialog,
          open: isOpen,
        }}
        close={handleClose}
      />
    </div>
  );
};
