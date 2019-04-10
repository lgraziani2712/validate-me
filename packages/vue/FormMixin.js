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
        if (this.fieldMethods[name]) {
          throw new Error(`Field "${name}" already exists.`);
        }

        this.fieldMethods[name] = methods;
      },
    };
  },
  created() {
    this.fieldMethods = {};
    this.touched = false;
  },
  methods: {
    process(error) {
      return processErrors(this.fieldMethods, errorHandler(error));
    },
    validate() {
      const fieldsValue = Object.values(this.fieldMethods);

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
        Object.keys(this.fieldMethods).reduce((data, key) => {
          data[key] = this.fieldMethods[key].clearWarning();

          return data;
        }, {}),
      ];
    },
  },
};
