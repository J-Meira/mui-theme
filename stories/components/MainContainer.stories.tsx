import React from 'react';
import type { Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import {
  BreadcrumbBar,
  BreadcrumbsListProps,
  Button,
  MainContainer,
} from '../../src';

const breadcrumbLlist: BreadcrumbsListProps[] = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Registrations',
    link: '/registrations',
  },
  {
    label: 'Users',
  },
];

const date = new Date();
const footer = `© 2008 - ${date.getFullYear()} JM Creative. All Rights Reserved`;

export default {
  title: 'Components/MainContainer',
  component: MainContainer,
  tags: ['autodocs'],
  args: {
    sideBarExpanded: false,
  },
} satisfies Meta<typeof MainContainer>;

export const Basic = () => {
  const [{ sideBarExpanded }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ sideBarExpanded: !sideBarExpanded });

  return (
    <div className='story-book'>
      <MainContainer sideBarExpanded={sideBarExpanded}>
        <Button onClick={handleClose}>Collapse</Button>
      </MainContainer>
    </div>
  );
};

export const Full = () => {
  return (
    <div className='story-book'>
      <MainContainer>
        <Button>Test</Button>
      </MainContainer>
    </div>
  );
};

export const SubHeader = () => {
  const [{ sideBarExpanded }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ sideBarExpanded: !sideBarExpanded });

  return (
    <div className='story-book'>
      <MainContainer
        sideBarExpanded={sideBarExpanded}
        subHeader={
          <div style={{ padding: '1rem', width: '100%' }}>
            <BreadcrumbBar list={breadcrumbLlist} />
          </div>
        }
      >
        <Button onClick={handleClose}>Collapse</Button>
      </MainContainer>
    </div>
  );
};

export const Footer = () => {
  const [{ sideBarExpanded }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ sideBarExpanded: !sideBarExpanded });

  return (
    <div className='story-book'>
      <MainContainer
        sideBarExpanded={sideBarExpanded}
        footer={
          <div style={{ padding: '1rem', width: '100%', textAlign: 'center' }}>
            <span>{footer}</span>
          </div>
        }
      >
        <Button onClick={handleClose}>Collapse</Button>
      </MainContainer>
    </div>
  );
};

export const SubHeaderFooter = () => {
  const [{ sideBarExpanded }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ sideBarExpanded: !sideBarExpanded });

  return (
    <div className='story-book'>
      <MainContainer
        sideBarExpanded={sideBarExpanded}
        subHeader={
          <div style={{ padding: '1rem', width: '100%' }}>
            <BreadcrumbBar list={breadcrumbLlist} />
          </div>
        }
        footer={
          <div style={{ padding: '1rem', width: '100%', textAlign: 'center' }}>
            <span>{footer}</span>
          </div>
        }
      >
        <Button onClick={handleClose}>Collapse</Button>
      </MainContainer>
    </div>
  );
};
