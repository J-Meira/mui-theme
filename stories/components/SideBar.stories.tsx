import React from 'react';

import type { Meta } from '@storybook/react';
import { useArgs, useState } from '@storybook/client-api';
import { Home as HomeIcon, List as ListIcon } from '@mui/icons-material';

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
        logo='https://assets.jm.app.br/assets/logo.svg'
        icon='https://assets.jm.app.br/assets/icon.svg'
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
          action={() => console.log('go home')}
        />
        <SideBarItem
          label='Lists'
          icon={<ListIcon />}
          selected={false}
          expanded={expanded}
          action={() => console.log('go home')}
        />
      </SideBar>
      <MainContainer sideBarExpanded={open}>
        <Button onClick={sideBarControl}>{open ? 'Compact' : 'expand'}</Button>
      </MainContainer>
    </div>
  );
};
