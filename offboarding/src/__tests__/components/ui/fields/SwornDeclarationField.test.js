import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form, Formik } from 'formik';

import SwornDeclarationField from '../../../../components/ui/fields/SwornDeclarationField';

const FormikPrepared = () => {
  return (
    <Formik
      initialValues={{
        swornDeclaration: {
          isObligatedSubject: false,
          isPoliticallyExposedPerson: false,
          noneOfAbove: false,
        }
      }}
      onSubmit={() => {}}
    >
      <Form>
        <SwornDeclarationField />
      </Form>
    </Formik>
  );
};

const getSwornDeclarationElements = () => {
  return {
    isObligatedSubjectElement: screen.getByTestId('swornDeclaration.isObligatedSubject').querySelector('input'),
    isPoliticallyExposedPersonElement: screen.getByTestId('swornDeclaration.isPoliticallyExposedPerson').querySelector('input'),
    noneOfAboveElement: screen.getByTestId('swornDeclaration.noneOfAbove').querySelector('input'),
  };
}

describe('SwornDeclarationField', () => {
  it('renders isObligatedSubject, isPoliticallyExposedPerson and noneOfAbove fields', () => {
    render(<FormikPrepared />);

    const { isObligatedSubjectElement, isPoliticallyExposedPersonElement, noneOfAboveElement } = getSwornDeclarationElements();

    expect(isObligatedSubjectElement).toBeInTheDocument();
    expect(isObligatedSubjectElement).not.toBeChecked();
    expect(isObligatedSubjectElement).not.toBeDisabled();

    expect(isPoliticallyExposedPersonElement).toBeInTheDocument();
    expect(isPoliticallyExposedPersonElement).not.toBeChecked();
    expect(isPoliticallyExposedPersonElement).not.toBeDisabled();

    expect(noneOfAboveElement).toBeInTheDocument();
    expect(noneOfAboveElement).not.toBeChecked();
    expect(noneOfAboveElement).not.toBeDisabled();
  });

  it('disable noneOfAbove if isObligatedSubject is checked', () => {
    render(<FormikPrepared />);

    fireEvent.click(screen.getByTestId('swornDeclaration.isObligatedSubject-label'));

    const { isObligatedSubjectElement, isPoliticallyExposedPersonElement, noneOfAboveElement } = getSwornDeclarationElements();

    expect(isObligatedSubjectElement).toBeChecked();
    expect(isObligatedSubjectElement).not.toBeDisabled();
    expect(isPoliticallyExposedPersonElement).not.toBeDisabled();
    expect(noneOfAboveElement).toBeDisabled();
  });

  it('disable noneOfAbove if isPoliticallyExposedPerson is checked', () => {
    render(<FormikPrepared />);

    fireEvent.click(screen.getByTestId('swornDeclaration.isPoliticallyExposedPerson-label'));

    const { isObligatedSubjectElement, isPoliticallyExposedPersonElement, noneOfAboveElement } = getSwornDeclarationElements();

    expect(isPoliticallyExposedPersonElement).toBeChecked();
    expect(isPoliticallyExposedPersonElement).not.toBeDisabled();
    expect(isObligatedSubjectElement).not.toBeDisabled();
    expect(noneOfAboveElement).toBeDisabled();
  });

  it('disable isPoliticallyExposedPerson and isObligatedSubject if noneOfAbove is checked', () => {
    render(<FormikPrepared />);

    fireEvent.click(screen.getByTestId('swornDeclaration.noneOfAbove-label'));

    const { isObligatedSubjectElement, isPoliticallyExposedPersonElement, noneOfAboveElement } = getSwornDeclarationElements();

    expect(noneOfAboveElement).toBeChecked();
    expect(isPoliticallyExposedPersonElement).toBeDisabled();
    expect(isObligatedSubjectElement).toBeDisabled();
    expect(noneOfAboveElement).not.toBeDisabled();
  });
})