import { processErrors } from '@validate-me/core/rules';

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
    };
  },
  watch: {
    fields(newFields) {
      for (const state of Object.values(newFields)) {
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
      if (this.fieldMethods[name]) {
        throw new Error(`Field "${name}" already exists.`);
      }

      this.fieldMethods[name] = methods;
    },
    updateField(name, state) {
      if (this.fields[name] === state) {
        return;
      }
      this.fields = { ...this.fields, [name]: state };
    },
    process(error) {
      return processErrors(this.fieldMethods, errorHandler(error));
    },
    validate() {
      let invalid = true;
      const fields = Object.values(this.fieldMethods);

      if (!this.touched) {
        invalid = fields.reduce(
          (invalid, field) => field.touch() || invalid,
          true,
        );

        this.touched = true;
      }
      if (invalid && this.invalid) {
        return false;
      }
      fields.forEach(field => field.clearWarning());

      return true;
    },
  },
};
