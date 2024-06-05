import React, { useEffect, useState } from 'react';

import { StoryObj, Meta } from '@storybook/react';

import {
  BreadcrumbBar,
  BreadcrumbsListProps,
  Button,
  MainContainer,
} from '../../src';

const breadcrumbList: BreadcrumbsListProps[] = [
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

const meta = {
  title: 'Components/MainContainer',
  component: MainContainer,
  tags: ['autodocs'],
  args: {
    sideBarExpanded: false,
    children: null,
  },
} satisfies Meta<typeof MainContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [sideBarExpanded, setSideBarExpanded] = useState(true);
    const toggle = () => setSideBarExpanded(!sideBarExpanded);

    useEffect(() => {
      if (args.sideBarExpanded && args.sideBarExpanded !== sideBarExpanded)
        setSideBarExpanded(args.sideBarExpanded);

      // eslint-disable-next-line
    }, [args.sideBarExpanded]);

    return (
      <div className='story-book'>
        <MainContainer sideBarExpanded={sideBarExpanded}>
          <Button onClick={toggle}>Collapse</Button>
        </MainContainer>
      </div>
    );
  },
};

export const Full: Story = {
  render: (args) => {
    return (
      <div className='story-book'>
        <MainContainer {...args}>
          <Button>Test</Button>
        </MainContainer>
      </div>
    );
  },
};

export const SubHeader: Story = {
  render: (args) => {
    const [sideBarExpanded, setSideBarExpanded] = useState(true);
    const toggle = () => setSideBarExpanded(!sideBarExpanded);

    useEffect(() => {
      if (args.sideBarExpanded && args.sideBarExpanded !== sideBarExpanded)
        setSideBarExpanded(args.sideBarExpanded);

      // eslint-disable-next-line
    }, [args.sideBarExpanded]);

    return (
      <div className='story-book'>
        <MainContainer
          sideBarExpanded={sideBarExpanded}
          subHeader={
            <div style={{ padding: '1rem', width: '100%' }}>
              <BreadcrumbBar list={breadcrumbList} />
            </div>
          }
        >
          <Button onClick={toggle}>Collapse</Button>
        </MainContainer>
      </div>
    );
  },
};

export const Footer: Story = {
  render: (args) => {
    const [sideBarExpanded, setSideBarExpanded] = useState(true);
    const toggle = () => setSideBarExpanded(!sideBarExpanded);

    useEffect(() => {
      if (args.sideBarExpanded && args.sideBarExpanded !== sideBarExpanded)
        setSideBarExpanded(args.sideBarExpanded);

      // eslint-disable-next-line
    }, [args.sideBarExpanded]);

    return (
      <div className='story-book'>
        <MainContainer
          sideBarExpanded={sideBarExpanded}
          footer={
            <div
              style={{ padding: '1rem', width: '100%', textAlign: 'center' }}
            >
              <span>{footer}</span>
            </div>
          }
        >
          <Button onClick={toggle}>Collapse</Button>
        </MainContainer>
      </div>
    );
  },
};

export const SubHeaderFooter: Story = {
  render: (args) => {
    const [sideBarExpanded, setSideBarExpanded] = useState(true);
    const toggle = () => setSideBarExpanded(!sideBarExpanded);

    useEffect(() => {
      if (args.sideBarExpanded && args.sideBarExpanded !== sideBarExpanded)
        setSideBarExpanded(args.sideBarExpanded);

      // eslint-disable-next-line
    }, [args.sideBarExpanded]);

    return (
      <div className='story-book'>
        <MainContainer
          sideBarExpanded={sideBarExpanded}
          subHeader={
            <div style={{ padding: '1rem', width: '100%' }}>
              <BreadcrumbBar list={breadcrumbList} />
            </div>
          }
          footer={
            <div
              style={{ padding: '1rem', width: '100%', textAlign: 'center' }}
            >
              <span>{footer}</span>
            </div>
          }
        >
          <Button onClick={toggle}>Collapse</Button>
        </MainContainer>
      </div>
    );
  },
};
