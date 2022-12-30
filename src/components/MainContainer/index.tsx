import * as React from 'react';

interface MainContainerProps {
  children: React.ReactNode,
  sideBarExpanded?: boolean,
}

const MainContainer = ({ children, sideBarExpanded }: MainContainerProps) => (
  <div className={`main ${!sideBarExpanded ? 'main-expanded' : ''}`}>
    {children}
  </div>
);

export default MainContainer;
