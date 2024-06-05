import React, { useEffect, useState } from 'react';
import { Meta } from '@storybook/react';

import { Header, Button } from '../../src';

export default {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  args: {
    sideBarExpanded: false,
  },
} satisfies Meta<typeof Header>;

export const Basic = ({ ...args }) => {
  const [sideBarExpanded, setSideBarExpanded] = useState(false);
  const handleClose = () => setSideBarExpanded(!sideBarExpanded);

  useEffect(() => {
    setSideBarExpanded(args.sideBarExpanded);

    // eslint-disable-next-line
  }, [args.sideBarExpanded]);

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
