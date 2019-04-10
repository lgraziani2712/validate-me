---
sidebarDepth: -1
---

# useForm

## Named exports

### `VContext`

Sets the form instance into the validateme context to allow the fields to access it. It's mandatory to use it.

### `setErrorHandler(handler: (error: any) => Array<RawRules>): void`

Configures the error handler for parsing the errors thrown by the server.

## Props

Does not receives any props.

## Returns

The form instance.

#### Form instance public API

- `validate(): [boolean, Object]`: If the form is pristine, it touches every field. If the validation success, returns `[true, Object]`, where the `Object` is the representation of the inputs and its values. If the validation fails, it returns `[false]`.
- `process(error: any): void`: Processes the server error and injects the new errors and warnings to every failed field.

#### Form instance "private" API

The same object has the following props used _only_ by `useField`.

- `setField(name: string, field: Field): void`
