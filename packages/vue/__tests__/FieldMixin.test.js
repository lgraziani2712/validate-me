/* eslint-disable no-console */
import { mount, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises';

import ValidatemePlugin from '../index';

import Field from './Field';

function supressVueErrors(cb) {
  const err = console.error;

  console.error = () => {};

  cb();

  console.error = err;
}

const localVue = createLocalVue();

localVue.use(ValidatemePlugin);

describe('vue/FieldMixin', () => {
  test('Tries to configures an input without a form provider', () => {
    supressVueErrors(() =>
      expect(() => {
        mount(Field, {
          localVue,
          propsData: { name: 'field', type: 'text', required: true },
        });
      }).toThrowErrorMatchingSnapshot(),
    );
  });
  test('Configures a text input and touches it', async () => {
    const setField = jest.fn();
    const app = mount(Field, {
      localVue,
      provide: { setField },
      propsData: { name: 'field', type: 'text', required: true },
    });

    await flushPromises();

    const err1 = app.vm.touch();
    const err2 = app.vm.touch();

    expect(err1).toBe(err2);
    expect(setField).toHaveBeenCalledTimes(1);
    expect(app.vm.$data).toMatchSnapshot();
  });

  test('Configures a number field and sets a value bigger than its max', async () => {
    const app = mount(Field, {
      localVue,
      provide: { setField: jest.fn() },
      propsData: { name: 'field', type: 'number', min: '1', max: '5' },
    });

    await flushPromises();

    const input = app.find('input');

    input.element.value = '15';
    input.trigger('input');

    expect(app.vm.$data).toMatchSnapshot();
  });

  test('Configures a checkbox list and checks every option', async () => {
    const options = { vscode: 'VSCode', atom: 'Atom' };
    const app = mount(Field, {
      localVue,
      provide: { setField: jest.fn() },
      propsData: { name: 'field', type: 'checkbox', options },
    });

    await flushPromises();

    const inputs = app.findAll('input');

    inputs.wrappers.forEach(input => {
      input.trigger('click');
    });
    expect(app.vm.$data).toMatchSnapshot();
  });
  test('Rehidrates an input with invalid data and touches it', async () => {
    const setField = jest.fn();
    const app = mount(Field, {
      localVue,
      provide: { setField },
      propsData: {
        name: 'field',
        type: 'text',
        pattern: '\\D+',
        value: 'a2 wsa2',
      },
    });

    await flushPromises();

    app.vm.touch();

    expect(setField).toHaveBeenCalledTimes(1);
    expect(app.vm.$data).toMatchSnapshot();
  });
});
