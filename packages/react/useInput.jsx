import { useState, useContext, useEffect } from 'react';
import ValidatemeDictionary from '@validate-me/core/ValidatemeDictionary';
import { loadRule } from '@validate-me/core/ValidatemeRules';

import { FieldContext } from './ValidatemeForm';

export default function useInput({ validations, value, name, type, required }) {
  // Context para pasar el callback al form
  const setField = useContext(FieldContext);
  // Estados propios del input
  const [pristine, setPristine] = useState(true);
  const [error, setError] = useState();
  const [rules, setRules] = useState([]);
  const [newValue, onChangeValue] = useState(value);

  // Efectos que se invocan al montarse y en cada actualización
  // (siempre y cuando cambiaron los valores de los que depende)

  // 1. Instancia todas las reglas de validación
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

  // 2. Ejecuta las reglas
  useEffect(() => {
    for (const rule of rules) {
      const isValid = rule.run(newValue);

      if (!isValid) {
        setError(
          ValidatemeDictionary.getMessage(rule.name, newValue, rule.args),
        );

        return;
      }
    }

    setError();
  }, [newValue, rules]);

  // 3. Le pasa su estado al form.
  useEffect(() => {
    const field = {
      isInvalid: pristine || error,
    };

    if (pristine) {
      field.touch = () => setPristine(false);
    }

    setField({ name, field });
  }, [name, setField, error, pristine]);

  return [
    {
      pristine,
      error,
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
