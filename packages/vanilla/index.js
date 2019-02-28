/**
 * Connect Validateme to raw html element.
 *
 * @param {Validateme} validateme The validateme instance.
 * @param {HTMLFormElement} form The html form element.
 * @return {void}
 */
export default function vanillaConnector(validateme, form) {
  const fields = validateme.store.fields;

  Object.keys(fields).forEach(key => {
    const field = fields[key];
    const input = form[key];

    input.addEventListener('blur', () => field.touchState(), {
      once: true,
      passive: true,
    });
    input.addEventListener('input', evt => field.run(evt.target.value), {
      passive: true,
    });
  });
}
