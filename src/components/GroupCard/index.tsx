import { useState } from 'react';
import { Card, CardContent, Grid, GridProps, Typography } from '@mui/material';
import {
  MdExpandMore as ExpandMoreIcon,
  MdExpandLess as ExpandLessIcon,
} from 'react-icons/md';

export type GroupCardProps = {
  className?: string;
  collapsed?: boolean;
  noGridSizes?: boolean;
  openStart?: boolean;
  title?: React.ReactNode;
} & GridProps;

export const GroupCard = ({
  children,
  className,
  collapsed = false,
  noGridSizes = false,
  openStart = false,
  title,
  md = 12,
  sm = 12,
  xs = 12,
}: GroupCardProps) => {
  const [open, setOpen] = useState(openStart);
  return (
    <Grid
      item
      xs={noGridSizes ? undefined : xs}
      sm={noGridSizes ? undefined : sm}
      md={noGridSizes ? undefined : md}
      className={`group-card ${className ? className : ''}`}
    >
      <Card variant='outlined'>
        <CardContent
          onClick={collapsed && !open ? () => setOpen(!open) : undefined}
          sx={collapsed && !open ? { cursor: 'pointer' } : undefined}
        >
          <Grid container spacing={2}>
            {title && (
              <Grid
                item
                xs={12}
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
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
