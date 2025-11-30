import { Breakpoint, GridSize } from '@mui/material';

export type GridSizeProps = {
  [key in Breakpoint]?: GridSize | null;
};

export const defaultGrid: GridSizeProps = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 8,
};
