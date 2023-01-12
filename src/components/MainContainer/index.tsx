import { Card } from '@mui/material';

interface MainContainerProps {
  children: React.ReactNode,
  subHeader?: React.ReactNode,
  sideBarExpanded?: boolean,
}

export const MainContainer = ({
  children,
  subHeader,
  sideBarExpanded,
}: MainContainerProps) => (
  <div className={`main ${!sideBarExpanded ? 'main-expanded' : ''}`}>
    {subHeader}
    <Card variant='outlined' className='main-card'>
      {children}
    </Card>
  </div>
);
