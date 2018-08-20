---
title: "Quick start: Vue.js"
sidebarDepth: 0
---

## Install

```bash
# install with npm
npm install --save @validate-me/vue

# install with yarn
yarn add @validate-me/vue
```

## Use

### 1. Load the plugin

```js
import ValidatemePlugin from '@validate-me/vue';

Vue.use(ValidatemePlugin);
```

### 2. Instanciate it through the mixin

```js
import ValidatemeMixin from '@validate-me/vue-plugin/mixin';

export default {
  mixins: [ValidatemeMixin],
  data() {
    return {
      name: '',
    };
  },
};
```

### 3. Configure the inputs with the directive

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
