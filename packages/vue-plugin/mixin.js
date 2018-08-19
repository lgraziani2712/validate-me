import Vue from 'vue';
import Validateme from '@validate-me/core/Validateme';

let serverErrorHandler;

export function setServerErrorHandler(handler) {
  serverErrorHandler = handler;
}

export default {
  provide() {
    return {
      $validateme: this.$validateme,
    };
  },
  computed: {
    fields() {
      return this.$validateme.store.fields;
    },
  },
  beforeCreate() {
    this.$validateme = new Validateme({
      serverErrorHandler,
      store: new Vue({
        data() {
          return {
            fields: {},
          };
        },
      }),
      setField(field) {
        this.store.fields = {
          ...this.store.fields,
          [field.name]: field,
        };
      },
    });
  },
};
