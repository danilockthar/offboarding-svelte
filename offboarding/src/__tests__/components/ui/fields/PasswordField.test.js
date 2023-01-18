import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form, Formik } from 'formik';

import PasswordField from '../../../../components/ui/fields/PasswordField';
import i18n from '../../../../i18n';
import ConfigurationManager from '../../../../services/configurationManager';
import { GlobalStateProvider } from '../../../../context/GlobalStateContext';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    TACA_TACA: {
      API_DOMAIN: '',
    },
  },
}));

i18n.initialize('es');

const FormikPrepared = () => {
  return (
    <GlobalStateProvider
      initialState={{ configurationManager: new ConfigurationManager() }}
    >
      <Formik
        initialValues={{
          password: '',
        }}
        onSubmit={() => {}}
      >
        <Form>
          <PasswordField />
        </Form>
      </Formik>
    </GlobalStateProvider>
  );
};

describe('PasswordField', () => {
  const errorMessageRegex = /contraseña inválida. debe tener un mínimo de 8 caracteres, una letra y un número./i;

  it('should render input type as password', async () => {
    render(<FormikPrepared />);

    const passwordElement = screen
      .getByTestId('password')
      .querySelector('input');

    expect(passwordElement).toHaveAttribute('type', 'password');
  });

  it('should render input type as text if show password icon is clicked', async () => {
    render(<FormikPrepared />);

    fireEvent.click(screen.getByLabelText(/toggle password visibility/i));

    const passwordElement = screen
      .getByTestId('password')
      .querySelector('input');

    expect(passwordElement).toHaveAttribute('type', 'text');
  });

  it('should render input type as password if hide password icon is clicked', async () => {
    render(<FormikPrepared />);

    fireEvent.click(screen.getByLabelText(/toggle password visibility/i));
    fireEvent.click(screen.getByLabelText(/toggle password visibility/i));

    const passwordElement = screen
      .getByTestId('password')
      .querySelector('input');

    expect(passwordElement).toHaveAttribute('type', 'password');
  });

  it('should show error message if password does not have at least 8 characters', async () => {
    render(<FormikPrepared />);

    const passwordElement = screen
      .getByTestId('password')
      .querySelector('input');

    await waitFor(() =>
      fireEvent.change(passwordElement, { target: { value: '1word' } }),
    );
    await waitFor(() => fireEvent.blur(passwordElement));

    expect(screen.getByText(errorMessageRegex)).toBeInTheDocument();
  });

  it('should show error message if password does not have at least one number', async () => {
    render(<FormikPrepared />);

    const passwordElement = screen
      .getByTestId('password')
      .querySelector('input');

    await waitFor(() =>
      fireEvent.change(passwordElement, {
        target: { value: 'eighthCharacters' },
      }),
    );
    await waitFor(() => fireEvent.blur(passwordElement));

    expect(screen.getByText(errorMessageRegex)).toBeInTheDocument();
  });

  it('should show error message if password does not have at least one letter', async () => {
    render(<FormikPrepared />);

    const passwordElement = screen
      .getByTestId('password')
      .querySelector('input');

    await waitFor(() =>
      fireEvent.change(passwordElement, { target: { value: '1234567890123' } }),
    );
    await waitFor(() => fireEvent.blur(passwordElement));

    expect(screen.getByText(errorMessageRegex)).toBeInTheDocument();
  });

  it('should show error message if password is leave blank', async () => {
    render(<FormikPrepared />);

    const passwordElement = screen
      .getByTestId('password')
      .querySelector('input');

    await waitFor(() =>
      fireEvent.change(passwordElement, { target: { value: '' } }),
    );
    await waitFor(() => fireEvent.blur(passwordElement));

    expect(screen.getByText(/campo requerido/i)).toBeInTheDocument();
  });
});
