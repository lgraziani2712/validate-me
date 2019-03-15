# @validate-me/react

React version of `validate-me`.

> validate-me stands for "client asking the server to validate its data"

The main objective of `validate-me` is to enforce server side validations. There's one difference between client side validation and server side validation: the first one makes the UX better, the second makes the security better. Hence the purpose of this library is to rehydrate server side validations into the client inputs.

## Why I would use this library instead of X or Y?

1. You can instanciate each validation field without specifying any rule. Once the data is sent to the server, and if it returns a validation error, `Validateme` process the error and injects the known rules into the failed fields.
2. If the server returns an error with unkown rules, it will warn the user about it.

## 🚀 Roadmap

We still have a _long road to go_, this is just the beginning. So to further improve **validate-me** we've created a roadmap so that you can see the next features and improvements and **give your feedback about**:

<a href="https://validate-me.canny.io/feature-requests" target="_blank">
  <img src="https://cdn-std.dprcdn.net/files/acc_649651/ogSCYY" alt="Validateme Roadmap" width="300">
</a>
