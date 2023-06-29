import React from 'react';
import type { Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Header, Button } from '../../src';

export default {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  args: {
    sideBarExpanded: false,
  },
} satisfies Meta<typeof Header>;

export const Basic = () => {
  const [{ sideBarExpanded }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ sideBarExpanded: !sideBarExpanded });

  return (
    <div className='story-book'>
      <Header sideBarControl={handleClose} sideBarExpanded={sideBarExpanded} />
    </div>
  );
};

export const Full = () => {
  return (
    <div className='story-book'>
      <Header navigation={<Button color='secondary'>Action</Button>} />
    </div>
  );
};
