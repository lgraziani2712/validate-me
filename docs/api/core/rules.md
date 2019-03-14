---
sidebarDepth: 0
---

# Rules

1. Each rule has to be in separated files with the same name as the rule.
2. They have to export a function with the name of the rule.
3. They only have to test their specific behaviour. Every rule its considered optional except for the `required` rule.

## Firm

```ts
function ruleName(args?: Array<String>): (rawValue: any) => Boolean;
```

This function has currying because each function is invoked in diffent times:

1. It sets the (args?) before associate it to the field.
2. The actual function which evaluates the new value.

## Examples

### Example without setting args

```js
const required = () => value => value !== '';

export default required;
```

### Example using args

```js
const len = (min, max) => value => min <= value.length && value.length <= max;

export default len;
```

---

# Rules module

This one provides the functionality to load rules. It offers a function to load custom rules which can be configured once for the entire app in the main file.

## How it works

When a rule is going to be loaded it follows these steps:

1. If the user has setted the `clientHandler` prop through the `setHandler` exported function, it invokes it.
2. If the client code doesn't have that rule, it fallbacks to the default rules folder.
3. If the rule still doesn't exists, it throws an exception.
4. It caches the base rule's function (allowing to load it again with new args).

## Exports

| Name            |   Type   | Used by end user |
| --------------- | :------: | :--------------: |
| `setHandler`    | Function |       Yes        |
| `processErrors` | Function |        No        |
| `loadRule`      | Function |        No        |

### setHandler

- Firm:

```ts
setHandler(newHandler: (name: String) => Promise<Module>): void
```

This function sets `newHandler` as the new `clientHandler`.

### processErrors

- Firm:

```ts
processErrors(
  fields: Array<Field>,
  failedFields: { [fieldName: string]: RawRule as string },
): Promise<void>
```

Used by every package. Is called when the server side validation fails and returns which fields failed which rules. These new rules need to be loaded.

### loadRule

- Firm:

```ts
loadRule(
  rawRule: string,
): Promise<{
  name: string,
  run: (rawValue: any) => boolean,
  args: Array<string>,
}>
```

Used by every package. It's called when the input's rules prop change dinamically or when parsing new rules thrown by the server.
