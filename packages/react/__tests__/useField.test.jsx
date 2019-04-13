import React from 'react';
import { renderHook, cleanup, act } from 'react-hooks-testing-library';

import useField from '../useField';
import { VContext } from '../useForm';

const form = {
  setField: jest.fn(),
  unsetField: jest.fn(),
};

// eslint-disable-next-line react/prop-types
function FormContext({ children }) {
  return <VContext.Provider value={form}>{children}</VContext.Provider>;
}

describe('react/useField', () => {
  afterEach(() => {
    cleanup();
  });

  test('Configures a text input and updates its value', async () => {
    const props = {
      name: 'text',
      pattern: '\\w+',
      rules: [['len', '1', '5']],
    };
    const { result, waitForNextUpdate } = renderHook(
      () => useField('text', props),
      { wrapper: FormContext },
    );

    await act(waitForNextUpdate);

    // FIXME:? The rules array must change every single
    // time in order to react hook's deps trigger a re-run.
    // ALSO: The change won't re-run a new validation because rules are refs
    // and not part of the state. BTW, they were never part of the state, and
    // it follows the same behaviour as the rest of the pkgs.
    props.rules = [['len', '2', '5']];

    await act(async () => {
      result.current[1].onChange({ target: { value: 'a' } });
    });

    expect(result.current[0]).toMatchSnapshot();
  });

  test('Configures a text input and touch it', async () => {
    const props = {
      name: 'im-required',
      required: true,
    };
    const { result, waitForNextUpdate } = renderHook(
      () => useField('text', props),
      { wrapper: FormContext },
    );

    await act(waitForNextUpdate);

    act(() => {
      result.current[1].onBlur();
    });

    expect(result.current[0]).toMatchSnapshot();
  });

  test('Configures a number field and sets a value bigger than its max', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useField('number', { name: 'number', min: '1', max: '5' }),
      { wrapper: FormContext },
    );

    await act(waitForNextUpdate);
    act(() => result.current[1].onChange({ target: { value: '15' } }));

    expect(result.current[0]).toMatchSnapshot();
  });

  test('Configures a checkbox list and checks every option', async () => {
    const props = {
      name: 'checkbox',
      options: {
        vscode: 'VSCode',
        Atom: 'Atom',
      },
    };
    const { result, waitForNextUpdate } = renderHook(
      () => useField('checkbox', props),
      { wrapper: FormContext },
    );

    await act(waitForNextUpdate);
    act(() =>
      result.current[1].onChange({
        target: { defaultValue: 'vscode', checked: true },
      }),
    );
    act(() =>
      result.current[1].onChange({
        target: { defaultValue: 'atom', checked: true },
      }),
    );

    expect(result.current[0]).toMatchSnapshot();
  });
});
