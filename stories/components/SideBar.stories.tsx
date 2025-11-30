import React, { useEffect, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { env } from '../env';

import { MdHome as HomeIcon } from 'react-icons/md';

import { Button, MainContainer, SideBar, SideBarItem } from '../../src';

const meta = {
  title: 'Components/SideBar',
  component: SideBar,
  tags: ['autodocs'],
} satisfies Meta<typeof SideBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    expanded: true,
    logo: 'https://assets.jm.app.br/logo.svg',
    icon: 'https://assets.jm.app.br/icon.svg',
    version: env('STORYBOOK_VERSION') || 'v1.0.0',
    versionDate: env('STORYBOOK_V_DATE') || '2023-06-01T00:00:00',
    sideBarControl: () => null,
    homeNavigate: () => console.log('/'),
  },
  render: ({ ...args }) => {
    const [expanded, setExpanded] = useState(true);
    const [open, setOpen] = useState(true);

    const sideBarControl = () => {
      setOpen(!open);
      setExpanded(!expanded);
    };

    const sideBarMouseHover = (status: boolean) => {
      if (!open) {
        setExpanded(status);
      }
    };

    useEffect(() => {
      setExpanded(args.expanded);

      // eslint-disable-next-line
    }, [args.expanded]);

    return (
      <div className='story-book-body'>
        <SideBar
          {...args}
          sideBarControl={sideBarControl}
          homeNavigate={() => console.log('/')}
          onMouseHover={sideBarMouseHover}
        >
          <SideBarItem
            label='Home'
            icon={<HomeIcon />}
            selected={true}
            expanded={expanded}
            sideBarControl={sideBarControl}
            initialState={true}
          >
            <SideBarItem
              label='Main'
              selected={true}
              expanded={expanded}
              sideBarControl={sideBarControl}
            />
            <SideBarItem
              label='Main Context'
              selected={true}
              expanded={expanded}
              sideBarControl={sideBarControl}
            />
          </SideBarItem>
          <SideBarItem
            label='Lists'
            selected={false}
            expanded={expanded}
            sideBarControl={sideBarControl}
          />
        </SideBar>
        <MainContainer sideBarExpanded={open}>
          <Button onClick={sideBarControl}>
            {open ? 'Compact' : 'expand'}
          </Button>
        </MainContainer>
      </div>
    );
  },
};
