import Validateme from '@validate-me/core/Validateme';
import ValidatemeItem from '@validate-me/core/ValidatemeItem';
import ValidatemeDictionary from '@validate-me/core/ValidatemeDictionary';
import ValidatemeRules from '@validate-me/core/ValidatemeRules';
import apolloErrorParser from '@validate-me/apollo-error-parser';

import dictionary from './dictionary';
import rules from './rules';

ValidatemeDictionary.setMessages(dictionary);
ValidatemeRules.setRules(rules);

const validateme = new Validateme(
  [
    new ValidatemeItem('name', {
      notEmpty: rules.notEmpty(),
      len: rules.len(0, 25),
    }),
  ],
  {
    processErrorFromServer: apolloErrorParser('ValidationError'),
  },
);

window.addEventListener('load', () => {
  const input = document.getElementById('input');
  const label = document.getElementById('label');
  const nameValidation = validateme.field('name');

  input.addEventListener('keypress', evt => {
    nameValidation.run(evt.target.value);

    if (nameValidation.hasErrors()) {
      label.innerHTML = nameValidation.firstError();
    } else if (nameValidation.hasWarnings()) {
      label.innerHTML = nameValidation.firstWarning();
    } else if (nameValidation.isSuccess()) {
      label.innerHTML = 'Success!';
    }
  });

  input.addEventListener('blur', () => {
    nameValidation.touchState();
  });
});
