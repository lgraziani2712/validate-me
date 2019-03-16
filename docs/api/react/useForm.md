---
sidebarDepth: -1
---

# useForm

## Named exports

### `setErrorHandler(handler: (error: any) => Array<RawRules>): void`

Configures the error handler for parsing the errors thrown by the server.

## Props

Does not receives any props.

## Returns

An array of two objects

### First element: form state

| Name         |  Type   |
| ------------ | :-----: |
| form         | Object  |
| form.touched | boolean |
| form.invalid | boolean |

### Second element: methods

#### Public API

- `validate(): boolean`: If the form is pristine, it touches every field. Finally, returns `true | false`.
- `process(error: any): void`: Processes the server error and injects the new errors and warnings to every failed field.

#### "Private" API

The same object has the following props used _only_ by `useField`.

- `setField(name: string, field: Field): void`
- `setFieldState([name: string, state: boolean]): void`
