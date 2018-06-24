import ValidatemeDictionary from './ValidatemeDictionary';

export default class ValidatemeItem {
  constructor(field, rules = {}) {
    this.name = field;
    this.rules = {};
    this.errors = [];
    this.warnings = [];
    this.state = {
      touched: false,
      valid: true,
      error: false,
      warning: false,
    };
    this.value = null;
    this.lastValueToServer = null;

    Object.keys(rules).forEach(key => {
      this.setRule(key, rules[key]);
    });
  }
  setRule(name, rule) {
    if (this.rules[name]) {
      throw new Error(
        `Rule "${name}" already exists for the field "${this.name}".`,
      );
    }
    this.rules[name] = {};
    this.rules[name].run = rule(this);
  }
  hasRule(name) {
    return !!this.rules[name];
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
  isSuccess() {
    return this.state.touched && this.state.valid && !this.state.warning;
  }
  hasErrors() {
    return this.state.touched && this.state.error;
  }
  hasWarnings() {
    return this.state.touched && this.state.warning;
  }
  addError(rule) {
    if (this.errors.includes(rule)) {
      return;
    }
    if (this.state.valid) {
      this.state.valid = false;
      this.state.error = true;
    }

    this.errors.push(rule);
  }
  removeError(rule) {
    const indexOfError = this.errors.indexOf(rule);

    if (indexOfError === -1) {
      return;
    }
    this.errors.splice(indexOfError, 1);

    if (!this.errors.length) {
      this.state.valid = true;
      this.state.error = false;
    }
  }
  firstError() {
    const error = this.errors[0];
    const args = this.rules[error].args || [];

    return ValidatemeDictionary.getMessage(error, this.value, ...args);
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

    // TODO: Allow a11y
    return `AVISO: ${ValidatemeDictionary.getMessage(
      warning,
      this.lastValueToServer,
    )}`;
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

    if (!this.state.touched) {
      return;
    }

    Object.values(this.rules).forEach(rule => rule.run(value, this));
  }
}
