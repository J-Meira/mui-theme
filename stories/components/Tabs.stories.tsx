import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { TabsContainer, TreeListItem } from '../../src';
import { Grid, List, Typography } from '@mui/material';

const meta = {
  title: 'Components/Tabs',
  component: TabsContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof TabsContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'string',
    tabs: [
      {
        children: (
          <Grid size={12} sx={{ padding: '3rem', textAlign: 'justify' }}>
            <Typography component='p' variant='caption' color='lightgray'>
              In the midst of a bustling city, where skyscrapers touched the sky
              and neon lights illuminated the night, a peculiar event unfolded.
              People rushed through the streets, their footsteps blending with
              the symphony of car horns and laughter. Hidden within the chaos, a
              solitary figure named Maxwell navigated the urban maze.
            </Typography>
            <Typography component='p' variant='caption' color='gray'>
              Maxwell, a curious soul with a passion for adventure, had embarked
              on a spontaneous journey that morning. With a backpack slung over
              his shoulder, he set out to explore the uncharted corners of his
              own city. Every turn revealed a new surprise—a hidden café tucked
              away in an alley, a street artist creating vibrant masterpieces,
              or a park brimming with colorful flowers.
            </Typography>
            <Typography component='p' variant='caption' color='lightgray'>
              As he strolled along, Maxwells mind began to wander. He imagined
              the lives of the strangers he passed—a young woman engrossed in a
              novel, a street performer captivating the crowd, and a group of
              friends engaged in animated conversation. Each person had a story,
              he mused, their experiences shaping their unique paths.
            </Typography>
          </Grid>
        ),
        label: 'Text Example',
        value: 0,
      },
      {
        children: (
          <Grid size={12} sx={{ padding: '3rem', textAlign: 'justify' }}>
            <List className='tree-list'>
              <TreeListItem
                label='Add'
                hierarchy='primary'
                selected={true}
                onSelect={() => console.log('action')}
              />
              <TreeListItem
                label='Edit'
                hierarchy='primary'
                selected={false}
                onSelect={() => console.log('action')}
              />
              <TreeListItem
                label='Delete'
                hierarchy='primary'
                selected={false}
                onSelect={() => console.log('action')}
              />
            </List>
          </Grid>
        ),
        error: 'string',
        label: 'Lists',
        value: 1,
      },
    ],
  },
};
