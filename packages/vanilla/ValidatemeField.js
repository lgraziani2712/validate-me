import { loadRule, processRawRules } from '@validate-me/core/rules';
import { getMessage, getWarning } from '@validate-me/core/dictionary';

export default class ValidatemeField {
  constructor(name, value, required) {
    this.name = name;

    this.error = '';
    this.warning = '';
    this.rules = [];
    this.required = required;

    this.value = value || '';
  }
  setRules(rules) {
    this.loading = true;

    return processRawRules(
      rules,
      rules => {
        this.rules = rules;
      },
      () => {
        this.loading = false;
      },
    );
  }
  clearWarning() {
    this.warning = '';

    return this.value;
  }
  valid() {
    const { loading, touched, error } = this;

    return !loading && touched && !error;
  }
  parseError(rawError) {
    return loadRule(rawError)
      .then(rule => {
        this.rules.push(rule);
        this.error = getMessage(rule, this.value);
      })
      .catch(rule => {
        this.warning = getWarning(rule, this.value);
      });
  }
  touch() {
    if (this.touched) {
      return;
    }
    this.touched = true;

    this.run(this.value);
  }
  run(value) {
    this.value = value;
    const rules = this.rules;

    if (!rules.length) {
      return;
    }

    if (value || this.required) {
      for (const rule of rules) {
        if (!rule.run(value)) {
          this.error = getMessage(rule, value);

          return;
        }
      }
    }

    this.error = '';
  }
  validate() {
    if (!this.touched) {
      this.touch();
    }

    return this.valid();
  }
}
