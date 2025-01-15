import { useState } from 'react';
import {
  Card,
  CardContent,
  Grid2,
  Grid2Props,
  Typography,
} from '@mui/material';
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
} & Grid2Props;

export const GroupCard = ({
  children,
  className,
  collapsed = false,
  error,
  noGridSizes = false,
  openStart = false,
  title,
  size = {
    md: 12,
    sm: 12,
    xs: 12,
  },
}: GroupCardProps) => {
  const [open, setOpen] = useState(openStart);
  return (
    <Grid2
      size={noGridSizes ? undefined : size}
      className={`group-card ${error ? 'group-card-error' : ''} ${className ? className : ''}`}
    >
      <Card variant='outlined'>
        <CardContent
          onClick={collapsed && !open ? () => setOpen(!open) : undefined}
          sx={collapsed && !open ? { cursor: 'pointer' } : undefined}
        >
          <Grid2 container spacing={2}>
            {title && (
              <Grid2
                size={12}
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
              </Grid2>
            )}
            {collapsed ? (open ? children : null) : children}
            {error && (
              <Typography variant='caption' color='error'>
                {error}
              </Typography>
            )}
          </Grid2>
        </CardContent>
      </Card>
    </Grid2>
  );
};
