import { Card, Paper } from '@mui/material';
import { useMultiContext } from '../MultiProvider/useMultiContext';

export interface MainContainerProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  sideBarExpanded?: boolean;
  subHeader?: React.ReactNode;
}

export const MainContainer = ({
  children,
  footer,
  sideBarExpanded,
  subHeader,
}: MainContainerProps) => {
  const { backgroundColor } = useMultiContext();
  return (
    <Paper
      elevation={0}
      sx={{ backgroundColor: backgroundColor }}
      square
      className={`main ${
        sideBarExpanded === undefined
          ? 'main-full'
          : !sideBarExpanded
            ? 'main-expanded'
            : ''
      }`}
    >
      {subHeader}
      <Card variant='outlined' className='main-card'>
        {children}
      </Card>
      {footer}
    </Paper>
  );
};
