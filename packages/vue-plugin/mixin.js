import Validateme from '@validate-me/core/Validateme';

export default {
  data() {
    return {
      fields: {},
    };
  },
  created() {
    this.$validateme = new Validateme({
      store: this.$data,
      setField: field => {
        this.$data.fields = {
          ...this.$data.fields,
          [field.name]: field,
        };
      },
    });
  },
  methods: {
    inputHasErrorOrWarning(name) {
      const field = this.$validateme.field(name);

      return field && (field.hasErrors() || field.hasWarnings());
    },
  },
};
