import React from 'react';
import { renderHook, cleanup, act } from 'react-hooks-testing-library';

import useField from '../useField';
import useForm, { setErrorHandler, VContext } from '../useForm';

function formRenderer(form) {
  // eslint-disable-next-line react/prop-types
  const FormContext = ({ children }) => (
    <VContext.Provider value={form}>{children}</VContext.Provider>
  );

  return FormContext;
}

describe('react/useForm', () => {
  const inputName = 'text';
  const props = {
    name: inputName,
    pattern: '^\\D+$',
    rules: [['len', '1', '5']],
  };
  const renderInput = FormContext =>
    renderHook(() => useField('text', props), { wrapper: FormContext });

  afterEach(() => {
    cleanup();
  });

  test('Instanciates a form and validates a valid and invalid input states', async () => {
    const { result: form } = renderHook(() => useForm());
    const FormContext = formRenderer(form.current);
    const { result: field, waitForNextUpdate: fieldWait } = renderInput(
      FormContext,
    );

    await act(fieldWait);

    act(() => {
      field.current[1].onChange({ target: { value: 'a' } });
    });
    expect(form.current.validate()).toMatchSnapshot();

    act(() => {
      field.current[1].onChange({ target: { value: '1' } });
    });
    expect(form.current.validate()).toMatchSnapshot();
  });

  test('Instanciates a form and process errors from server with(out) custom error handler', async () => {
    const { result: form } = renderHook(() => useForm());
    const FormContext = formRenderer(form.current);
    const { result: field, waitForNextUpdate: fieldWait } = renderInput(
      FormContext,
    );

    await act(fieldWait);

    await act(() => form.current.process({ [inputName]: ['required'] }));
    expect(field.current[0]).toMatchSnapshot();
    expect(form.current.validate()).toMatchSnapshot();

    await act(async () => {
      setErrorHandler(err => err.fields);
      await form.current.process({
        code: 1,
        fields: { [inputName]: ['warningFromServer'] },
      });
      setErrorHandler(f => f);
    });
    act(() => {
      field.current[1].onChange({ target: { value: 'a' } });
    });
    expect(field.current[0]).toMatchSnapshot();
    expect(form.current.validate()).toMatchSnapshot();
  });
});
