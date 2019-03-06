import React, { useReducer, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

export const FieldContext = React.createContext();
export const SubmittableForm = React.createContext();

/**
 * @param {Array<string>} fields Fields
 * @param {Object} newField Field
 * @return {Array<string>} New state
 */
function fieldHandlersReducer(fields, newField) {
  return { ...fields, ...newField };
}

// TODO: useMemo for the validation
export default function ValidatemeForm({ children, onSubmit, ...props }) {
  const [fields, setField] = useReducer(fieldHandlersReducer, {});
  const [isValid, setValidity] = useState(true);
  const [pristine, setPristine] = useState(true);

  // 1. Verifica si todos los inputs son válidos
  useEffect(() => {
    let isValid = true;

    for (const field of Object.values(fields)) {
      if (field.invalid) {
        isValid = false;

        break;
      }
    }

    setValidity(isValid);
  }, [fields]);

  // 2. Ejecuta el evento de submit, el cual "toca" todos
  // los campos que no hayan sido "tocados"
  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();

      if (pristine) {
        for (const field of Object.values(fields)) {
          field.touch && field.touch();
        }

        setPristine(false);
      }

      onSubmit(isValid);
    },
    [fields, isValid, onSubmit, pristine],
  );

  return (
    <FieldContext.Provider value={setField}>
      <SubmittableForm.Provider value={pristine || isValid}>
        <form {...props} onSubmit={handleSubmit}>
          {children}
        </form>
      </SubmittableForm.Provider>
    </FieldContext.Provider>
  );
}

ValidatemeForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
