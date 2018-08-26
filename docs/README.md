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

<tabs>
<tab name="vanilla">

```bash
# install with npm
npm install --save @validate-me/vanilla

# install with yarn
yarn add @validate-me/vanilla
```

</tab>
<tab name="vue">

```bash
# install with npm
npm install --save @validate-me/vue

# install with yarn
yarn add @validate-me/vue
```

</tab>
</tabs>

### Use


<tabs>
<tab name="vanilla">

```js
import Validateme from '@validate-me/core/Validateme';
import ValidatemeField from '@validate-me/core/ValidatemeField';
import vanillaConnector from '@validate-me/vanilla';

window.addEventListener('load', () => {
  const myForm = document.getElementById('my-form');
  const validateme = new Validateme({
    fields: [
      new ValidatemeField({
        name: 'name',
        rules: ['required', 'len:2:300'],
      }),
    ],
  });

  vanillaConnector(validateme, myForm);

  myForm.addEventListener('submit' evt => {
    evt.preventDefault();

    if (!validateme.validate()) {
      return;
    }

    // Send data to server
});
```

</tab>
<tab name="vue">

1. Load the plugin

```js
import ValidatemePlugin from '@validate-me/vue';

Vue.use(ValidatemePlugin);
```

2. Instanciate it through the mixin

```js
import ValidatemeMixin from '@validate-me/vue/mixin';

export default {
  mixins: [ValidatemeMixin],
  data() {
    return {
      name: '',
    };
  },
};
```

3. Configure the inputs with the directive

```html
<input
  v-validate-me
  v-model="name"
  name="name"
  required
/>
<span style="color: red">
  {{ $validateme.firstError('name') }}
</span>
<span style="color: orange">
  {{ $validateme.firstWarning('name') }}
</span>
```

</tab>
</tabs>
