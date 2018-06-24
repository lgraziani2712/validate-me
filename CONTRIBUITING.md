# Contribute to dimax-scripts

The following rules will make easier to review PR's. Please, follow them so we all can have a better developer experience.

Thank you!

## Installation

This project uses [Yarn](https://yarnpkg.com/en/) and [lerna](https://github.com/lerna/lerna) to manage this repo and each of the packages. It's mandatory to use Yarn instead of NPM, since we are using [Yarn's workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) to manage this monorepo.

### Minimum requirements

- NodeJS 8 or superior.
- Yarn latest stable.

### How to publish

For contribuitors with publish permissions, follow this steps:

1. `[One time only]` Login permanently into NPM with this command: `npm adduser`. It creates an NPM user if not exists.
2. `yarn lerna publish [--npm-tag=next]`.

**NOTE**: Use `--npm-tag=next` only for alpha/beta releases. Without the tag uses latest.

If, for some reason, lerna fails, but the commit was made, do the following:

1. Report the bug and copy the `lerna-debug.log` file.
2. Try to publish with the command that lerna tried to do (it will be written in the `lerna-debug.log` file). If for some reason that fails too:
  1. Add the console log to the issue.
  2. Revert the commits made by lerna.

### How to generate changelog

To be able to use the `yarn run changelog` command, you'll need to set `GITHUB_AUTH` env variable with a GitHub API personal access token configured with the `repo` scope for _private repositories_ or just `public_repo` scope for _public repositories_. Follow this steps:

1. Access to https://github.com/settings/tokens.
2. Generate a new token with the `repo` scope for _private repositories_ or just `public_repo` scope for _public repositories_.
3. Copy the new token.
4. Create an .env file in the root folder of this project.
5. Add the `GITHUB_AUTH` variable with the value of the token.

## Common lerna commands

### Add, update or remove a dependency from a package

```sh
yarn run lerna add {dependency-name} [--dev] --scope={@dimax-ar/package-name}
```

## CI Configuration

### Skip CI

When is not necessary to execute the CI in a commit it needs be added `[ci skip]` to the commit description or title.

## Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally
- Consider starting the commit message with an applicable emoji:
  - 🎨 when improving the format/structure of the code
  - 🏇 when improving performance
  - 📝 when writing docs
  - 🚀 when adding new feature
  - 🐛 when fixing a bug
  - 🔥 when removing code or files
  - ⚙️ when refactoring code
  - 💚 when fixing the CI build
  - ✅ when adding tests
  - 🆕 when added new dependencies
  - ⬆ when upgrading dependencies
  - ⬇ when downgrading dependencies
  - 🗑️ when removing dependencies
  - 👕 when removing linter warnings
