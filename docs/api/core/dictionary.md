---
sidebarDepth: 0
---

# Dictionary

It loads the message associated to rules. It also can have messages for nonexistent rules (e.g. rules that run server-side-only but need an informative message).

This module provides a function to configure it once for the entire app in the main file.

## How it works

1. If the user has setted the `clientHandler` prop through the `setConfig` function, it invokes it.
2. If the client code doesn't have that rule, it fallbacks to the default dictionary folder.
3. If the rule still doesn't exists, it fallbacks to the `_unknownRule`. Which:
   1. First tries to get it through `clientHandler` prop.
   2. Or it fallbacks to the `_unknownRule` from the library.
4. It caches the message function.

## Exports

| Name          |   Type   | Used by end user |
| ------------- | :------: | :--------------: |
| `setConfig`   | Function |       Yes        |
| `getWarning`  | Function |        No        |
| `getMessage`  | Function |        No        |
| `loadMessage` | Function |        No        |

### setConfig

- Firm:

```ts
setConfig(config: {
  lang?: string = 'en',
  handler: (lang: string, name: string) => Promise<Module>,
}): void
```

The `handler` prop must import the dictionary file for the specific `rule` in the specific `lang`. Each of the imported files must export by default a function with the following firm:

```ts
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

### getWarning

- Firm:

```ts
getWarning(
  rule: { name: string, args: Array<string> },
  value: string,
): string
```

Used by every packages. It receives an unknown rule's name and args, and returns an informative message.

### getMessage

- Firm:

```ts
getMessage(
  rule: { name: string, args: Array<string> },
  value: string,
): string
```

Used by every packages. It receives a known rule's name and args, and returns an informative message.

### loadMessage

- Firm:

```ts
loadMessage(name: string): Promise<void>
```

Used by every packages. It receives the name of the rule's message to be loaded. It loads it and caches it.
