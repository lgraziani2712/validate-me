import { loadRule } from '@validate-me/core/rules';
import { getMessage, getWarning } from '@validate-me/core/dictionary';

function unknownRuleErrorOnInit({ name, args }) {
  throw new Error(`Unknown rule "${name}" with args "${args.join(', ')}".`);
}

export default class ValidatemeField {
  constructor({ name, rules, value }) {
    this.name = name;
    this.rules = [];

    this.error = '';
    this.warning = '';

    this.isLoading = false;
    this.isTouched = false;

    this.value = value || '';

    if (rules) {
      this.isLoading = true;

      Promise.all(rules.map(rawRule => loadRule(rawRule)))
        .then(rules => {
          this.rules = rules;
        })
        .catch(unknownRuleErrorOnInit)
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
  clearWarning() {
    this.warning = '';
  }
  isValid() {
    const { isLoading, isTouched, error } = this;

    return !isLoading && isTouched && !error;
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
    if (this.isTouched) {
      return;
    }
    this.isTouched = true;

    this.run(this.value);
  }
  run(value) {
    this.value = value;
    const rules = this.rules;

    if (value === '' && rules[0].name !== 'required') {
      this.error = '';

      return false;
    }
    for (const rule of rules) {
      if (!rule.run(value)) {
        this.error = getMessage(rule, value);

        return;
      }
    }

    this.error = '';
  }
  validate() {
    if (!this.isTouched) {
      this.touch();
    }

    return this.isValid();
  }
}
