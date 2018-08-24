# Rules

  > Every rule follows the next structure when using it: `rule:arg1:arg2:..:argN`.

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
