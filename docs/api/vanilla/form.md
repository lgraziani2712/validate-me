---
sidebarDepth: 3
---

# Validateme

It's the main class. Offers the interface between fields and plugins/client code.

## Props

| Name                 |           Type           | Required |
| -------------------- | :----------------------: | :------: |
| fields               | `Array<ValidatemeField>` |    No    |
| store                |     `{ fields: {} }`     |    No    |
| `setField`           |         Function         |    No    |
| `serverErrorHandler` |         Function         |    No    |

### `setField(field: ValidatemeField): void`

Adds a new field. It throws an error if the field name already exists in the fields collection.

### `serverErrorHandler(error): FailedFields`

Processes the error sent by the server and returns the object with the fields and the failed rules.

The shape of the `FailedFields` object is:

```js
{
  field1: ['rule:arg1:..:argN'],
  // ...
  fieldN: ['rule:arg1:..:argN'],
}
```

## Methods

### `field(name: String): ?ValidatemeField`

Returns a `ValidatemeField` if it exists, or `undefined` if not.

### `isValid(name: String): Boolean`

If the field exists and is valid, returns `true`. Otherwise, `false`.

### `hasErrors(name: String): Boolean`

If the field exists and has errors, returns `true`. Otherwise, `false`.

### `hasWarnings(name: String): Boolean`

If the field exists and has warnings, returns `true`. Otherwise, `false`.

### `firstError(name: String): String`

If the field exists and has errors, returns the first one. Otherwise, empty string.

### `firstWarning(name: String): String`

If the field exists and has warnings, returns the first one. Otherwise, empty string.

### `process(error: Error): void`

Processes the server error and injects the new errors and warnings to every failed field.

### `validate(): Boolean`

It validates every field and returns `true` if everyone are correct. Otherwise, `false`.
