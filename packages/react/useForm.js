import { useReducer, useState, useEffect, useCallback, useRef } from 'react';
import { processErrors } from '@validate-me/core/rules';

let errorHandler = f => f;

export function setErrorHandler(handler) {
  errorHandler = handler;
}

export default function useForm() {
  const fields = useRef({});
  const [fieldStates, setFieldState] = useReducer(
    (fields, { name, value }) =>
      fields[name] === value ? fields : { ...fields, [name]: value },
    {},
  );
  const [invalid, setValidity] = useState(true);
  const [touched, setTouch] = useState(false);
  const setField = useCallback((name, field) => {
    fields.current[name] = field;
  }, []);

  // 1. Verifies if every input is valid
  useEffect(() => {
    for (const fieldInvalid of Object.values(fieldStates)) {
      if (fieldInvalid) {
        setValidity(true);

        return;
      }
    }

    setValidity(false);
  }, [fieldStates]);

  // 2. Executes the submit event. Touches every pristine input.
  const validate = useCallback(() => {
    let localInvalid = true;
    const fieldsValue = Object.values(fields.current);

    if (!touched) {
      localInvalid = fieldsValue.reduce(
        (invalid, field) => field.touch() || invalid,
        true,
      );

      setTouch(true);
    }

    if (localInvalid && invalid) {
      return false;
    }
    fieldsValue.forEach(field => field.clearWarning());

    return true;
  }, [invalid, touched]);

  // 3. Process errors from server
  const process = useCallback(
    error => processErrors(fields.current, errorHandler(error)),
    [],
  );

  return { setField, setFieldState, validate, process, touched, invalid };
}
