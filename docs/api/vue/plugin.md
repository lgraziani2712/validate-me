---
sidebarDepth: 0
---

# Plugin

It has two objectives:

1. It loads the directive globally.
2. It sets the server-error-handler to be used by the mixin.

## Props

| Name                 | Type     | Required |
| -------------------- | :------: | :------: |
| `serverErrorHandler` | Function | No       |

### serverErrorHandler(error): FailedFields

Processes the error sent by the server and returns the object with the fields and the failed rules.

The shape of the `FailedFields` object is:

```js
{
  field1: ['rule:arg1:..:argN'],
  // ...
  fieldN: ['rule:arg1:..:argN'],
}
```

#### Example

```js
import ValidatemePlugin from '@validate-me/vue';

Vue.use(ValidatemePlugin, {
  serverErrorHandler(error) {
    if (error.name !== 'ValidationError') {
      throw error;
    }

    return error.failedFields;
  },
});
```
