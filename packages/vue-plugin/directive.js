import ValidatemeItem from '@validate-me/core/ValidatemeItem';

export default {
  bind(elem, binding, vnode) {
    const validateme = vnode.context.$validateme;

    if (!elem.name) {
      throw new Error('[$validateme] "name" attribute not found.');
    }
    if (!validateme) {
      throw new Error(
        `[$validateme] Cannot be instanciated into "${
          elem.name
        }" without an instance`,
      );
    }

    const rules = binding.value || [];

    if (elem.required) {
      rules.push('required');
    }

    const field = new ValidatemeItem(elem.name, rules);

    validateme.setField(field);

    elem.addEventListener('blur', () => field.touchState(), {
      once: true,
      passive: true,
    });
    elem.addEventListener('input', evt => field.run(evt.target.value), {
      passive: true,
    });
  },
};
