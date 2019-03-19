/* eslint-disable no-underscore-dangle */

function handleValue(field, type) {
  // si checkbox and value, array, sino bool, sino string
  const prop = type === 'checkbox' ? 'checked' : 'value';

  return ({ target }) => {
    if (!target._value || type === 'radio') {
      return field.run(target[prop]);
    }
    const { _value, checked } = target;
    const values = field.value;

    if (checked) {
      field.run(values.concat(_value));
    } else {
      const idx = values.findIndex(item => item === _value);

      field.run(values.slice(0, idx).concat(values.slice(idx + 1)));
    }
  };
}

const oncePassive = { once: true, passive: true };
const passive = { passive: true };
const number = 'number';

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
    const rules = elem.required ? ['required'] : [];

    if (elem.type === number) {
      rules.push(number);
      elem.min && rules.push(`min:${elem.min}`);
      elem.max && rules.push(`max:${elem.max}`);
    }
    if (elem.pattern) {
      const rule = `pattern:${elem.pattern}`;

      rules.push(elem.type === 'email' && elem.multiple ? `${rule}:mul` : rule);
    }

    field.setRules(binding.value ? rules.concat(binding.value) : rules);

    elem.addEventListener('blur', field.touch, oncePassive);
    elem.addEventListener('input', handleValue(field, elem.type), passive);
  },
};
