---
sidebarDepth: 0
---

# Mixin

It instanciates the `Validateme` class. It must be use in the form component. Each form component has to import and set the mixin.

This approach is on purpose: **you have to explicitly determine which components are going to use this plugin**. It doesn't bloat every component's state with metadata about this plugin: less code, less execution time, less memory consumption.

## Usage

There is nothing more than importing the mixin and setting it in the component!

```js
import ValidatemeMixin from '@validate-me/vue/mixin';

export default {
  mixins: [ValidatemeMixin],
};
```
