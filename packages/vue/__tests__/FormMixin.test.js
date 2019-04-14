import { mount, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises';

import { setErrorHandler } from '../FormMixin';
import ValidatemePlugin from '../index';

import Form from './Form';

const localVue = createLocalVue();

localVue.use(ValidatemePlugin, {
  errorHandler: f => f,
});

describe('vue/FormMixin', () => {
  const inputName = 'text';
  const propsData = {
    name: inputName,
    pattern: '^\\D+$',
    rules: [['len', '1', '5']],
  };

  test('Instanciates a form and validates a valid and invalid input states', async () => {
    const app = mount(Form, { localVue, propsData });

    await flushPromises();

    const input = app.find('input');

    input.element.value = 'a';
    input.trigger('input');

    expect(app.vm.validate()).toMatchSnapshot();

    input.element.value = '1';
    input.trigger('input');

    expect(app.vm.validate()).toMatchSnapshot();
  });

  test('Instanciates a form and process errors from server with(out) custom error handler', async () => {
    const app = mount(Form, { localVue, propsData });

    await flushPromises();

    await app.vm.process({ [inputName]: ['required'] });

    app.setProps({ required: true });
    app.setProps({ required: false });
    expect(app.vm.$children[0].$data).toMatchSnapshot();
    expect(app.vm.validate()).toMatchSnapshot();

    setErrorHandler(err => err.fields);
    await app.vm.process({
      code: 1,
      fields: { [inputName]: ['warningFromServer'] },
    });
    setErrorHandler(f => f);
    expect(app.vm.$children[0].$data).toMatchSnapshot();
    expect(app.vm.validate()).toMatchSnapshot();
  });
});
