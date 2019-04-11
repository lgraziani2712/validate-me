import { loadRule, processRawRules } from '@validate-me/core/rules';
import { getMessage, getWarning } from '@validate-me/core/dictionary';

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
        rules: [],
      },
    };
  },
  created() {
    if (process.env.NODE_ENV !== 'production' && !this.setField) {
      throw new Error(
        '[dev-only] @validate-me: Field cannot be instanciated without an instance.',
      );
    }
    const { name, setField } = this;

    setField(name, {
      clearWarning: () => {
        this.vField.warning = '';

        return this.vField.value;
      },
      parseError: rawError => {
        const value = this.vField.value;

        return loadRule(rawError)
          .then(rule => {
            this.vField.rules.push(rule);
            this.vField.error = getMessage(rule, value);
          })
          .catch(rule => {
            this.vField.warning = getWarning(rule, value);
          });
      },
      invalid: () => Boolean(this.vField.loading || this.vField.error),
    });
  },
  methods: {
    setRules(rawRules) {
      this.vField.loading = true;

      return processRawRules(
        rawRules,
        rules => {
          this.vField.rules = rules;
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

      if (value || this.required) {
        for (const rule of this.vField.rules) {
          if (!rule.run(value)) {
            this.vField.error = getMessage(rule, value);

            return true;
          }
        }
      }
      this.vField.error = '';
    },
  },
};
