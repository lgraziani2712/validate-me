import { useState, useEffect, useCallback, useReducer } from 'react';
import { loadRule } from '@validate-me/core/rules';
import { getMessage, getWarning } from '@validate-me/core/dictionary';

function unknownRuleErrorOnInit({ name, args }) {
  throw new Error(`Unknown rule "${name}" with args "${args.join(', ')}".`);
}

export default function useInput({
  form: { setField, setFieldState },
  rules,
  value,
  name,
  type,
  required,
}) {
  const [loading, setLoading] = useState(false);
  const [pristine, setPristine] = useState(true);
  const [error, setError] = useState();
  const [warning, setWarning] = useState();
  const [ruleRunners, setRules] = useReducer(
    (rules, rule) => (Array.isArray(rule) ? rule : rules.concat(rule)),
    [],
  );
  const [newValue, onChangeValue] = useState(value);

  const runRules = useCallback(
    value => {
      for (const rule of ruleRunners) {
        const isValid = rule.run(value);

        if (!isValid) {
          setError(getMessage(rule, value));

          return true;
        }
      }

      setError();
    },
    [ruleRunners],
  );

  useEffect(
    () =>
      setField(name, {
        touch() {
          setPristine(false);

          return runRules(newValue);
        },
        clearWarning: setWarning,
        parseError: rawError =>
          loadRule(rawError)
            .then(rule => {
              setRules(rule);
              setError(getMessage(rule, newValue));
            })
            .catch(rule => {
              setWarning(getWarning(rule, newValue));
            }),
      }),
    [name, newValue, runRules, setField],
  );

  // 1. Instanciates every rule
  useEffect(() => {
    setLoading(true);
    const baseRules = required ? ['required'] : [];

    if (type) {
      baseRules.push(type);
    }

    const allRules = rules ? baseRules.concat(rules) : baseRules;

    Promise.all(allRules.map(loadRule))
      .then(setRules)
      .catch(unknownRuleErrorOnInit)
      .finally(() => setLoading(false));
  }, [required, rules, type]);

  // 2. Executes every rule
  useEffect(() => {
    runRules(newValue);
  }, [newValue, runRules]);

  // 3. Pass its state to the form
  useEffect(() => {
    setFieldState({ name, value: Boolean(loading || error) });
  }, [error, loading, name, setFieldState]);

  return [
    {
      pristine,
      error,
      warning,
      loading,
    },
    {
      required,
      name,
      type,
      value: newValue,
      onChange: evt => onChangeValue(evt.target.value),
      // onBlur.once
      onBlur: pristine ? () => setPristine(false) : undefined,
    },
  ];
}
