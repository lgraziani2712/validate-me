---
sidebarDepth: 0
---

# ValidatemeDictionary

It loads the message associated to rules. It also can have message for nonexistent rules (e.g. rules server-side-only that needs an informative message).

This module can be configured once for the entire app in the main file. The following props are related to the entire ValidatemeDictionary module.

## How it works

1. If the user has setted the `clientDictionaryHandler` prop, it checks first if it exists there.
2. If the client code doesn't have that rule, it fallbacks to the default dictionary folder.
3. If the rule still doesn't exists, it fallbacks to the `_unknownRule`. Which:
  1. First tries to get it through `clientDictionaryHandler` prop.
  2. But it fallbacks to the `_unknownRule` from the library.
4. It caches the message function.

## Props

| Name                      | Type     | Required | Default  |
| ------------------------- | :------: | :------: | -------- |
| lang                      | String   | No       | `'en'`   |
| `clientDictionaryHandler` | Function | No       | Function |

### `clientDictionaryHandler(lang: String, rule: String): Promise<Module>`

This function must import the dictionary file for the specific `rule` in the specific `lang`. This module file must export by default a function with the following firm:

```
ruleName(value, ...args): String
```

#### Example

```js
const len = (value, min, max) =>
  `The value has length "${
    String(value).length
  }" but needs to be between [${min}, ${max}]`;

export default len;
```
