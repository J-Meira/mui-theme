import type { Meta } from '@storybook/react';

import { TreeListItem } from '../../src';
import { List } from '@mui/material';

export default {
  title: 'Components/TreeListItem',
  component: TreeListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof TreeListItem>;

export const Basic = () => {
  return (
    <div className='story-book-body'>
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
    </div>
  );
};

export const WithChildren = () => {
  return (
    <div className='story-book'>
      <List className='tree-list'>
        <TreeListItem
          label='Users'
          hierarchy='primary'
          selected={true}
          onSelect={() => console.log('action')}
        >
          <TreeListItem
            label='Add'
            hierarchy='secondary'
            selected={true}
            onSelect={() => console.log('action')}
          />
          <TreeListItem
            label='Edit'
            hierarchy='secondary'
            selected={false}
            onSelect={() => console.log('action')}
          />
          <TreeListItem
            label='Delete'
            hierarchy='secondary'
            selected={false}
            onSelect={() => console.log('action')}
          />
        </TreeListItem>
      </List>
    </div>
  );
};

export const Tree = () => {
  return (
    <div className='story-book'>
      <List className='tree-list'>
        <TreeListItem
          label='Registrations'
          hierarchy='primary'
          selected={true}
          onSelect={() => console.log('action')}
        >
          <TreeListItem
            label='Users'
            hierarchy='secondary'
            collapseHorizontal
            selected={true}
            onSelect={() => console.log('action')}
          >
            <TreeListItem
              label='Add'
              hierarchy='tertiary'
              selected={true}
              onSelect={() => console.log('action')}
            />
            <TreeListItem
              label='Edit'
              hierarchy='tertiary'
              selected={false}
              onSelect={() => console.log('action')}
            />
            <TreeListItem
              label='Delete'
              hierarchy='tertiary'
              selected={false}
              onSelect={() => console.log('action')}
            />
          </TreeListItem>
        </TreeListItem>
      </List>
    </div>
  );
};
