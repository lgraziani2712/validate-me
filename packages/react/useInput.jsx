import { useState, useContext, useEffect, useCallback } from 'react';
import { loadRule } from '@validate-me/core/rules';
import { getMessage, getWarning } from '@validate-me/core/dictionary';

import { FieldContext } from './ValidatemeForm';

export default function useInput({ validations, value, name, type, required }) {
  const { setField, setFieldState } = useContext(FieldContext);

  const [pristine, setPristine] = useState(true);
  const [error, setError] = useState();
  const [warning, setWarning] = useState();
  const [rules, setRules] = useState([]);
  const [newValue, onChangeValue] = useState(value);

  const runRules = useCallback(() => {
    for (const rule of rules) {
      const isValid = rule.run(newValue);

      if (!isValid) {
        setError(getMessage(rule, newValue));

        return true;
      }
    }

    setError();
  }, [newValue, rules]);

  useEffect(
    () =>
      setField({
        [name]: {
          touch() {
            setPristine(false);

            return runRules();
          },
          clearWarning: setWarning,
          parseError: rawError =>
            loadRule(rawError)
              .then(rule => {
                setRules(rules.concat(rule));
                setError(getMessage(rule, this.value));
              })
              .catch(rule => {
                setWarning(getWarning(rule, newValue));
              }),
        },
      }),
    [name, newValue, rules, runRules, setField],
  );

  // 1. Instanciates every rule
  useEffect(() => {
    const baseValidations = required ? ['required'] : [];

    if (type) {
      baseValidations.push(type);
    }

    const allRules = validations
      ? baseValidations.concat(validations)
      : baseValidations;

    Promise.all(allRules.map(loadRule)).then(setRules);
  }, [required, type, validations]);

  // 2. Executes every rule
  useEffect(() => {
    runRules();
  }, [runRules]);

  // 3. Pass its state to the form
  useEffect(() => {
    setFieldState({ [name]: pristine || error });
  }, [name, error, pristine, setFieldState]);

  return [
    {
      pristine,
      error,
      warning,
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
