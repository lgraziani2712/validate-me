---
sidebarDepth: -1
---

# useForm

## Named exports

### `setErrorHandler(handler: (error: any) => Array<RawRules>): void`

Configures the error handler for parsing the errors thrown by the server.

## Props

Does not receives any props.

## Public API

The hook returns an object with the following public functionality

### `touched: boolean`

State describing if the form is pristine or not.

### `invalid: boolean`

State describing if the form is valid or not.

### `validate(): boolean`

If the form is pristine, it touches every field.

Finally, returns `true | false`.

### `process(error: any): void`

Processes the server error and injects the new errors and warnings to every failed field.

## "Private" API

The same returned object has the following props used _only_ by `useField`.

- `setField(name: string, field: Field): void`
- `setFieldState(fields: FieldState | Array<FieldState>): void`
