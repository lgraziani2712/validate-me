/**
 * Connect Validateme to raw html element.
 *
 * @param {Validateme} validateme The validateme instance.
 * @param {HTMLFormElement} form The html form element.
 * @return {void}
 */
export default function vanillaConnector(validateme, form) {
  Object.keys(validateme.store.fields).forEach(key => {
    const field = validateme.store.fields[key];
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
