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
    this.lastValueToServer = value || '';

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
  setSentValue() {
    this.lastValueToServer = this.value;
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
        this.warning = getWarning(rule, this.lastValueToServer);
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

    for (const rule of this.rules) {
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
