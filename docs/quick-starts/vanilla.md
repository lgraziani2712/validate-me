---
title: "Quick start: Vanilla"
sidebarDepth: 0
---

## Install

```bash
# install with npm
npm install --save @validate-me/vanilla

# install with yarn
yarn add @validate-me/vanilla
```

## Use

```js
import Validateme from '@validate-me/core/Validateme';
import ValidatemeField from '@validate-me/core/ValidatemeField';
import vanillaConnector from '@validate-me/vanilla';

window.addEventListener('load', () => {
  const myForm = document.getElementById('my-form');
  const validateme = new Validateme({
    fields: [new ValidatemeField({ name: 'name' })],
  });

  vanillaConnector(validateme, myForm);

  myForm.addEventListener('submit' evt => {
    evt.preventDefault();

    if (!validateme.validate()) {
      return;
    }

    // Send data to server
});
```
