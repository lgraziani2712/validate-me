import {
  // ClientRuleHandler,
  // loadRule,
  // processErrors,
  processRawRules,
  setHandler,
} from '../rules';
import { setConfig } from '../dictionary';

setHandler(() => Promise.reject());
setConfig({ handler: () => Promise.reject() });

describe('rules', () => {
  test('Processes existing raw rule successfully', () =>
    processRawRules([['required']], rules => expect(rules).toMatchSnapshot()));

  test('Fails when an unknown rule is being loaded', () =>
    processRawRules([['required'], ['unknownRule']], () => {
      throw new Error(
        'The rules where processed successfully when expected to fail',
      );
    }).catch(err => {
      expect(err).toMatchSnapshot();
    }));
});
