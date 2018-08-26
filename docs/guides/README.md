---
title: Guides
---

# Introduction

WIP

## Main diferences between other solutions

### Validate-me lazy loads everything

Rules and messages won't be loaded until are required.

### Rehidrates failed rules from server

Validate-me can process an error sent by the server and instanciate the failed rules dynamically. This even makes possible to avoid configuring rules by hand in each input and let the server (in the first submit) return the failed rules.

This also eases the validation process between client and server. In a full stack JS environment, it makes possible to reuse the same validation functions in both sides.

### Warnings

Unknown rules (e.g. server-side only rules) are rendered as warning messages so the user can pay attention before submitting the form. They don't prevent submitting, they are only informative.

