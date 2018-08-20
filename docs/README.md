---
home: true
actionText: Quick starts →
actionLink: /quick-starts/
meta:
  - name: og:title
    content: Validate-me
  - name: og:description
    content: Input validation library
footer: MIT Licensed | Copyright © 2018-present Luciano Graziani
features:
- title: ⚡️ Blazing fast
  details: The client only loads what it needs. Stop parsing rules you won't never use!
- title: 🔌 Extensible
  details: You use Vue.js? React? Svelte? Vanilla? The core is written in ES6++ and can be used with(out) any framework!
- title: 🙅‍ No configuration
  details: Stop reading docs and testing configurations until things work. Validate-me just works™!
---

## Main diferences between other solutions

### Validate-me lazy loads everything

Rules and messages won't be loaded until are required.

### Rehidrates failed rules from server

Validate-me can process an error sent by the server and instanciate the failed rules dynamically. This even makes possible to avoid configuring rules by hand in each input and let the server (in the first submit) return the failed rules.

This also eases the validation process between client and server. In a full stack JS environment, it makes possible to reuse the same validation functions in both sides.

### Warnings

Unknown rules (e.g. server-side only rules) are rendered as warning messages so the user can pay attention before submitting the form. They don't prevent submitting, they are only informative.
