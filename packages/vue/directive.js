function handleValue(field, type) {
  const prop = type === 'checkbox' ? 'checked' : 'value';

  return evt => {
    field.run(evt.target[prop]);
  };
}

const oncePassive = { once: true, passive: true };
const passive = { passive: true };

export default {
  bind(elem, binding, vnode) {
    const field = vnode.context;

    if (process.env.NODE_ENV !== 'production') {
      if (!elem.name) {
        throw new Error('[dev-only] @validate-me: "name" attribute not found.');
      }
      if (!field.setRules) {
        throw new Error(
          '[dev-only] @validate-me: its directive requires to have the FieldMixin set.',
        );
      }
    }

    const rules = binding.value || [];

    if (elem.type === 'number') {
      rules.unshift('number');
      elem.min && rules.unshift(`min:${elem.min}`);
      elem.max && rules.unshift(`max:${elem.max}`);
    }
    if (elem.required) {
      rules.unshift('required');
    }

    field.setRules(rules);

    elem.addEventListener('blur', field.touch, oncePassive);
    elem.addEventListener('input', handleValue(field, elem.type), passive);
  },
};
