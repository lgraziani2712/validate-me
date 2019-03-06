import Validateme from '@validate-me/vanilla/Validateme';
import ValidatemeField from '@validate-me/vanilla/ValidatemeField';
import vanillaConnector from '@validate-me/vanilla';

window.addEventListener('load', () => {
  const form = document.getElementById('form');
  const result = document.getElementById('result');
  const nameField = new ValidatemeField({
    name: 'name',
    rules: ['required', 'len:2:10'],
  });
  const nameInput = document.getElementsByName('name')[0];
  const validateme = new Validateme();

  vanillaConnector(nameField, validateme, nameInput);
  let first = true;

  form.addEventListener('submit', evt => {
    evt.preventDefault();

    const success = validateme.validate();

    result.innerHTML = `Validation complete: ${
      success ? 'Success!' : nameField.error || 'Loading messages...'
    }`;

    if (success && first) {
      first = false;
      validateme
        .process({
          name: 'unexistingRule',
        })
        .then(() => {
          result.innerHTML += `\n\nServer response: ${nameField.warning ||
            'Success!'}`;
        });
    }
  });
});
