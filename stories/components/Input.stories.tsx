import React from 'react';
import type { Meta } from '@storybook/react';
import { Edit } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { Formik } from 'formik';

import { Input, SelectOptionsProps } from '../../src';

export default {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    name: 'name',
    label: 'Name',
    isNoFormik: true,
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

export const Basic = ({ ...args }) => (
  <Grid container spacing={2}>
    <Input {...args} />
  </Grid>
);

export const CheckBox = ({ ...args }) => (
  <Grid container spacing={2}>
    <Input {...args} model='checkBox' label='Check box label' />
  </Grid>
);

export const Currency = ({ ...args }) => (
  <Grid container spacing={2}>
    <Input {...args} model='currency' />
  </Grid>
);

export const Icon = ({ ...args }) => (
  <Grid container spacing={2}>
    <Input
      {...args}
      model='icon'
      icon={<Edit />}
      action={() => console.log('action')}
    />
  </Grid>
);

export const Mask = ({ ...args }) => (
  <Grid container spacing={2}>
    <Input {...args} model='mask' maskModel='document' />
  </Grid>
);

export const Number = ({ ...args }) => (
  <Grid container spacing={2}>
    <Input {...args} model='number' />
  </Grid>
);

export const Password = ({ ...args }) => (
  <Grid container spacing={2}>
    <Input {...args} model='password' />
  </Grid>
);

export const RadioGroup = ({ ...args }) => (
  <Grid container spacing={2}>
    <Input {...args} model='radioGroup' />
  </Grid>
);
export const RadioGroupInRow = ({ ...args }) => (
  <Grid container spacing={2}>
    <Input {...args} model='radioGroup' rowDirection />
  </Grid>
);

export const Search = ({ ...args }) => {
  return (
    <Formik
      initialValues={{ user: '' }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input {...args} isNoFormik model='search' />
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export const SearchRequest = ({ ...args }) => {
  const search = async (param?: string, id?: number) => {
    console.log(param, id);
    return new Promise<SelectOptionsProps[]>((resolve) => {
      setTimeout(() => {
        const list = args.options;
        resolve(list);
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
              isNoFormik
              creatable
              getList={search}
            />
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export const Select = ({ ...args }) => (
  <Grid container spacing={2}>
    <Input {...args} model='select' defaultOption='Select' />
  </Grid>
);
