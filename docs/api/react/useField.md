---
sidebarDepth: -1
---

# useField

## Props

| Name           |       Type        | Required |
| -------------- | :---------------: | :------: |
| props          |      Object       |   Yes    |
| props.name     |      string       |   Yes    |
| props.rules    | `Array<string[]>` |    No    |
| props.value    |        any        |    No    |
| props.min      |      number       |    No    |
| props.max      |      number       |    No    |
| props.pattern  |      string       |    No    |
| props.multiple |      boolean      |    No    |
| props.required |      boolean      |    No    |
| props.type     |      string       |    No    |
| props.options  |      Object       |    No    |

## Returns

An array of two objects

### First element: field state

| Name                |  Type   |
| ------------------- | :-----: |
| fieldState          | Object  |
| fieldState.value    |   any   |
| fieldState.pristine | boolean |
| fieldState.loading  | boolean |
| fieldState.error    | string  |
| fieldState.warning  | string  |

### Second element: input props

| Name                 |            Type            |
| -------------------- | :------------------------: |
| inputProps           |           Object           |
| inputProps.required  |          boolean           |
| inputProps.name      |           string           |
| inputProps.type      |           string           |
| inputProps.value     |            any             |
| inputProps.checked   | boolean \| Object<boolean> |
| inputProps.min?      |           number           |
| inputProps.max?      |           number           |
| inputProps.pattern   |           string           |
| inputProps.multiple? |          boolean           |
| inputProps.onChange  |          Function          |
| inputProps.onBlur?   |          Function          |
