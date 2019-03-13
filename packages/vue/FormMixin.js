let errorHandler = f => f;

export function setErrorHandler(handler) {
  errorHandler = handler;
}

export default {
  data() {
    return {
      fields: {},
      invalid: true,
      touched: false,
    };
  },
  provide() {
    return {
      setField: this.setField,
      updateField: this.updateField,
      touchForm: this.touchForm,
    };
  },
  watch: {
    fields(newFields) {
      const fields = Object.values(newFields);

      for (const state of fields) {
        if (state) {
          this.invalid = true;

          return;
        }
      }

      this.invalid = false;
    },
  },
  created() {
    this.fieldMethods = {};
  },
  methods: {
    setField(name, methods) {
      this.fieldMethods[name] = methods;
    },
    updateField(name, state) {
      this.fields = { ...this.fields, [name]: state };
    },
    touchForm() {
      this.touched = true;
    },
    process(error) {
      const failedFieldsRules = errorHandler(error);
      const fields = this.fieldMethods;

      return Promise.all(
        Object.keys(failedFieldsRules).map(name => {
          const field = fields[name];

          if (process.env.NODE_ENV !== 'production' && !field) {
            // eslint-disable-next-line no-console
            console.warn(
              `[dev-only] @validate-me: Unknown field "${name}" while parsing errors from server.`,
            );

            return name;
          }

          return field.parseError(failedFieldsRules[name]);
        }),
      );
    },
    validate() {
      let invalid = true;
      const fields = Object.values(this.fieldMethods);

      if (!this.touched) {
        invalid = fields.reduce(
          (invalid, field) => field.touch() || invalid,
          true,
        );
      }
      if (invalid && this.invalid) {
        return false;
      }
      fields.forEach(field => field.clearWarning());

      return true;
    },
  },
};
