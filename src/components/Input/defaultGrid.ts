import { Breakpoint, GridSize } from '@mui/material';

export type ResponsiveStyleValue<T> =
  | T
  | Array<T | null>
  | {
      [key in Breakpoint]?: T | null;
    };

export type GridSizeProps = ResponsiveStyleValue<GridSize>;

export const defaultGrid: GridSizeProps = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 8,
};
