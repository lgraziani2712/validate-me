import ValidatemeItem from '@validate-me/core/ValidatemeItem';

export default {
  bind(elem, binding, vnode) {
    const validateme = vnode.context.$validateme;

    if (!validateme) {
      throw new Error(
        `@validate-me cannot be instanciated into "${
          elem.name
        }" without the $validateme instance`,
      );
    }

    const rules = binding.value || [];

    if (elem.required) {
      rules.push('required');
    }

    const field = new ValidatemeItem(elem.name, rules);

    validateme.setField(field);

    elem.addEventListener('blur', () => field.touchState(), { passive: true });
    elem.addEventListener('input', evt => field.run(evt.target.value), {
      passive: true,
    });
  },
};
