import ValidatemeRules from './ValidatemeRules';
import ValidatemeDictionary from './ValidatemeDictionary';

export default class ValidatemeItem {
  constructor(field, rawRules = []) {
    this.name = field;
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
    this.value = '';
    this.lastValueToServer = '';

    rawRules.forEach(rawRule => {
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
  isSuccess() {
    return !this.state.loading && this.state.touched && this.state.valid;
  }
  hasErrors() {
    return !this.state.loading && this.state.touched && this.state.error;
  }
  hasWarnings() {
    return !this.state.loading && this.state.touched && this.state.warning;
  }
  loadRule(rawRule) {
    const [rule, ...args] = rawRule.split(':');

    if (this.rules[rule]) {
      return Promise.resolve({ rule, args });
    }
    this.loading = true;

    ValidatemeDictionary.loadMessage(rule);

    return ValidatemeRules.getRule(rule)
      .then(rule => {
        this.loading = false;

        return { rule, args };
      })
      .catch(() => {
        throw { rule, args };
      });
  }
  parseRawError(rawError) {
    this.loadRule(rawError)
      .then(({ rule, args }) => {
        this.setRule(rule.name, rule(...args));
        this.addError(rule.name);
      })
      .catch(rule => {
        this.addWarning(rule.name);
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
  runRules() {
    Object.keys(this.rules).forEach(key => {
      const success = this.rules[key].run(this.value);

      if (success) {
        this.removeError(key);
      } else {
        this.addError(key);
      }
    });
  }
  run(value) {
    this.value = value;

    this.runRules();
  }
  validate() {
    if (this.state.touched) {
      return this.isSuccess();
    }

    this.state.touched = true;
    this.runRules();
  }
}
