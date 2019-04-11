import getRules from '@validate-me/core/getRules';

function handleValue(field, type) {
  const checkbox = type === 'checkbox';
  // si checkbox and value, array, sino bool, sino string
  const prop = checkbox ? 'checked' : 'value';

  return ({ target }) => {
    field.run(
      checkbox && target.defaultValue
        ? { ...field.value, [target.defaultValue]: target.checked }
        : target[prop],
    );
  };
}

const oncePassive = { once: true, passive: true };
const passive = { passive: true };

export default {
  // eslint-disable-next-line valid-jsdoc
  /**
   * @type {Vue.DirectiveFunction}
   * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} elem Elem
   */
  bind(elem, binding, vnode) {
    const field = vnode.context;

    if (process.env.NODE_ENV !== 'production') {
      if (
        !(
          elem instanceof HTMLInputElement ||
          elem instanceof HTMLSelectElement ||
          elem instanceof HTMLTextAreaElement
        )
      ) {
        throw new Error(
          '[dev-only] @validate-me: directive can only be used in ' +
            'HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement instances.',
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

    const type = vnode.data.attrs.type;
    const rules = getRules(type, elem);

    field.setRules(binding.value ? rules.concat(binding.value) : rules);

    elem.addEventListener('blur', field.touch, oncePassive);
    elem.addEventListener('input', handleValue(field, type), passive);
  },
};
