import { useReducer, useEffect, useRef } from 'react';
import { processErrors } from '@validate-me/core/rules';

let errorHandler = f => f;
const touchAction = ['touched', true];
const invalidState = [false];

function handleState(state, [type, value]) {
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
  const [state, setState] = useReducer(handleState, {});
  const form = useRef({
    setField: (name, field) => {
      fields.current[name] = field;
    },
    // Process errors from server
    process: error => processErrors(fields.current, errorHandler(error)),
  });

  useEffect(() => {
    // Executes the submit event. Touches every pristine input.
    form.current.validate = () => {
      const fieldsValue = Object.values(fields.current);

      if (state.touched) {
        for (const field of fieldsValue) {
          if (field.invalid()) {
            return invalidState;
          }
        }
      } else {
        const invalid = fieldsValue.reduce(
          (invalid, field) => field.invalid() || invalid,
          false,
        );

        setState(touchAction);

        if (invalid) {
          return invalidState;
        }
      }

      return [
        true,
        Object.keys(fields.current).reduce((data, key) => {
          data[key] = fields.current[key].clearWarning();

          return data;
        }, {}),
      ];
    };
  }, [state.touched]);

  return form.current;
}
