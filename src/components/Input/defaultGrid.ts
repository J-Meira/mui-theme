import { Breakpoint } from '@mui/material';
import type { GridSize } from '@mui/material/Grid';

export type GridSizeProps = {
  [key in Breakpoint]?: GridSize;
};

export const defaultGrid: GridSizeProps = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 8,
};
