import Validateme from '@validate-me/core/Validateme';
import ValidatemeField from '@validate-me/core/ValidatemeField';
import vanillaConnector from '@validate-me/vanilla';

window.addEventListener('load', () => {
  const form = document.getElementById('form');
  const result = document.getElementById('result');
  const fieldName = 'name';
  const validateme = new Validateme({
    fields: [new ValidatemeField({ name: fieldName, rules: ['len:1:10'] })],
  });

  vanillaConnector(validateme, form);
  let first = true;

  form.addEventListener('submit', evt => {
    evt.preventDefault();

    if (first) {
      first = false;
      validateme.process({
        name: ['unexistingRule', 'required'],
      });
    }

    const errorMessage = validateme.hasErrors(fieldName)
      ? validateme.firstError(fieldName)
      : '';

    result.innerHTML = `Validation complete: ${
      validateme.validate() ? 'Success!' : errorMessage || 'Loading messages...'
    }`;
  });
});
