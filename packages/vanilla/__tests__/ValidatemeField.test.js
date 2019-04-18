import flushPromises from 'flush-promises';

import vanillaConnector from '../';

const proxyHandler = () => (target, prop, val) => {
  target[prop] = val;

  return true;
};
const getInput = f => f;

describe('vanilla/ValidatemeField', () => {
  let form;

  beforeEach(() => {
    form = {
      setField: jest.fn(),
    };
  });

  test('Configures a text input and updates its value', async () => {
    const input = document.createElement('input');

    input.name = 'text';
    input.pattern = '\\D+';
    input.required = true;

    const connectMe = vanillaConnector(form, proxyHandler);
    const field = connectMe(input, getInput, [['len', '1', '5']]);

    await flushPromises();

    input.value = 'a';
    input.dispatchEvent(new Event('input'));

    await flushPromises();

    expect(field).toMatchSnapshot();
    expect(form.setField).toHaveBeenCalled();
  });

  test('Configures a number field and sets a value bigger than its max', async () => {
    const input = document.createElement('input');

    input.name = 'number';
    input.type = 'number';
    input.min = '1';
    input.max = '5';

    const connectMe = vanillaConnector(form, proxyHandler);
    const field = connectMe(input, getInput);

    await flushPromises();

    input.dispatchEvent(new Event('blur'));
    expect(field).toMatchSnapshot();

    input.value = '15';
    input.dispatchEvent(new Event('input'));

    expect(field).toMatchSnapshot();
  });

  test('Configures a checkbox field and selects it', async () => {
    const input = document.createElement('input');

    input.name = 'checkbox';
    input.type = 'checkbox';
    input.required = true;

    const connectMe = vanillaConnector(form, proxyHandler);
    const field = connectMe(input, getInput);

    await flushPromises();

    input.dispatchEvent(new Event('blur'));
    expect(field).toMatchSnapshot();

    input.checked = true;
    input.dispatchEvent(new Event('input'));

    expect(field).toMatchSnapshot();
  });

  test('Configures a radio list and selects one option', async () => {
    const options = document.createElement('div');

    options.className = 'options';
    options.dataset.name = 'ide';
    options.dataset.type = 'radio';

    const connectMe = vanillaConnector(form, proxyHandler);
    const field = connectMe(options, getInput, undefined, {
      vscode: 'VSCode',
      atom: 'Atom',
    });
    const checkbox = options.querySelector('input');

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('input'));

    expect(field).toMatchSnapshot();
  });

  test('Configures a checkbox list and checks every option', async () => {
    const options = document.createElement('div');

    options.className = 'options';
    options.dataset.name = 'ides';
    options.dataset.type = 'checkbox';

    const connectMe = vanillaConnector(form, proxyHandler);
    const field = connectMe(options, getInput, undefined, {
      vscode: 'VSCode',
      atom: 'Atom',
    });
    const checkboxes = options.querySelectorAll('input');

    checkboxes.forEach(checkbox => {
      checkbox.dispatchEvent(new Event('blur'));
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('input'));
    });

    expect(field).toMatchSnapshot();
  });

  test('Rehidrates an input with invalid data and touches it', async () => {
    const input = document.createElement('input');

    input.name = 'text';
    input.pattern = '\\D+';
    input.value = 'a2 wsa2';
    input.required = true;

    const connectMe = vanillaConnector(form, proxyHandler);
    const field = connectMe(input, getInput);

    await flushPromises();

    input.dispatchEvent(new Event('blur'));

    expect(field).toMatchSnapshot();
  });
});
