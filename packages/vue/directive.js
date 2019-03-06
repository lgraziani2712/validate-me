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

    if (elem.required) {
      rules.unshift('required');
    }

    field.setRules(rules);

    elem.addEventListener('blur', field.touch, {
      once: true,
      passive: true,
    });
    elem.addEventListener('input', evt => field.run(evt.target.value), {
      passive: true,
    });
  },
};
