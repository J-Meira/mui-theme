import { useState } from 'react';
import { Card, CardContent, Grid, GridProps, Typography } from '@mui/material';
import {
  MdExpandMore as ExpandMoreIcon,
  MdExpandLess as ExpandLessIcon,
} from 'react-icons/md';

export type GroupCardProps = {
  className?: string;
  collapsed?: boolean;
  error?: string;
  noGridSizes?: boolean;
  openStart?: boolean;
  title?: React.ReactNode;
} & GridProps;

export const GroupCard = ({
  children,
  className,
  collapsed = false,
  error,
  noGridSizes = false,
  openStart = false,
  title,
  ...rest
}: GroupCardProps) => {
  const [open, setOpen] = useState(openStart);

  const gridSize = noGridSizes
    ? undefined
    : rest.size || { xs: 12, sm: 12, md: 12 };

  return (
    <Grid
      size={gridSize}
      className={`group-card ${error ? 'group-card-error' : ''} ${className ? className : ''}`}
      {...rest}
    >
      <Card variant='outlined'>
        <CardContent
          onClick={collapsed && !open ? () => setOpen(!open) : undefined}
          sx={collapsed && !open ? { cursor: 'pointer' } : undefined}
        >
          <Grid container spacing={2}>
            {title && (
              <Grid
                size={{ xs: 12 }}
                className={`title${collapsed ? ' title-collapsed' : ''}`}
                onClick={collapsed ? () => setOpen(!open) : undefined}
              >
                <Typography variant='h3'>
                  {title}
                  {collapsed ? (
                    open ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )
                  ) : null}
                </Typography>
              </Grid>
            )}
            {collapsed ? (open ? children : null) : children}
            {error && (
              <Typography variant='caption' color='error'>
                {error}
              </Typography>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
