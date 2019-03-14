import { loadRule } from '@validate-me/core/rules';
import { getMessage, getWarning } from '@validate-me/core/dictionary';

function unknownRuleErrorOnInit({ name, args }) {
  throw new Error(`Unknown rule "${name}" with args "${args.join(', ')}".`);
}

export default {
  inject: ['setField', 'updateField'],
  props: {
    name: { type: String, require: true },
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
      touch: () => {
        this.pristine = false;

        return this.run(this.localValue);
      },
    });
  },
  watch: {
    error(error) {
      const { name, updateField, loading } = this;

      updateField(name, Boolean(loading || error));
    },
    loading(loading) {
      const { name, updateField, error } = this;

      updateField(name, Boolean(loading || error));
    },
  },
  methods: {
    setRules(rawRules) {
      this.loading = true;

      return Promise.all(rawRules.map(rawRule => loadRule(rawRule)))
        .then(rules => {
          this.rules = rules;
        })
        .catch(unknownRuleErrorOnInit)
        .finally(() => {
          this.loading = false;
        });
    },
    run(value) {
      if (this.localValue !== value) {
        this.localValue = value;
        this.$emit('input', value);
      }

      for (const rule of this.rules) {
        if (!rule.run(value)) {
          this.error = getMessage(rule, value);

          return true;
        }
      }

      this.error = '';
    },
  },
};
