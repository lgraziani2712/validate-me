import { useEffect, useReducer, useMemo, useRef, useContext } from 'react';
import getRules from '@validate-me/core/getRules';
import { loadRule, processRawRules } from '@validate-me/core/rules';
import { getMessage, getWarning } from '@validate-me/core/dictionary';

import { VContext } from './useForm';

const touchedAction = ['touched', true];
const notLoadingAction = ['loading'];
const loadingAction = ['loading', true];
const warning = ['warning'];

export default function useField(
  type,
  { rules, value, name, required, min, max, pattern, multiple, options },
) {
  const hasOptions = !!options;
  const form = useContext(VContext);
  const stateRef = useRef();
  const ruleRunners = useRef([]);
  const [state, setState] = useReducer(
    (state, prop) => {
      const oldVal = state.value;
      const [key, val] = typeof prop === 'function' ? prop(oldVal) : prop;

      if (state[key] === val) {
        return state;
      }

      const newState = { ...state, [key]: val };
      const rules = ruleRunners.current;

      if (
        key === 'touched' ||
        (key === 'value' && rules.length && oldVal !== val) ||
        (key !== 'error' &&
          !state.error &&
          !oldVal &&
          (required || rules.isReq))
      ) {
        newState.error = '';
        const newVal = key === 'value' ? val : oldVal;

        for (const rule of rules) {
          if (!rule.run(newVal)) {
            newState.error = getMessage(rule, newVal);

            break;
          }
        }
      }

      return newState;
    },
    {
      loading: true,
      value: value || '',
    },
  );
  const onChange = useMemo(() => {
    const checkbox = type === 'checkbox';
    const prop = checkbox ? 'checked' : 'value';

    return checkbox && hasOptions
      ? evt => {
          const { defaultValue, checked } = evt.target;

          setState(value => ['value', { ...value, [defaultValue]: checked }]);
        }
      : evt => {
          setState(['value', evt.target[prop]]);
        };
  }, [hasOptions, type]);

  useEffect(() => {
    form.setField(name, {
      touch() {
        setState(touchedAction);

        return stateRef.current.error;
      },
      invalid() {
        return Boolean(stateRef.current.loading || stateRef.current.error);
      },
      clearWarning() {
        setState(warning);

        return stateRef.current.value;
      },
      parseError: rawError =>
        loadRule(rawError)
          .then(rule => {
            const rules = ruleRunners.current;

            if (rule.name === 'required') {
              rules.isReq = true;
              rules.unshift(rule);
            } else {
              rules.push(rule);
            }
            setState(value => ['error', getMessage(rule, value)]);
          })
          .catch(rule => {
            if (rule instanceof Error) {
              throw rule;
            }
            setState(value => ['warning', getWarning(rule, value)]);
          }),
    });

    return () => form.unsetField(name);
  }, [name, form]);

  useEffect(() => {
    setState(loadingAction);

    const baseRules = getRules(type, {
      required,
      min,
      max,
      pattern,
      multiple,
    });

    processRawRules(
      rules ? baseRules.concat(rules) : baseRules,
      rules => {
        ruleRunners.current = rules;
      },
      () => {
        setState(notLoadingAction);
      },
    );
  }, [type, max, min, multiple, pattern, required, rules]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return [
    state,
    {
      required,
      name,
      type,
      min,
      max,
      pattern,
      multiple,
      onChange,
      value: state.value,
      // onBlur.once
      onBlur: state.touched ? undefined : () => setState(touchedAction),
    },
  ];
}
