import VueTypes from 'vue-types';
import { loadRule } from '@validate-me/core/rules';
import { getMessage, getWarning } from '@validate-me/core/dictionary';

function unknownRuleErrorOnInit({ name, args }) {
  throw new Error(`Unknown rule "${name}" with args "${args.join(', ')}".`);
}

export default {
  inject: ['setField', 'updateField', 'touchForm'],
  props: {
    name: VueTypes.string.isRequired,
  },
  data() {
    return {
      error: '',
      warning: '',
      loading: false,
      pristine: true,
      value: '',
      valueSent: '',
      rules: [],
    };
  },
  created() {
    if (process.env.NODE_ENV !== 'production' && !this.setField) {
      throw new Error(
        `[dev-only] @validate-me: Field cannot be instanciated without an instance`,
      );
    }
    const { name, setField, setSentValue, parseError, touch } = this;

    setField(name, { setSentValue, parseError, touch });
  },
  watch: {
    error(error) {
      const { name, updateField, loading } = this;

      updateField(name, Boolean(loading || error));
    },
    pristine(pristine) {
      if (!pristine) {
        this.touchForm();
      }
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
    setSentValue() {
      this.valueSent = this.value;
      this.warning = '';
    },
    parseError(rawError) {
      return loadRule(rawError)
        .then(rule => {
          this.rules.push(rule);
          this.error = getMessage(rule, this.value);
        })
        .catch(rule => {
          this.warning = getWarning(rule, this.valueSent);
        });
    },
    touch() {
      if (!this.pristine) {
        return;
      }
      this.pristine = false;

      return this.run(this.value);
    },
    run(value) {
      this.value = value;

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
