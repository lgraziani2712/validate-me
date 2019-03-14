---
sidebarDepth: 0
---

# Plugin

It has two objectives:

1. It loads the directive globally.
2. It allows to configure the server-error-handler to be used by the form mixin.

## Props

| Name           |   Type   | Required |
| -------------- | :------: | :------: |
| `errorHandler` | Function |    No    |

### errorHandler

- Firm:

```ts
errorHandler(error: any): { [fieldName: string]: rawRule as string }
```

Processes the error sent by the server and returns the object with the fields and the failed rules.

#### Example

```js
import ValidatemePlugin from '@validate-me/vue';

Vue.use(ValidatemePlugin, {
  errorHandler(error) {
    if (error.name !== 'ValidationError') {
      throw error;
    }

    return error.failedFields;
  },
});
```
