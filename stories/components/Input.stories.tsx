import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MdEdit as EditIcon } from 'react-icons/md';
import { Grid } from '@mui/material';
import { Formik } from 'formik';

import { Input, SelectOptionsProps } from '../../src';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    name: 'name',
    label: 'Name',
    localControl: true,
    grid: {
      md: 12,
      lg: 12,
    },
    options: [
      {
        value: 1,
        label: 'First',
      },
      {
        value: 2,
        label: 'Second',
      },
      {
        value: 3,
        label: 'Third',
      },
      {
        value: 4,
        label: 'Fourth',
      },
    ],
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({ ...args }) => (
    <Grid container spacing={2}>
      <Input {...args} />
    </Grid>
  ),
};

export const CheckBox: Story = {
  render: ({ ...args }) => (
    <Grid container spacing={2}>
      <Input {...args} model='checkBox' label='Check box label' />
    </Grid>
  ),
};

export const Currency: Story = {
  render: ({ ...args }) => (
    <Grid container spacing={2}>
      <Input {...args} model='currency' />
    </Grid>
  ),
};

export const Icon: Story = {
  render: ({ ...args }) => (
    <Grid container spacing={2}>
      <Input
        {...args}
        model='icon'
        icon={<EditIcon />}
        action={() => console.log('action')}
      />
    </Grid>
  ),
};

export const Mask: Story = {
  render: ({ ...args }) => (
    <Grid container spacing={2}>
      <Input {...args} model='mask' maskModel='document' />
    </Grid>
  ),
};

export const Number: Story = {
  render: ({ ...args }) => (
    <Grid container spacing={2}>
      <Input {...args} model='number' />
    </Grid>
  ),
};

export const Password: Story = {
  render: ({ ...args }) => (
    <Grid container spacing={2}>
      <Input {...args} model='password' />
    </Grid>
  ),
};

export const RadioGroup: Story = {
  render: ({ ...args }) => (
    <Grid container spacing={2}>
      <Input {...args} model='radioGroup' />
    </Grid>
  ),
};

export const RadioGroupInRow: Story = {
  render: ({ ...args }) => (
    <Grid container spacing={2}>
      <Input {...args} model='radioGroup' rowDirection />
    </Grid>
  ),
};

export const Search: Story = {
  render: ({ ...args }) => {
    return (
      <Formik
        initialValues={{ user: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input {...args} localControl model='search' />
            </Grid>
          </form>
        )}
      </Formik>
    );
  },
};

export const SearchRequest: Story = {
  render: ({ ...args }) => {
    const search = async (param?: string, id?: number) => {
      console.log(param, id);
      return new Promise<SelectOptionsProps[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              value: 1,
              label: 'First',
            },
            {
              value: 2,
              label: 'Second',
            },
            {
              value: 3,
              label: 'Third',
            },
            {
              value: 4,
              label: 'Fourth',
            },
          ]);
        }, 5000); // Delay of 2 seconds
      });
    };

    return (
      <Formik
        initialValues={{ user: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input
                {...args}
                model='searchRequest'
                localControl
                creatable
                getList={search}
              />
            </Grid>
          </form>
        )}
      </Formik>
    );
  },
};

export const Select: Story = {
  render: ({ ...args }) => (
    <Grid container spacing={2}>
      <Input {...args} NoNativeOptions model='select' defaultOption='Select' />
    </Grid>
  ),
};

export const SelectNative: Story = {
  render: ({ ...args }) => (
    <Grid container spacing={2}>
      <Input {...args} model='select' defaultOption='Select' />
    </Grid>
  ),
};
