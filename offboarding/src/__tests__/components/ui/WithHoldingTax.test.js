import React from 'react';
import { render, screen } from '@testing-library/react';
import { Form, Formik } from 'formik';

import WithHoldingTax from '../../../components/ui/WithHoldingTax';
import { GlobalStateProvider } from '../../../context/GlobalStateContext';
import ConfigurationManager from '../../../services/configurationManager';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    TACA_TACA: {
      API_DOMAIN: '',
    },
  },
}));

jest.mock('../../../services/endpoints/useTaxCategories', () => () => ({
  data: {
    data: [
      { id: 1, name: 'Inscripto Local' },
      { id: 2, name: 'Inscripto CM (convenio multilateral)' },
      { id: 3, name: 'No Inscripto' },
      { id: 4, name: 'Especial (Régimen Simplificado)' },
      { id: 5, name: 'Exento' },
    ],
  },
}));

describe('WithHoldingTax', () => {
  it('renders all fields but exclusion by default', () => {
    render(
      <GlobalStateProvider
        initialState={{ configurationManager: new ConfigurationManager() }}
      >
        <Formik
          initialValues={{
            withHoldingTax: { category: '' },
          }}
          onSubmit={() => {}}
        >
          <Form>
            <WithHoldingTax data={{}} />
          </Form>
        </Formik>
      </GlobalStateProvider>,
    );

    expect(screen.getByTestId('withHoldingTax.category')).toBeInTheDocument();
    expect(screen.getByTestId('withHoldingTax.number')).toBeInTheDocument();
    expect(screen.getByTestId('withHoldingTax.excluded')).toBeInTheDocument();
    expect(screen.getByTestId('withHoldingTaxFile')).toBeInTheDocument();
    expect(
      screen.queryByTestId('withHoldingTax.excluded_from'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('withHoldingTax.excluded_to'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('withHoldingTaxExclusionFile'),
    ).not.toBeInTheDocument();
  });

  it('only renders category field if category selected is not inscribed', () => {
    const categoryId = 3;
    render(
      <GlobalStateProvider
        initialState={{ configurationManager: new ConfigurationManager() }}
      >
        <Formik
          initialValues={{
            withHoldingTax: { category: categoryId },
          }}
          onSubmit={() => {}}
        >
          <Form>
            <WithHoldingTax data={{ category: categoryId }} />
          </Form>
        </Formik>
      </GlobalStateProvider>,
    );

    expect(screen.getByTestId('withHoldingTax.category')).toBeInTheDocument();
    expect(
      screen.queryByTestId('withHoldingTax.number'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('withHoldingTax.excluded'),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('withHoldingTaxFile')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('withHoldingTax.excluded_from'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('withHoldingTax.excluded_to'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('withHoldingTaxExclusionFile'),
    ).not.toBeInTheDocument();
  });

  it('only renders category, number and inscription file fields if category selected is exempt', () => {
    const categoryId = 5;

    render(
      <GlobalStateProvider
        initialState={{ configurationManager: new ConfigurationManager() }}
      >
        <Formik
          initialValues={{
            withHoldingTax: { category: categoryId },
          }}
          onSubmit={() => {}}
        >
          <Form>
            <WithHoldingTax data={{ category: categoryId }} />
          </Form>
        </Formik>
      </GlobalStateProvider>,
    );

    expect(screen.getByTestId('withHoldingTax.category')).toBeInTheDocument();
    expect(screen.getByTestId('withHoldingTax.number')).toBeInTheDocument();
    expect(
      screen.queryByTestId('withHoldingTax.excluded'),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('withHoldingTaxFile')).toBeInTheDocument();
    expect(
      screen.queryByTestId('withHoldingTax.excluded_from'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('withHoldingTax.excluded_to'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('withHoldingTaxExclusionFile'),
    ).not.toBeInTheDocument();
  });
});
