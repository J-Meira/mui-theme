import { ReactNode } from 'react';
import { Grid, GridProps } from '@mui/material';
import { defaultGrid, GridSizeProps } from './defaultGrid';

interface InputGridProps {
  children: ReactNode;
  className?: string;
  grid?: GridSizeProps;
  noGrid?: boolean;
}

export const InputGrid = ({
  children,
  className,
  grid,
  noGrid,
}: InputGridProps) => {
  if (noGrid) return children;

  const size = { ...defaultGrid, ...grid } as GridProps['size'];
  return (
    <Grid className={className} size={size}>
      {children}
    </Grid>
  );
};
