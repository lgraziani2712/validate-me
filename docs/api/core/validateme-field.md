---
sidebarDepth: 3
---

# ValidatemeField

This class is responsible to run the validation, store errors and warnings, and manage the state of the field.

## Props

| Name        |          Type           | Required |
| ----------- | :---------------------: | :------: |
| props       |         Object          |   Yes    |
| props.name  |         String          |   Yes    |
| props.value |           Any           |    No    |
| props.rules | `Array<ValidatemeRule>` |    No    |

## Methods

### `setRule(name: String, rule: ValidatemeRule): void`

Adds a new rule to the collection of executable rules.

### `setArgsToRule(name: String, args: Array<String>): void`

Sometimes, a rule requires arguments. This function is only for `ValidatemeRule` functions to set arguments to the rule.

### `loadRule(rawRule: String): Promise<{ rule, args }>`

1. Processes the raw rule.
2. Requires the rule and its message to the server.
3. Returns the rule and its args.
4. If the rule doesn't exists, throw the following object: `{ rule, args }`.

### `parseRawError(rawError: String): void`

Similar to `loadRule` but it also adds the rule in the error collection. It's used when processing the errors thrown by the server.

If the rule doesn't exists, it adds it as a warning.

### `isValid(): Boolean`

Returns `true` if (1) is not loading, (2) has been touched AND (3) is valid.

### `hasErrors(): Boolean`

Returns `true` if (1) is not loading, (2) has been touched AND (3) has errors.

### `hasWarnings(): Boolean`

Returns `true` if (1) is not loading, (2) has been touched AND (3) has warnings.

### `firstError(): String`

Returns the message associated to the first failed rule.

### `firstWarning(): String`

Returns the message associated to the first warning.

### `run(value: any): void`

Execute every rule against the new value.

### `validate(): Boolean`

Touches the field and executes its rules if hasn't been touched. Then returns if it's valid or not.
