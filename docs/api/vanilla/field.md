---
sidebarDepth: -1
---

# ValidatemeField

This class is responsible to run the validation, store errors and warnings, and manage the state of the field.

## Props

| Name        |     Type      | Required |
| ----------- | :-----------: | :------: |
| props       |    Object     |   Yes    |
| props.name  |    string     |   Yes    |
| props.rules | `Array<Rule>` |    No    |
| props.value |      any      |    No    |

## Methods

### `clearWarning(): void`

Removes the warning when the form is valid and attempts to submit.

### `valid(): boolean`

Returns `true` if (1) is not loading, (2) has been touched AND (3) is valid.

### `parseError(rawError: string): Promise<void>`

It parse the failed rule from the server and adds it to the field's rules collection. If the rule doesn't exists, it adds it as a warning.

### `touch(): void`

If the field is pristine, it touches and runs its validations.

### `run(value: any): void`

Execute every rule against the new value.

### `validate(): boolean`

If the field is pristine, it touches it. Then returns its validity state.
