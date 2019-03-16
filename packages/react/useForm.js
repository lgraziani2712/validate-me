import { useReducer, useEffect, useCallback, useRef } from 'react';
import { processErrors } from '@validate-me/core/rules';

let errorHandler = f => f;
const INIT_STATE = { invalid: true };
const invalidAction = ['invalid', true];
const validAction = ['invalid'];
const touchAction = ['touched', true];

export function handleState(state, [type, value]) {
  return state[type] === value
    ? state
    : {
        ...state,
        [type]: value,
      };
}

export function setErrorHandler(handler) {
  errorHandler = handler;
}

export default function useForm() {
  const fields = useRef({});
  const [state, setState] = useReducer(handleState, INIT_STATE);
  const [fieldStates, setFieldState] = useReducer(handleState, {});
  const setField = useCallback((name, field) => {
    fields.current[name] = field;
  }, []);
  // Executes the submit event. Touches every pristine input.
  const validate = useCallback(() => {
    let localInvalid;
    const fieldsValue = Object.values(fields.current);

    if (!state.touched) {
      localInvalid = fieldsValue.reduce(
        (invalid, field) => field.touch() || invalid,
        true,
      );

      setState(touchAction);
    }

    if (localInvalid || state.invalid) {
      return false;
    }

    fieldsValue.forEach(field => field.clearWarning());

    return true;
  }, [state.invalid, state.touched]);
  // Process errors from server
  const process = useCallback(
    error => processErrors(fields.current, errorHandler(error)),
    [],
  );

  // Verifies if every input is valid
  useEffect(() => {
    for (const fieldInvalid of Object.values(fieldStates)) {
      if (fieldInvalid) {
        setState(invalidAction);

        return;
      }
    }

    setState(validAction);
  }, [fieldStates]);

  return [state, { setField, setFieldState, validate, process }];
}
