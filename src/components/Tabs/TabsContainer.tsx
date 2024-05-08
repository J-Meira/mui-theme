import { useState } from 'react';
import {
  Grid,
  Tab,
  Tabs as MuiTabs,
  Box,
  Popover,
  Typography,
} from '@mui/material';
import { MdError as ErrorIcon } from 'react-icons/md';
import { TabPanel, TabPanelProps } from './TabPanel';

export interface TabsProps {
  tabs: Omit<TabPanelProps, 'title' | 'activeValue'>[];
  title: string;
}

export const TabsContainer = ({ title, tabs }: TabsProps) => {
  const [active, setActive] = useState(0);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  const openPopover = Boolean(anchorEl);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    error?: string,
  ) => {
    setError(error || '');
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setError('');
    setAnchorEl(null);
  };

  return (
    <Grid item xs={12}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs
          value={active}
          onChange={(_, newValue) => setActive(newValue)}
          aria-label={'tab-' + title}
        >
          {tabs.map((i) => (
            <Tab
              key={`tab-${title}-${i.value}`}
              id={`tab-${title}-${i.value}`}
              aria-controls={`tabpanel-${title}-${i.value}`}
              label={i.label}
              value={i.value}
              icon={i.error ? <ErrorIcon color='error' /> : undefined}
              iconPosition='end'
              aria-owns={openPopover && i.error ? 'error-popover' : undefined}
              aria-haspopup={i.error ? 'true' : undefined}
              onMouseEnter={
                i.error ? (e) => handlePopoverOpen(e, i.error) : undefined
              }
              onMouseLeave={i.error ? () => handlePopoverClose() : undefined}
            />
          ))}
        </MuiTabs>
        <Popover
          id='error-popover'
          sx={{
            pointerEvents: 'none',
          }}
          open={openPopover}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
          color='error'
        >
          <Typography sx={{ padding: '0.5rem 0.75rem;' }}>{error}</Typography>
        </Popover>
      </Box>
      {tabs.map((i) => (
        <TabPanel
          key={`tabpanel-${title}-${i.value}`}
          {...i}
          activeValue={active}
          title={title}
        />
      ))}
    </Grid>
  );
};
