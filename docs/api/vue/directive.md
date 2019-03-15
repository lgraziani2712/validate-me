---
sidebarDepth: -1
---

# `v-validate-me` directive

Its purpose is to instanciate a `ValidatemeField`.

#### You don't need to add an input listener

This directive already configures for you the event listener and emits the `input` event to the parent component.

## Value

The `v-validate-me` directive accepts an array of strings as value. Each string represents a rule. Example:

```html
<input v-validate-me="['len:0:250']" />
```

## Attributes used by the directive

| Name       |  Type   | Example         |
| ---------- | :-----: | --------------- |
| name       | String  | name="title"    |
| value      |   Any   | value="Pow pow" |
| [required] | Boolean | required        |
| type       | String  | type="number"   |

- `required` adds the `'required'` rule.
- `type` adds its value as a rule (except for "text").
