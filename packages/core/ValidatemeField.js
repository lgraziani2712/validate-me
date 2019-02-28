import { loadRule } from './ValidatemeRules';
import ValidatemeDictionary from './ValidatemeDictionary';

export default class ValidatemeField {
  constructor({ name, rules = [], value }) {
    this.name = name;
    this.rules = {};
    this.errors = [];
    this.warnings = [];
    this.state = {
      loading: false,
      touched: false,
      valid: true,
      error: false,
      warning: false,
    };
    this.value = value || '';
    this.lastValueToServer = value || '';

    rules.forEach(rawRule => {
      this.loadRule(rawRule)
        .then(({ rule, args }) => {
          this.setRule(rule.name, rule(...args));
        })
        .catch(({ rule, args }) => {
          throw new Error(
            `Unknown rule "${rule}" with args "${args.join(', ')}".`,
          );
        });
    });
  }
  setRule(name, rule) {
    this.rules[name] = {};
    this.rules[name].run = rule(this);
  }
  setArgsToRule(name, args) {
    if (!this.rules[name]) {
      throw new Error(
        `Rule "${name}" doesn't exists for the field "${this.name}".`,
      );
    }
    this.rules[name].args = args;
  }
  setSentValue() {
    this.lastValueToServer = this.value;
  }
  isValid() {
    const state = this.state;

    return !state.loading && state.touched && state.valid;
  }
  hasErrors() {
    const state = this.state;

    return !state.loading && state.touched && state.error;
  }
  hasWarnings() {
    const state = this.state;

    return !state.loading && state.touched && state.warning;
  }
  loadRule(rawRule) {
    this.state.loading = true;

    return loadRule(rawRule).finally(() => {
      this.state.loading = false;
    });
  }
  parseRawError(rawError) {
    this.loadRule(rawError)
      .then(({ rule, args }) => {
        this.setRule(rule.name, rule(...args));
        this.addError(rule.name);
      })
      .catch(rule => {
        this.addWarning(rule);
      });
  }
  addError(rule) {
    if (this.errors.includes(rule)) {
      return;
    }
    this.state.valid = false;
    this.state.error = true;

    this.errors.push(rule);
  }
  removeError(rule) {
    const indexOfError = this.errors.indexOf(rule);

    if (indexOfError !== -1) {
      this.errors.splice(indexOfError, 1);
    }

    if (!this.errors.length) {
      this.state.valid = true;
      this.state.error = false;
    }
  }
  firstError() {
    const error = this.errors[0];
    const args = this.rules[error].args || [];

    return ValidatemeDictionary.getMessage(error, this.value, args);
  }
  addWarning(rule) {
    if (!this.state.warning) {
      this.state.warning = true;
    }
    this.warnings.push(rule);
  }
  clearWarnings() {
    this.state.warning = false;
    this.warnings = [];
  }
  firstWarning() {
    const warning = this.warnings[0];

    return ValidatemeDictionary.getWarning(
      warning.rule,
      this.lastValueToServer,
      warning.args,
    );
  }
  touchState() {
    if (this.state.touched) {
      return;
    }
    this.state.touched = true;

    this.run(this.value);
  }
  run(value) {
    this.value = value;

    if (value == null || value === '') {
      if (this.rules.required) {
        this.rules.required.run(value)
          ? this.removeError('required')
          : this.addError('required');
      }

      return;
    }

    Object.keys(this.rules).forEach(key => {
      this.rules[key].run(value) ? this.removeError(key) : this.addError(key);
    });
  }
  validate() {
    if (!this.state.touched) {
      this.touchState();
    }

    return this.isValid();
  }
}
