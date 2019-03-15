# Rules

::: warning

- To know how they are lazy loaded, go to the [rules](/api/core/rules.html#rules-module) documentation.
- To know how to write a custom rule, go to the [rule](/api/core/rule.html#rules) documentation.
  :::

## contains

The field must contains the substring passed as first argument.

| Parameters |  Type  |
| ---------- | :----: |
| first      | String |

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['contains:st'],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="['contains:st']" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput
  // Other props
  rules={['contains:st']}
/>
```

</Tab>
</Tabs>

## notContains

The field must _not_ contains the substring passed as first argument.

| Parameters |  Type  |
| ---------- | :----: |
| first      | String |

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['notContains:st'],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="['notContains:st']" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput
  // Other props
  rules={['notContains:st']}
/>
```

</Tab>
</Tabs>

## isAlpha

The field accepts alphabetic characters only.

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['isAlpha'],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="['isAlpha']" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput
  // Other props
  rules={['isAlpha']}
/>
```

</Tab>
</Tabs>

## isAlphanumeric

The field accepts alphabetic or numeric characters only.

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['isAlphanumeric'],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="['isAlphanumeric']" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput
  // Other props
  rules={['isAlphanumeric']}
/>
```

</Tab>
</Tabs>

## isUrl

The field only accepts well structured urls. E.g. `http://my-awesome-site.com/`.

- It doesn't accept IP's.
- It accepts subdomains and urls with query strings.

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['isUrl'],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="['isUrl']" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput
  // Other props
  rules={['isUrl']}
/>
```

</Tab>
</Tabs>

## len

The field must be a string with a length between a range.

| Parameters |  Type  | Min values |
| ---------- | :----: | ---------: |
| first      | Number |          0 |
| second     | Number |          0 |

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['len:0:15'],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="['len:0:15']" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput
  // Other props
  rules={['len:0:15']}
/>
```

</Tab>
</Tabs>

## max

The field must be a number equal or less than the argument.

| Parameters |  Type  |
| ---------- | :----: |
| first      | Number |

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['max:15'],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="['max:15']" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput
  // Other props
  rules={['max:15']}
/>
```

</Tab>
</Tabs>

## min

The field must be a number equal or greater than the argument.

| Parameters |  Type  |
| ---------- | :----: |
| first      | Number |

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['min:-15'],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="['min:-15']" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput
  // Other props
  rules={['min:-15']}
/>
```

</Tab>
</Tabs>

## required

The field must contain something.

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: ['required'],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me name="field" required />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput
  // Other props
  required
/>
```

</Tab>
</Tabs>
