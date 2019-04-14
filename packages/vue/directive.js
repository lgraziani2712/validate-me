import getRules from '@validate-me/core/getRules';

/**
 * @param {Vue.default} field field
 * @param {string} type type
 * @return {Function} input handler
 */
function handleValue(field, type) {
  const checkbox = type === 'checkbox';
  const prop = checkbox ? 'checked' : 'value';
  const checkList = checkbox && field.$props.options;

  return checkList
    ? ({ target }) => {
        field.run({
          ...field.vField.value,
          [target.defaultValue]: target.checked,
        });
      }
    : ({ target }) => {
        field.run(target[prop]);
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
