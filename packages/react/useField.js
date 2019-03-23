import { useEffect, useCallback, useReducer } from 'react';
import getRules from '@validate-me/core/getRules';
import { loadRule, processRawRules } from '@validate-me/core/rules';
import { getMessage, getWarning } from '@validate-me/core/dictionary';

import { handleState } from './useForm';

const init = value => ({ pristine: true, value: value == null ? '' : value });
const pristineAction = ['pristine'];
const notLoadingAction = ['loading'];
const loadingAction = ['loading', true];

export default function useField(
  type,
  { form, rules, value, name, required, min, max, pattern, multiple },
) {
  const [state, setState] = useReducer(handleState, init(value));
  const [ruleRunners, setRules] = useReducer(
    (rules, rule) => (rule.length ? rule : rules.concat(rule)),
    [],
  );

  const runRules = useCallback(
    value => {
      if (value || required) {
        for (const rule of ruleRunners) {
          if (!rule.run(value)) {
            setState(['error', getMessage(rule, value)]);

            return true;
          }
        }
      }

      setState(['error']);
    },
    [required, ruleRunners],
  );

  useEffect(
    () =>
      form.setField(name, {
        touch() {
          setState(pristineAction);

          return runRules(state.value);
        },
        clearWarning() {
          setState(['warning']);
        },
        parseError: rawError =>
          loadRule(rawError)
            .then(rule => {
              setRules(rule);
              setState(['error', getMessage(rule, state.value)]);
            })
            .catch(rule => {
              if (rule instanceof Error) {
                throw rule;
              }
              setState(['warning', getWarning(rule, state.value)]);
            }),
      }),
    [name, state.value, runRules, form],
  );

  // 1. Instanciates every rule
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

  // 2. Executes every rule
  useEffect(() => {
    runRules(state.value);
  }, [state.value, runRules]);

  // 3. Pass its state to the form
  useEffect(() => {
    form.setFieldState([name, Boolean(state.loading || state.error)]);
  }, [state.error, state.loading, name, form]);

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
      value: state.value,
      onChange(evt) {
        setState(['value', evt.target.value]);
      },
      // onBlur.once
      onBlur: state.pristine ? () => setState(pristineAction) : undefined,
    },
  ];
}
