import React from 'react';

import type { Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Header } from '../../src';

export default {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export const Basic = () => {
  const [{ isOpen }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ isOpen: !isOpen });

  return (
    <div className='story-book'>
      <Header sideBarControl={handleClose} sideBarExpanded={isOpen} />
    </div>
  );
};
