import { processErrors } from '@validate-me/core/rules';

let errorHandler = f => f;

export function setErrorHandler(handler) {
  errorHandler = handler;
}

const invalidState = [false];

export default {
  provide() {
    return {
      setField: (name, methods) => {
        if (this.fields[name]) {
          throw new Error(`Field "${name}" already exists.`);
        }

        this.fields[name] = methods;
      },
    };
  },
  created() {
    this.fields = {};
    this.touched = false;
  },
  methods: {
    process(error) {
      return processErrors(this.fields, errorHandler(error));
    },
    validate() {
      const fieldsValue = Object.values(this.fields);

      if (this.touched) {
        for (const field of fieldsValue) {
          if (field.invalid()) {
            return invalidState;
          }
        }
      } else {
        const invalid = fieldsValue.reduce(
          (invalid, field) => field.invalid() || invalid,
          false,
        );

        this.touched = true;

        if (invalid) {
          return invalidState;
        }
      }

      return [
        true,
        Object.keys(this.fields).reduce((data, key) => {
          data[key] = this.fields[key].clearWarning();

          return data;
        }, {}),
      ];
    },
  },
};
