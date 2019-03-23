/* eslint-disable no-underscore-dangle */
function checkboxList({ _value, checked }, values) {
  if (checked) {
    return values.concat(_value);
  }
  const idx = values.findIndex(item => item === _value);

  return values.slice(0, idx).concat(values.slice(idx + 1));
}
function handleValue(field, type) {
  const checkbox = type === 'checkbox';
  // si checkbox and value, array, sino bool, sino string
  const prop = checkbox ? 'checked' : 'value';

  return ({ target }) => {
    field.run(
      checkbox && target._value
        ? checkboxList(target, field.value)
        : target[prop],
    );
  };
}

const oncePassive = { once: true, passive: true };
const passive = { passive: true };
const number = 'number';

export const datePatterns = {
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  time: /^([01]\d|2[0-3]):[0-5]\d$/,
  'datetime-local': /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d$/,
  week: /^\d{4}-W([0-4]\d|5[0-3])$/
};

export default {
  // eslint-disable-next-line valid-jsdoc
  /**
   * @type {Vue.DirectiveFunction}
   * @param {HTMLInputElement} elem Elem
   */
  bind(elem, binding, vnode) {
    const field = vnode.context;

    if (process.env.NODE_ENV !== 'production') {
      if (!(elem instanceof HTMLInputElement)) {
        throw new Error(
          '[dev-only] @validate-me: directive can only be used in HTMLInputElement instances.',
        );
      }
      if (!elem.name) {
        throw new Error('[dev-only] @validate-me: "name" attribute not found.');
      }
      if (!field.setRules) {
        throw new Error(
          '[dev-only] @validate-me: its directive requires to have the FieldMixin set.',
        );
      }
    }

    /**
     * @type Array<string>
     */
    const rules = elem.required ? [['required']] : [];
    const addRule = rules.push.bind(rules);
    const type = vnode.data.attrs.type;

    if (type === number || type === 'range') {
      addRule([number]);
      elem.min && addRule(['min', elem.min]);
      elem.max && addRule(['max', elem.max]);
    } else if (type === 'datetime-local') {
      const pattern = datePatterns[type];

      addRule(['pattern', pattern, '', '2019-02-28T23:59']);

      if (elem.min) {
        if (process.env.NODE_ENV !== 'production' && !pattern.test(elem.min)) {
          throw new Error(
            `[dev-only] @validate-me: the value "${
              elem.min
            }" from the min prop must be a valid ${type} value.`,
          );
        }
        addRule(['min', elem.min]);
      }
      if (elem.max) {
        if (process.env.NODE_ENV !== 'production' && !pattern.test(elem.max)) {
          throw new Error(
            `[dev-only] @validate-me: the value "${
              elem.max
            }" from the max prop must be a valid ${type} value.`,
          );
        }
        addRule(['max', elem.max]);
      }
    } else if (type === 'time') {
      const pattern = datePatterns[type];

      addRule(['pattern', pattern, '', '14:59']);

      if (elem.min) {
        if (process.env.NODE_ENV !== 'production' && !pattern.test(elem.min)) {
          throw new Error(
            `[dev-only] @validate-me: the value "${
              elem.min
            }" from the min prop must be a valid ${type} value.`,
          );
        }
        addRule(['min', elem.min]);
      }
      if (elem.max) {
        if (process.env.NODE_ENV !== 'production' && !pattern.test(elem.max)) {
          throw new Error(
            `[dev-only] @validate-me: the value "${
              elem.max
            }" from the max prop must be a valid ${type} value.`,
          );
        }
        addRule(['max', elem.max]);
      }
    } else if (type === 'date') {
      const pattern = datePatterns[type];

      addRule(['pattern', pattern, '', '2019-03-24']);

      if (elem.min) {
        if (process.env.NODE_ENV !== 'production' && !pattern.test(elem.min)) {
          throw new Error(
            `[dev-only] @validate-me: the value "${
              elem.min
            }" from the min prop must be a valid ${type} value.`,
          );
        }
        addRule(['min', elem.min]);
      }
      if (elem.max) {
        if (process.env.NODE_ENV !== 'production' && !pattern.test(elem.max)) {
          throw new Error(
            `[dev-only] @validate-me: the value "${
              elem.max
            }" from the max prop must be a valid ${type} value.`,
          );
        }
        addRule(['max', elem.max]);
      }
    } else if (type === 'week') {
      const pattern = datePatterns[type];

      addRule(['pattern', pattern, '', '2019-W53']);

      if (elem.min) {
        if (process.env.NODE_ENV !== 'production' && !pattern.test(elem.min)) {
          throw new Error(
            `[dev-only] @validate-me: the value "${
              elem.min
            }" from the min prop must be a valid ${type} value.`,
          );
        }
        addRule(['min', elem.min]);
      }
      if (elem.max) {
        if (process.env.NODE_ENV !== 'production' && !pattern.test(elem.max)) {
          throw new Error(
            `[dev-only] @validate-me: the value "${
              elem.max
            }" from the max prop must be a valid ${type} value.`,
          );
        }
        addRule(['max', elem.max]);
      }
    }
    if (elem.pattern) {
      const rule = ['pattern', elem.pattern];

      if (type === 'email' && elem.multiple) {
        rule.push('mul');
      }

      addRule(rule);
    }

    field.setRules(binding.value ? rules.concat(binding.value) : rules);

    elem.addEventListener('blur', field.touch, oncePassive);
    elem.addEventListener('input', handleValue(field, type), passive);
  },
};
