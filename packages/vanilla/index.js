const oncePassive = { once: true, passive: true };
const passive = { passive: true };

/**
 * Connect Validateme to raw html element.
 *
 * @param {ValidatemeField} field The input field.
 * @param {Validateme} form The validateme instance.
 * @param {HTMLInputElement} input The input element.
 * @return {void}
 */
export default function vanillaConnector(field, form, input) {
  form.setField(field);

  input.addEventListener('blur', () => field.touch(), oncePassive);
  input.addEventListener('input', evt => field.run(evt.target.value), passive);
}
