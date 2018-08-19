import Validateme from '@validate-me/core/Validateme';
import ValidatemeItem from '@validate-me/core/ValidatemeItem';
import ValidatemeDictionary from '@validate-me/core/ValidatemeDictionary';
import ValidatemeRules from '@validate-me/core/ValidatemeRules';
import vanillaConnector from '@validate-me/vanilla-connector';

ValidatemeDictionary.setConfig({
  clientDictionaryHandler: (lang, name) =>
    import(`./dictionary/${lang}/${name}`),
});
ValidatemeRules.setConfig({
  clientRulesHandler: name => import(`./rules/${name}`),
});

window.addEventListener('load', () => {
  const form = document.getElementById('form');
  const result = document.getElementById('result');
  const validateme = new Validateme([new ValidatemeItem({ name: 'name' })]);

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
