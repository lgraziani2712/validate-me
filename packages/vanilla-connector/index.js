/**
 * Injects the message into label's innerHTML attr.
 *
 * @param {ValidatemeItem} field The validateme field instance.
 * @param {HTMLElement} label The element where can be rendered the messages.
 * @return {void}
 */
function print(field, label) {
  if (!label) {
    return;
  }

  if (field.hasErrors()) {
    label.innerHTML = field.firstError();
  } else if (field.hasWarnings()) {
    label.innerHTML = field.firstWarning();
  } else if (field.isSuccess()) {
    label.innerHTML = 'Success!';
  }
}
/**
 * Connect Validateme to raw html element.
 *
 * @param {Validateme} validateme The validateme instance.
 * @param {HTMLFormElement} form The html form element.
 * @param {HTMLElement} result The element where the result is rendered.
 * @return {void}
 */
export default function vanillaConnector(validateme, form, result) {
  Object.keys(validateme.fields).forEach(key => {
    const field = validateme.fields[key];
    const input = document.getElementsByName(key)[0];
    const label = input.nextElementSibling;

    input.addEventListener('blur', () => {
      field.touchState();
    });
    input.addEventListener('change', evt => {
      field.run(evt.target.value);
    });
    field.setStateChangeHandler(() => print(field, label));
  });

  form.addEventListener('submit', evt => {
    evt.preventDefault();

    result.innerHTML = `Validation complete: ${
      validateme.isValid() ? 'Success!' : 'Errors!'
    }`;
  });
}
