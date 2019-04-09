import { useEffect, useReducer, useMemo, useRef } from 'react';
import getRules from '@validate-me/core/getRules';
import { loadRule, processRawRules } from '@validate-me/core/rules';
import { getMessage, getWarning } from '@validate-me/core/dictionary';

const touchedAction = ['touched', true];
const notLoadingAction = ['loading'];
const loadingAction = ['loading', true];
const warning = ['warning'];

export default function useField(
  type,
  { form, rules, value, name, required, min, max, pattern, multiple, options },
) {
  const checkbox = type === 'checkbox';
  const prop = checkbox ? 'checked' : 'value';
  const checkList = checkbox && options;
  const stateRef = useRef();
  const [ruleRunners, setRules] = useReducer(
    (rules, rule) => (rule.length == null ? rule : rules.concat(rule)),
    [],
  );
  const [state, setState] = useReducer(
    (state, prop) => {
      const oldVal = state.value;
      const [key, val] = typeof prop === 'function' ? prop(oldVal) : prop;

      if (state[key] === val) {
        return state;
      }

      const newState = { ...state, [key]: val };

      if (
        key === 'value' &&
        ruleRunners.length &&
        oldVal !== val &&
        (val || required)
      ) {
        newState.error = '';

        for (const rule of ruleRunners) {
          if (!rule.run(val)) {
            newState.error = getMessage(rule, val);

            break;
          }
        }
      }

      return newState;
    },
    {
      loading: true,
      value: value || (checkList ? {} : ''),
    },
  );
  const onChange = useMemo(() => {
    if (checkList) {
      return evt => {
        const { defaultValue, checked } = evt.target;

        setState(value => ['value', { ...value, [defaultValue]: checked }]);
      };
    }

    return evt => {
      setState(['value', evt.target[prop]]);
    };
  }, [checkList, prop]);

  useEffect(
    () =>
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
              setRules(rule);
              setState(value => ['error', getMessage(rule, value)]);
            })
            .catch(rule => {
              if (rule instanceof Error) {
                throw rule;
              }
              setState(value => ['warning', getWarning(rule, value)]);
            }),
      }),
    [name, form],
  );

  useEffect(() => {
    setState(loadingAction);

    const baseRules = getRules(type, {
      required,
      min,
      max,
      pattern,
      multiple,
    });

    processRawRules(rules ? baseRules.concat(rules) : baseRules, setRules, () =>
      setState(notLoadingAction),
    );
  }, [max, min, multiple, pattern, required, rules, type]);

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
      [prop]: state.value,
      // onBlur.once
      onBlur: state.touched ? undefined : () => setState(touchedAction),
    },
  ];
}
