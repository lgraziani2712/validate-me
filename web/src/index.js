import Validateme from '@validate-me/core/Validateme';
import ValidatemeItem from '@validate-me/core/ValidatemeItem';
import ValidatemeDictionary from '@validate-me/core/ValidatemeDictionary';
import ValidatemeRules from '@validate-me/core/ValidatemeRules';
import apolloErrorParser from '@validate-me/apollo-error-parser';
import vanillaConnector from '@validate-me/vanilla-connector';

import dictionary from './dictionary';
import rules from './rules';

ValidatemeDictionary.setMessages(dictionary);
ValidatemeRules.setRules(rules);

window.addEventListener('load', () => {
  const form = document.getElementById('form');
  const result = document.getElementById('result');
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

  vanillaConnector(validateme, form, result);
});
