import { loadRule, processRawRules } from '@validate-me/core/rules';
import { getMessage, getWarning } from '@validate-me/core/dictionary';

function handleUpdate() {
  const { name, updateField, error, loading } = this;

  updateField(name, Boolean(loading || error));
}

export default {
  inject: ['setField', 'updateField'],
  props: {
    name: {
      type: String,
      required: true,
    },
    value: [String, Boolean],
    required: Boolean,
  },
  data() {
    return {
      error: '',
      warning: '',
      loading: false,
      pristine: true,
      localValue: this.value || '',
      rules: [],
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
        this.warning = '';
      },
      parseError: rawError =>
        loadRule(rawError)
          .then(rule => {
            this.rules.push(rule);
            this.error = getMessage(rule, this.localValue);
          })
          .catch(rule => {
            this.warning = getWarning(rule, this.localValue);
          }),
      touch: this.touch,
    });
  },
  watch: {
    error: handleUpdate,
    loading: handleUpdate,
  },
  methods: {
    setRules(rawRules) {
      this.loading = true;

      return processRawRules(
        rawRules,
        rules => {
          this.rules = rules;
        },
        () => {
          this.loading = false;
        },
      );
    },
    touch() {
      this.pristine = false;

      return this.run(this.localValue);
    },
    run(value) {
      if (this.localValue !== value) {
        this.localValue = value;
        this.$emit('input', value);
      }

      if (value || this.required) {
        for (const rule of this.rules) {
          if (!rule.run(value)) {
            this.error = getMessage(rule, value);

            return true;
          }
        }
      }
      this.error = '';
    },
  },
};
