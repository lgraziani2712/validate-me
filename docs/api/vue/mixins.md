---
sidebarDepth: -1
title: Mixins
---

# Why mixins?

This approach is on purpose: **you have to explicitly determine which components are going to use this plugin**. It doesn't bloat every component's state, methods, lifecycle hooks, etc., with metadata about this plugin: less code, less execution time, less memory consumption.

# FormMixin

It injects data, watchers, lifecycle hooks and methods to the component. It also provides two functions which are internally used by `FieldMixin` to comunicate between them.

## Usage

```js
import FormMixin from '@validate-me/vue/FormMixin';

export default {
  mixins: [FormMixin],
};
```

## Public API

### validate

- Firm:

```ts
validate(): boolean;
```

1. If the form is pristine, it touches every field.
2. If the form is invalid, returns `[false]`.
3. Clears every field's warning.
4. Returns `[true, fields]` where `fields` is an object representing each field and its values.

### process

- Firm:

```ts
process(error: any): Promise<void>
```

Receives something from the server, process it using the `errorHandler` configured in the plugin, and loads every new rule.
