import React from 'react';
import type { Meta } from '@storybook/react';
import { useArgs, useState } from '@storybook/client-api';
import { MdHome as HomeIcon, MdList as ListIcon } from 'react-icons/md';

import { Button, MainContainer, SideBar, SideBarItem } from '../../src';
import { env } from '../env';

export default {
  title: 'Components/SideBar',
  component: SideBar,
  tags: ['autodocs'],
  args: {
    expanded: true,
  },
} satisfies Meta<typeof SideBar>;

export const Basic = () => {
  const [{ expanded }, updateArgs] = useArgs();
  const [open, setOpen] = useState(true);

  const sideBarControl = () => {
    updateArgs({
      expanded: !expanded,
    });
    setOpen(!open);
  };

  const sideBarMouseHover = (status: boolean) => {
    if (!open) {
      updateArgs({
        expanded: status,
      });
    }
  };

  return (
    <div className='story-book-body'>
      <SideBar
        expanded={expanded}
        logo='https://assets.jm.app.br/logo.svg'
        icon='https://assets.jm.app.br/icon.svg'
        version={env('STORYBOOK_VERSION') || 'v1.0.0'}
        versionDate={env('STORYBOOK_V_DATE') || '2023-06-01T00:00:00'}
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
            action={() => console.log('go home')}
            sideBarControl={sideBarControl}
          />
          <SideBarItem
            label='Main Context'
            selected={true}
            expanded={expanded}
            action={() => console.log('go home')}
            sideBarControl={sideBarControl}
          />
        </SideBarItem>
        <SideBarItem
          label='Lists'
          selected={false}
          expanded={expanded}
          action={() => console.log('go home')}
          sideBarControl={sideBarControl}
        />
      </SideBar>
      <MainContainer sideBarExpanded={open}>
        <Button onClick={sideBarControl}>{open ? 'Compact' : 'expand'}</Button>
      </MainContainer>
    </div>
  );
};
