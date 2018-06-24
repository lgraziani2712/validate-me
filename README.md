# Validateme

> Validate me stands for the "client asking the server to validate its data"

The main objective of `Validateme` is to enforce server side validations. There's one difference between client side validation and server side validation: the first one makes the UX better, the second makes the security better. Hence the purpose of this library is to rehydrate server side validations into the client inputs.

## What are its differences against other libraries?

1. You can instanciate each validation item without specifying any rule. Once the data is sent to the server, and if it returns a validation error, `Validateme` process the error and injects the known rules into the failed fields.
2. If the server returns an error with unkown rules, it will warn the user about it.
