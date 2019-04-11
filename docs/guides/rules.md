# Rules

::: warning

- To know how they are lazy loaded, go to the [rules](/api/core/rules.html#rules-module) documentation.
- To know how to write a custom rule, go to the [rule](/api/core/rule.html#rules) documentation.

:::

## color

The field must contains a sharp char and 6 hex numbers. E.g.: `#12345f`.

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: [['color']],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me name="field" type="color" />
```

</Tab>
<Tab name="react">

```jsx
function MyInputColor(props) {
  const [state, inputProps] = useField('color', props);

  return <input {...inputProps} />;
}
```

</Tab>
</Tabs>

## contains

The field must contains the substring passed as first argument.

| Parameters |  Type  |
| ---------- | :----: |
| first      | string |

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: [['contains', 'st']],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="[['contains', 'st']]" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput rules={[['contains', 'st']]} />
```

</Tab>
</Tabs>

## notContains

The field must _not_ contains the substring passed as first argument.

| Parameters |  Type  |
| ---------- | :----: |
| first      | string |

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: [['notContains', 'st']],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="[['notContains', 'st']]" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput rules={[['notContains', 'st']]} />
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
  rules: [['isAlpha']],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="[['isAlpha']]" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput rules={[['isAlpha']]} />
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
  rules: [['isAlphanumeric']],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="[['isAlphanumeric']]" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput rules={[['isAlphanumeric']]} />
```

</Tab>
</Tabs>

## pattern

The field must match the specified pattern.

| Parameters                                     |  Type  | Required |
| ---------------------------------------------- | :----: | :------: |
| (1) Pattern                                    | string |   Yes    |
| (2) RegExp Flags                               | string |    No    |
| (3) type                                       | 'mul'  |    No    |
| (4) Example (only for the dictionary function) | string |    No    |

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: [['pattern', '.+@.+']],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="[['pattern', '.+@.+']]" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput rules={[['pattern', '.+@.+']]} />
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
  rules: [['isUrl']],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="[['isUrl']]" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput rules={[['isUrl']]} />
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
  rules: [['len', '0', '15']],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="[['len', '0', '15']]" name="field" />
```

</Tab>
<Tab name="react">

```jsx
<MyAwesomeInput rules={[['len', '0', '15']]} />
```

</Tab>
</Tabs>

## number

The field must be numeric.

<Tabs>
<Tab name="vanilla">

```js
new ValidatemeItem({
  name: 'field',
  rules: [['number']],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validateme name="field" type="number" />
```

</Tab>
<Tab name="react">

```jsx
function MyInputNumber(props) {
  const [state, inputProps] = useField('number', props);

  return <input {...inputProps} />;
}
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
  rules: [['max', '15']],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="[['max', '15']]" name="field" type="number" />
```

</Tab>
<Tab name="react">

```jsx
<MyInputNumber rules={[['max', '15']]} />
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
  rules: [['min', '-15']],
});
```

</Tab>
<Tab name="vue">

```html
<input v-validate-me="[['min', '-15']]" name="field" type="number" />
```

</Tab>
<Tab name="react">

```jsx
<MyInputNumber rules={[['min', '-15']]} />
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
  rules: [['required']],
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
<MyAwesomeInput required />
```

</Tab>
</Tabs>
