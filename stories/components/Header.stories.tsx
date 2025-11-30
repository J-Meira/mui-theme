import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Header, Button } from '../../src';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    sideBarExpanded: false,
  },
  render: (args) => {
    const [sideBarExpanded, setSideBarExpanded] = React.useState(
      args.sideBarExpanded,
    );
    const handleClose = () => setSideBarExpanded(!sideBarExpanded);

    React.useEffect(() => {
      setSideBarExpanded(args.sideBarExpanded);
    }, [args.sideBarExpanded]);

    return (
      <div className='story-book'>
        <Header
          sideBarControl={handleClose}
          sideBarExpanded={sideBarExpanded}
        />
      </div>
    );
  },
};

export const Full: Story = {
  render: () => (
    <div className='story-book'>
      <Header navigation={<Button color='secondary'>Action</Button>} />
    </div>
  ),
};
