# Rules

::: warning
- To know how they are lazy loaded, go to the [ValidatemeRules](/api/core/validateme-rules.html) documentation.
- To know how to write a custom rule, go to the [ValidatemeRule](/api/core/validateme-rule.html) documentation.
:::

## contains

The field must contains the substring passed as first argument.

| Parameters | Type   |
| ---------- | :----: |
| first      | String |

### Vanilla example

```js
new ValidatemeItem({
  name: 'field',
  rules: ['contains:st'],
});
```

## notContains

The field must _not_ contains the substring passed as first argument.

| Parameters | Type   |
| ---------- | :----: |
| first      | String |

### Vanilla example

```js
new ValidatemeItem({
  name: 'field',
  rules: ['notContains:st'],
});
```

## isAlpha

The field accepts alphabetic characters only.

### Vanilla example

```js
new ValidatemeItem({
  name: 'field',
  rules: ['isAlpha'],
});
```

## isAlphanumeric

The field accepts alphabetic or numeric characters only.

### Vanilla example

```js
new ValidatemeItem({
  name: 'field',
  rules: ['isAlphanumeric'],
});
```

## isUrl

The field only accepts well structured urls. E.g. `http://my-awesome-site.com/`.

- It doesn't accept IP's.
- It accepts subdomains and urls with query strings.

### Vanilla example

```js
new ValidatemeItem({
  name: 'field',
  rules: ['isUrl'],
});
```

## len

The field must be a string with a length between a range.

| Parameters | Type   | Min values |
| ---------- | :----: | ---------: |
| first      | Number | 0          |
| second     | Number | 0          |

### Vanilla example

```js
new ValidatemeItem({
  name: 'field',
  rules: ['len:0:15'],
});
```

## max

The field must be a number equal or less than the argument.

| Parameters | Type   |
| ---------- | :----: |
| first      | Number |

### Vanilla example

```js
new ValidatemeItem({
  name: 'field',
  rules: ['max:15'],
});
```

## min

The field must be a number equal or greater than the argument.

| Parameters | Type   |
| ---------- | :----: |
| first      | Number |

### Vanilla example

```js
new ValidatemeItem({
  name: 'field',
  rules: ['min:-15'],
});
```

## required

The field must contain something.

### Vanilla example

```js
new ValidatemeItem({
  name: 'field',
  rules: ['required'],
});
```
