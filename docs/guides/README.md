---
title: Guides
sidebarDepth: -1
---

# Introduction

This library tries to focus its simplicity in the communication between server and client side validation. Sometimes:

- The back-end has private validations for specific inputs and the client only render warnings.
- The data constraints changes, and instead of accepting an string length between 1 and 20 characters, it accepts between 1 and 10. And you don't want to build the client again only for that constraint change, making every client to fetch the new JS chunks.
- You don't want to keep track of every-single-validation-rule between both sides to keep the client as intuitive as possible. You only want to add the JS for only a few main rules, like required, pattern and numeric ones, and the rest to be lazy loaded only when the server returns errors related to those rules.
- You care a lot about your bundle size and your execution time because part of your clients' internet access is poor. Validate-me only loads what it needs. No message nor rules are loaded initially but only when they are required. Framework specific implementations only run in the context of an specific components, they aren't loaded as globals.
- The validation process is syncronous, hence the cost of re-run the entire form is minimal. Although rules are loaded asynchronous, validation will fail if any field has its loading state true. When the loading process finishes, the rules will be initialized with the spefic field's props and stored in the its instance.

## Main diferences between other solutions

### Validate-me lazy loads everything

Rules and messages won't be loaded until are required.

### Rehidrates failed rules from server

Validate-me can process an error sent by the server and instanciate the failed rules dynamically. This even makes possible to avoid configuring rules by hand in each input and let the server (in the first submit) return the failed rules.

This also eases the validation process between client and server. In a full stack JS environment, it makes possible to reuse the same validation functions in both sides.

### Warnings

Unknown rules (e.g. server-side only rules) are rendered as warning messages so the user can pay attention before submitting the form. They don't prevent submitting, they are only informative.

### Multiple framework implementations with the same behaviour

Changing between framework implementations has a minimal cost: adapt the code to the framework specific structure. BUT the validation process, the communication between the server and the client, rules and messages, everything will work the same.
