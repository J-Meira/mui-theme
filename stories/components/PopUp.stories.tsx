import React from 'react';
import type { Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Button, PopUp } from '../../src';

export default {
  title: 'Components/PopUp',
  component: PopUp,
  tags: ['autodocs'],
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
} satisfies Meta<typeof PopUp>;

export const Basic = ({ ...args }) => {
  const [{ isOpen }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ isOpen: !isOpen });

  return (
    <div className='story-book'>
      <Button onClick={() => updateArgs({ isOpen: !isOpen })}>Open</Button>
      <PopUp
        {...args}
        action={() => handleClose()}
        open={isOpen}
        toggle={handleClose}
      >
        <div style={{ width: '100%' }}>PopUp body message here...</div>
      </PopUp>
    </div>
  );
};
