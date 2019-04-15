import { loadRule, processRawRules } from '@validate-me/core/rules';
import { getMessage, getWarning } from '@validate-me/core/dictionary';

/**
 * @type {Vue.ComponentOptions}
 */
export default {
  inject: ['setField'],
  props: {
    name: {
      type: String,
      required: true,
    },
    value: [String, Object],
    required: Boolean,
  },
  data() {
    return {
      vField: {
        error: '',
        warning: '',
        loading: false,
        touched: false,
        value: this.value || '',
      },
    };
  },
  created() {
    if (process.env.NODE_ENV !== 'production' && !this.setField) {
      throw new Error(
        '[dev-only] @validate-me: Field cannot be instanciated without an instance.',
      );
    }
    this.ruleRunners = [];
    this.isReq = this.required;

    const { name, setField } = this;

    setField(name, {
      touch: this.touch,
      clearWarning: () => {
        this.vField.warning = '';

        return this.vField.value;
      },
      parseError: rawError => {
        const value = this.vField.value;

        return loadRule(rawError)
          .then(rule => {
            if (rule.name === 'required') {
              this.ruleRunners.unshift(rule);
              this.isReq = true;
            } else {
              this.ruleRunners.push(rule);
            }
            this.vField.error = getMessage(rule, value);
          })
          .catch(rule => {
            this.vField.warning = getWarning(rule, value);
          });
      },
      invalid: () => Boolean(this.vField.loading || this.vField.error),
    });
  },
  watch: {
    required(required) {
      this.isReq =
        required || !!this.ruleRunners.find(rule => rule.name === 'required');
    },
  },
  methods: {
    setRules(rawRules) {
      this.vField.loading = true;

      return processRawRules(
        rawRules,
        rules => {
          this.ruleRunners = rules;
        },
        () => {
          this.vField.loading = false;
        },
      );
    },
    touch() {
      if (this.vField.touched) {
        return this.vField.error;
      }

      this.vField.touched = true;

      return this.run(this.vField.value);
    },
    run(value) {
      if (this.vField.value !== value) {
        this.vField.value = value;
      }

      if (value || this.isReq) {
        for (const rule of this.ruleRunners) {
          if (!rule.run(value)) {
            return (this.vField.error = getMessage(rule, value));
          }
        }
      }
      this.vField.error = '';
    },
  },
};
