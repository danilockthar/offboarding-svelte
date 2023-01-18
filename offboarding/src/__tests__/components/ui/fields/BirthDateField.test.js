import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form, Formik } from 'formik';

import BirthDateField from '../../../../components/ui/fields/BirthDateField';
import i18n from '../../../../i18n';
import { GlobalStateProvider } from '../../../../context/GlobalStateContext';
import ConfigurationManager from '../../../../services/configurationManager';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    TACA_TACA: {
      API_DOMAIN: '',
    },
  },
}));

i18n.initialize('es');

const currentYear = new Date().getFullYear();

describe('BirthDateField', () => {
  it('should limit age to 13 by default', async () => {
    render(
      <GlobalStateProvider
        initialState={{ configurationManager: new ConfigurationManager() }}
      >
        <Formik
          initialValues={{
            birthDate: ``,
          }}
          onSubmit={() => {}}
        >
          <Form>
            <BirthDateField />
          </Form>
        </Formik>
      </GlobalStateProvider>,
    );

    const birthDateElement = screen
      .getByTestId('birthDate')
      .querySelector('input');

    await waitFor(() =>
      fireEvent.change(birthDateElement, {
        target: { value: `${currentYear}-05-12` },
      }),
    );
    await waitFor(() => fireEvent.blur(birthDateElement));

    expect(screen.getByText(/debes tener 13 años o más/i)).toBeInTheDocument();
  });

  it('should allow to change age limit by legalAge prop', async () => {
    render(
      <GlobalStateProvider
        initialState={{ configurationManager: new ConfigurationManager() }}
      >
        <Formik
          initialValues={{
            birthDate: ``,
          }}
          onSubmit={() => {}}
        >
          <Form>
            <BirthDateField legalAge={18} />
          </Form>
        </Formik>
      </GlobalStateProvider>,
    );

    const birthDateElement = screen
      .getByTestId('birthDate')
      .querySelector('input');

    await waitFor(() =>
      fireEvent.change(birthDateElement, {
        target: { value: `${currentYear}-05-12` },
      }),
    );
    await waitFor(() => fireEvent.blur(birthDateElement));

    expect(screen.getByText(/debes tener 18 años o más/i)).toBeInTheDocument();
  });

  it('should allow to remove age limit by set legalAge to false', async () => {
    render(
      <GlobalStateProvider
        initialState={{ configurationManager: new ConfigurationManager() }}
      >
        <Formik
          initialValues={{
            birthDate: ``,
          }}
          onSubmit={() => {}}
        >
          <Form>
            <BirthDateField legalAge={false} />
          </Form>
        </Formik>
      </GlobalStateProvider>,
    );

    const birthDateElement = screen
      .getByTestId('birthDate')
      .querySelector('input');

    await waitFor(() =>
      fireEvent.change(birthDateElement, {
        target: { value: `${currentYear}-05-12` },
      }),
    );
    await waitFor(() => fireEvent.blur(birthDateElement));

    expect(screen.queryByTestId('helper-text')).not.toBeInTheDocument();
  });

  it('should not show an error if age is greater than default legal age', async () => {
    render(
      <GlobalStateProvider
        initialState={{ configurationManager: new ConfigurationManager() }}
      >
        <Formik
          initialValues={{
            birthDate: ``,
          }}
          onSubmit={() => {}}
        >
          <Form>
            <BirthDateField />
          </Form>
        </Formik>
      </GlobalStateProvider>,
    );

    const birthDateElement = screen
      .getByTestId('birthDate')
      .querySelector('input');

    await waitFor(() =>
      fireEvent.change(birthDateElement, {
        target: { value: `${currentYear - 20}-05-12` },
      }),
    );
    await waitFor(() => fireEvent.blur(birthDateElement));

    expect(screen.queryByTestId('helper-text')).not.toBeInTheDocument();
  });
});
