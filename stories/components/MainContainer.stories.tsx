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
} satisfies Meta<typeof MainContainer>;

export const Basic = () => {
  const [{ isOpen }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ isOpen: !isOpen });

  return (
    <div className='story-book'>
      <MainContainer sideBarExpanded={isOpen}>
        <Button onClick={handleClose}>Collapse</Button>
      </MainContainer>
    </div>
  );
};

export const SubHeader = () => {
  const [{ isOpen }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ isOpen: !isOpen });

  return (
    <div className='story-book'>
      <MainContainer
        sideBarExpanded={isOpen}
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
  const [{ isOpen }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ isOpen: !isOpen });

  return (
    <div className='story-book'>
      <MainContainer
        sideBarExpanded={isOpen}
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
  const [{ isOpen }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ isOpen: !isOpen });

  return (
    <div className='story-book'>
      <MainContainer
        sideBarExpanded={isOpen}
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
