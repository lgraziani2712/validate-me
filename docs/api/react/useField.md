---
sidebarDepth: -1
---

# useField

## Props

| Name           |               Type               | Required |
| -------------- | :------------------------------: | :------: |
| props          |              Object              |   Yes    |
| props.form     |               Form               |   Yes    |
| props.name     |              string              |   Yes    |
| props.rules    |         `Array<string>`          |    No    |
| props.value    |               any                |    No    |
| props.required |             boolean              |    No    |
| props.type     | `'number' | 'checkbox' | 'date'` |    No    |

## Returns

An array of two objects

### First element: field state

| Name                |  Type   |
| ------------------- | :-----: |
| fieldState          | Object  |
| fieldState.pristine | boolean |
| fieldState.loading  | boolean |
| fieldState.error    | string  |
| fieldState.warning  | string  |

### Second element: input props

| Name                |   Type   |
| ------------------- | :------: |
| inputProps          |  Object  |
| inputProps.required | boolean  |
| inputProps.name     |  string  |
| inputProps.type     |  string  |
| inputProps.value    |   any    |
| inputProps.onChange | Function |
| inputProps.onBlur?  | Function |
