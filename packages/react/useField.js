import { useEffect, useReducer, useMemo, useRef } from 'react';
import getRules from '@validate-me/core/getRules';
import { loadRule, processRawRules } from '@validate-me/core/rules';
import { getMessage, getWarning } from '@validate-me/core/dictionary';

function ruleRunner(rules, required, value) {
  if (value || required) {
    for (const rule of rules) {
      if (!rule.run(value)) {
        return getMessage(rule, value);
      }
    }
  }
}

const handleState = (rules, required) => (state, prop) => {
  const [type, value] = typeof prop === 'function' ? prop(state.value) : prop;

  if (state[type] === value) {
    return state;
  }

  const newState = {
    ...state,
    [type]: value,
  };

  if (type === 'value' && rules.length && state.value !== value) {
    newState.error = ruleRunner(rules, required, value);
  }

  return newState;
};

const init = (value, checkList) => ({
  pristine: true,
  loading: true,
  // eslint-disable-next-line no-nested-ternary
  value: checkList ? {} : value == null ? '' : value,
});
const pristineAction = ['pristine'];
const notLoadingAction = ['loading'];
const loadingAction = ['loading', true];
const warning = ['warning'];

export default function useField(
  type,
  { form, rules, value, name, required, min, max, pattern, multiple, options },
) {
  const checkbox = type === 'checkbox';
  const checkList = checkbox && options;
  const stateRef = useRef();
  const [ruleRunners, setRules] = useReducer(
    (rules, rule) => (rule.length ? rule : rules.concat(rule)),
    [],
  );
  const [state, setState] = useReducer(
    handleState(ruleRunners, required),
    init(value, checkList),
  );
  const onChange = useMemo(() => {
    if (checkList) {
      return evt => {
        const { defaultValue, checked } = evt.target;

        setState(value => ['value', { ...value, [defaultValue]: checked }]);
      };
    }
    const prop = checkbox ? 'checked' : 'value';

    return evt => {
      setState(['value', evt.target[prop]]);
    };
  }, [checkList, checkbox]);

  useEffect(
    () =>
      form.setField(name, {
        touch() {
          setState(pristineAction);

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
      value: state.value,
      // onBlur.once
      onBlur: state.pristine ? () => setState(pristineAction) : undefined,
    },
  ];
}
