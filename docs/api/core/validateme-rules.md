---
sidebarDepth: 0
---

# ValidatemeRules

It loads every rule. This module can be configured once for the entire app in the main file. The following props are related to the entire ValidatemeDictionary module.

## How it works

When a rule is going to be loaded it follows the next steps:

1. If the user has setted the `clientDictionaryHandler` prop, it invokes it.
2. If the client code doesn't have that rule, it fallbacks to the default rules folder.
3. If the rule still doesn't exists, it throws an exception.

## Props

| Name                 |   Type   | Required | Default  |
| -------------------- | :------: | :------: | -------- |
| `clientRulesHandler` | Function |    No    | Function |

### `clientRulesHandler(name: String): Promise<Module>`

This function imports the file `name` which must export by default a [ValidatemeRule](./validateme-rule.html).
