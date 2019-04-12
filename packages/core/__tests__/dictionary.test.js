import { setConfig, loadMessage, getMessage, getWarning } from '../dictionary';

describe('core/dictionary', () => {
  const required = 'required';
  const unknown = 'unknown';
  const unknownRule = { name: unknown, args: [] };
  const reqRule = { name: required, args: [] };

  test('Loads an existing message twice in a row (cache must prevent two requests)', () => {
    const promise1 = loadMessage(required);
    const promise2 = loadMessage(required);

    return Promise.all([promise1, promise2]).then(() => {
      expect(getMessage(reqRule)).toMatchSnapshot();
    });
  });

  test('Tries to load an unknown message but gets an error', () =>
    loadMessage(unknown)
      .then(() => {
        throw new Error('Expect to NOT load a known rule!');
      })
      .catch(err => {
        expect(err).toMatchSnapshot();
      }));

  test('Renders a message as a warning and as an error', () => {
    expect(getWarning(reqRule)).toMatchSnapshot();
  });

  test("Returns undefined when an language doesn't have configured the `unknownRule` function", () => {
    setConfig({ lang: 'es', handler: () => Promise.reject() });

    expect(getWarning(unknownRule)).toMatchSnapshot();
  });

  test('Renders an unknown rule as a warning and error messages', () => {
    setConfig({ lang: 'en' });

    expect(getWarning(unknownRule)).toMatchSnapshot();
    expect(getMessage(unknownRule)).toMatchSnapshot();
  });
});
