---
sidebarDepth: 0
---

# ValidatemeRule

1. Each rule has to be in separated files with the same name as the rule.
2. They have to export a function with the name of the rule.

## Firm

```
ruleName(args: Array<String>): (instance: ValidatemeField => (rawValue: any => Boolean))
```

This function has currying because each function is invoked in diffent times:

1. It sets the args before knowing the `ValidateField` instance.
2. It receives the `ValidateField` for only one possible thing: to invoke `setArgsToRule` with the args.
3. The actual function which evaluates the new value.

## Examples

### Example without setting args

```js
const required = () => () => value =>
  value !== undefined && value !== null && value !== '';

export default required;
```

### Example using the `setArgsToRule` method

```js
const len = (min, max) => instance => {
  instance.setArgsToRule('len', [min, max]);

  return rawValue => {
    const value = String(rawValue);

    return value === '' || (min <= value.length && value.length <= max);
  };
};

export default len;
```
