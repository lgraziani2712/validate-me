---
home: true
actionText: Guides →
actionLink: /guides/
meta:
  - name: og:title
    content: Validate-me
  - name: og:description
    content: Input validation library
footer: MIT Licensed | Copyright © 2018-present Luciano Graziani
features:
  - title: ⚡️ Blazing fast
    details: The client only loads what it needs. Stop parsing rules you won't never use!
  - title: 🔌 Extensible
    details: You use Vue.js? React? Svelte? Vanilla? The core is written in ES6++ and can be used with(out) any framework!
  - title: 🙅‍ No configuration
    details: Stop reading docs and testing configurations until things work. Validate-me just works™!
---

## Quick start

### Install

<Tabs>
<Tab name="vanilla">

```bash
# install with npm
npm install --save @validate-me/vanilla

# install with yarn
yarn add @validate-me/vanilla
```

</Tab>
<Tab name="vue">

```bash
# install with npm
npm install --save @validate-me/vue

# install with yarn
yarn add @validate-me/vue
```

</Tab>
<Tab name="react">

```bash
# install with npm
npm install --save @validate-me/react

# install with yarn
yarn add @validate-me/react
```

</Tab>
</Tabs>

### Use

<Tabs>
<Tab name="vanilla">

```js
import Validateme from '@validate-me/vanilla/Validateme';
import ValidatemeField from '@validate-me/vanilla/ValidatemeField';
import vanillaConnector from '@validate-me/vanilla';

window.addEventListener('load', () => {
  const myForm = document.getElementById('my-form');
  // 1. Create the form object
  const validateme = new Validateme();
  // 2. Create each field object
  const nameField = new ValidatemeField({
    name: 'name',
    rules: ['required', 'len:2:10'],
  });
  const nameInput = document.getElementsByName('name')[0];

  // 3. Add the field to the form. Add input listeners to the input.
  vanillaConnector(nameField, validateme, nameInput);

  // 4. Listen to the submit action
  myForm.addEventListener('submit', evt => {
    evt.preventDefault();

    if (!validateme.validate()) {
      return;
    }

    // Send data to server
    // ...
    // And if the server returns new invalid rules...
    const errorsFromServer = {
      name: 'isAlpha',
    };
    validateme.process(errorsFromServer);
});
```

</Tab>
<Tab name="vue">

1. Load the plugin

```js
import ValidatemePlugin from '@validate-me/vue';

Vue.use(ValidatemePlugin);
```

2. Instanciate the form mixin in the form component

```html
<form autocomplete="off" @submit.prevent="handleSubmit">
  <MyAwesomeInput
    :validateme-rules="['len:2:10']"
    name="name"
    v-model="name"
    required
  />
  <button :disabled="touched && invalid">
    Submit form
  </button>
</form>
```

```js
import FormMixin from '@validate-me/vue/FormMixin';

import MyAwesomeInput from './MyAwesomeInput';

export default {
  components: [MyAwesomeInput],
  mixins: [FormMixin],
  data() {
    return {
      name: '',
    };
  },
  methods: {
    handleSubmit() {
      if (!this.validate()) {
        return;
      }

      // Send data to server
      // ...
      // And if the server returns new invalid rules...
      const errorsFromServer = {
        name: 'isAlpha',
      };

      this.process(errorsFromServer);
    },
  },
};
```

3. Instanciate the input mixin

```html
<input
  v-validate-me="['len:2:10']"
  :name="name"
  :value="value"
  :autofocus="autofocus"
  :required="required"
/>
```

```js
import VueTypes from 'vue-types';
import FieldMixin from '@validate-me/vue/FieldMixin';

export default {
  mixins: [FieldMixin],
  props: {
    name: VueTypes.string.isRequired,
    value: String,
    validatemeRules: VueTypes.arrayOf(VueTypes.string),
    autofocus: Boolean,
    required: Boolean,
  },
};
```

</Tab>
<Tab name="react">

::: warning
This implementation is written with hooks.
It works with `react@^16.8.0`
:::

1. Import the form hook:

```jsx
import React from 'react';
import useForm from '@validate-me/react/useForm';

export default function MyAwesomeForm() {
  const form = useForm();

  return (
    <form
      onSubmit={evt => {
        evt.preventDefault();

        if (!form.validate()) {
          return;
        }

        // Send data to server
        // ...
        // And if the server returns new invalid rules...
        const errorsFromServer = {
          name: 'isAlpha',
        };

        form.process(errorsFromServer);
      }}
    >
      <MyAwesomeInput form={form} rules={['len:2:10']} name="name" required />
      <button disabled={form.touched && form.invalid}>Submit form</button>
    </form>
  );
}
```

2. Import the field hook:

```jsx
import React from 'react';
import useInput from '@validate-me/react/useInput';

export default function MyAwesomeInput(props) {
  const [inputState, inputProps] = useInput(props);

  return <input {...inputProps} />;
}
```

</Tab>
</Tabs>
