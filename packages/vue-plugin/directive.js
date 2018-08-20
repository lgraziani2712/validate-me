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

    const field = new ValidatemeItem({
      name: elem.name,
      rules,
      value: elem.value,
    });

    validateme.setField(field);

    elem.addEventListener('blur', () => field.touchState(), {
      once: true,
      passive: true,
    });
    elem.addEventListener(
      'input',
      evt => {
        const value = evt.target.value;

        field.run(value);
        vnode.context.$emit('input', value);
      },
      {
        passive: true,
      },
    );
  },
};
