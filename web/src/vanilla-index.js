import Validateme from '@validate-me/core/Validateme';
import ValidatemeField from '@validate-me/core/ValidatemeField';
import ValidatemeDictionary from '@validate-me/core/ValidatemeDictionary';
import vanillaConnector from '@validate-me/vanilla';

ValidatemeDictionary.setConfig({
  clientDictionaryHandler(lang, name) {
    return import(`./dictionaries/${lang}/${name}`);
  },
});

window.addEventListener('load', () => {
  const form = document.getElementById('form');
  const result = document.getElementById('result');
  const validateme = new Validateme({
    fields: [new ValidatemeField({ name: 'name' })],
  });

  vanillaConnector(validateme, form);
  let first = true;

  form.addEventListener('submit', evt => {
    evt.preventDefault();

    if (first) {
      first = false;
      validateme.process({
        name: ['unexistingRule', 'required', 'len:0:10'],
      });
    }

    result.innerHTML = `Validation complete: ${
      validateme.validate() ? 'Success!' : 'Errors!'
    }`;
  });
});
