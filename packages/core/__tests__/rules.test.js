import { loadRule, processErrors, processRawRules, setHandler } from '../rules';
import { setConfig } from '../dictionary';

setConfig({ handler: () => Promise.reject() });

describe('core/rules', () => {
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

  test('Fails when the raw rule structure is invalid', () =>
    loadRule('old:format:as:string').catch(err =>
      expect(err).toMatchSnapshot(),
    ));

  test("Throw unexpected error on client's handler", () => {
    setHandler(async () => {
      throw new Error('Unexpected crash!');
    });

    return loadRule(['len']).catch(err => expect(err).toMatchSnapshot());
  });

  test('Process failed fields thrown by the server', () => {
    const parseError = jest.fn();

    return processErrors(
      { name: { parseError } },
      { name: ['len', '1'], unknownField: ['required'] },
    ).then(() => expect(parseError).toHaveBeenCalled());
  });
});
