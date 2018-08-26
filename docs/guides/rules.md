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

<tabs>
<tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['contains:st'],
});
```

</tab>
<tab name="vue">

```html
<input v-validate-me="['contains:st']" name="field" />
```

</tab>
</tabs>

## notContains

The field must _not_ contains the substring passed as first argument.

| Parameters | Type   |
| ---------- | :----: |
| first      | String |

<tabs>
<tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['notContains:st'],
});
```

</tab>
<tab name="vue">

```html
<input v-validate-me="['notContains:st']" name="field" />
```

</tab>
</tabs>

## isAlpha

The field accepts alphabetic characters only.

<tabs>
<tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['isAlpha'],
});
```

</tab>
<tab name="vue">

```html
<input v-validate-me="['isAlpha']" name="field" />
```

</tab>
</tabs>

## isAlphanumeric

The field accepts alphabetic or numeric characters only.

<tabs>
<tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['isAlphanumeric'],
});
```

</tab>
<tab name="vue">

```html
<input v-validate-me="['isAlphanumeric']" name="field" />
```

</tab>
</tabs>

## isUrl

The field only accepts well structured urls. E.g. `http://my-awesome-site.com/`.

- It doesn't accept IP's.
- It accepts subdomains and urls with query strings.

<tabs>
<tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['isUrl'],
});
```

</tab>
<tab name="vue">

```html
<input v-validate-me="['isUrl']" name="field" />
```

</tab>
</tabs>

## len

The field must be a string with a length between a range.

| Parameters | Type   | Min values |
| ---------- | :----: | ---------: |
| first      | Number | 0          |
| second     | Number | 0          |

<tabs>
<tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['len:0:15'],
});
```

</tab>
<tab name="vue">

```html
<input v-validate-me="['len:0:15']" name="field" />
```

</tab>
</tabs>

## max

The field must be a number equal or less than the argument.

| Parameters | Type   |
| ---------- | :----: |
| first      | Number |

<tabs>
<tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['max:15'],
});
```

</tab>
<tab name="vue">

```html
<input v-validate-me="['max:15']" name="field" />
```

</tab>
</tabs>

## min

The field must be a number equal or greater than the argument.

| Parameters | Type   |
| ---------- | :----: |
| first      | Number |

<tabs>
<tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['min:-15'],
});
```

</tab>
<tab name="vue">

```html
<input v-validate-me="['min:-15']" name="field" />
```

</tab>
</tabs>

## required

The field must contain something.

<tabs>
<tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['required'],
});
```

</tab>
<tab name="vue">

```html
<input v-validate-me name="field" required />
```

</tab>
</tabs>
