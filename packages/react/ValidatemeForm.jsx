import React, { useReducer, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

export const FieldContext = React.createContext();
export const SubmittableForm = React.createContext();

let errorHandler = f => f;

export function setErrorHandler(handler) {
  errorHandler = handler;
}

/**
 * @param {Array<string>} fields Fields
 * @param {Object} newField Field
 * @return {Array<string>} New state
 */
function fieldHandlersReducer(fields, newField) {
  return { ...fields, ...newField };
}

export default function ValidatemeForm({ children, onSubmit, ...props }) {
  const [fieldStates, setFieldState] = useReducer(fieldHandlersReducer, {});
  const [fields, setField] = useReducer(fieldHandlersReducer, {});
  const [isValid, setValidity] = useState(true);
  const [pristine, setPristine] = useState(true);

  // 1. Verifies if every input is valid
  useEffect(() => {
    let isValid = true;

    for (const fieldInvalid of Object.values(fieldStates)) {
      if (fieldInvalid) {
        isValid = false;

        break;
      }
    }

    setValidity(isValid);
  }, [fieldStates]);

  // 2. Executes the submit event. Touches every pristine input.
  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();

      let firstValidation = false;
      const fieldsValue = Object.values(fields);

      if (pristine) {
        firstValidation = fieldsValue.reduce(
          (valid, field) => !field.touch() && valid,
          true,
        );

        setPristine(false);
      }

      if (isValid) {
        fieldsValue.forEach(field => field.clearWarning());
      }

      onSubmit(firstValidation || isValid, error => {
        const failedFieldsRules = errorHandler(error);

        return Promise.all(
          Object.keys(failedFieldsRules).map(name => {
            const field = fields[name];

            if (process.env.NODE_ENV !== 'production' && !field) {
              // eslint-disable-next-line no-console
              console.warn(
                `[dev-only] @validate-me: Unknown field "${name}" while parsing errors from server.`,
              );

              return name;
            }

            return field.parseError(failedFieldsRules[name]);
          }),
        );
      });
    },
    [fields, isValid, onSubmit, pristine],
  );

  return (
    <FieldContext.Provider value={{ setField, setFieldState }}>
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
