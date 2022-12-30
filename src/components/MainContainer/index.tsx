import { Card } from '@mui/material';
import * as React from 'react';

interface MainContainerProps {
  children: React.ReactNode,
  subHeader?: React.ReactNode,
  sideBarExpanded?: boolean,
}

const MainContainer = ({ children, subHeader, sideBarExpanded }: MainContainerProps) => (
  <div className={`main ${!sideBarExpanded ? 'main-expanded' : ''}`}>
    {subHeader}
    <Card variant='outlined' className='main-card'>
      {children}
    </Card>
  </div>
);

export default MainContainer;
