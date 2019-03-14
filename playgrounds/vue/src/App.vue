<template>
  <div>
    <h2>Form</h2>
    <form autocomplete="off" @submit.prevent="handleSubmit" data-cy="form">
      <InputString
        label="Name"
        :validateme-rules="['len:2:10']"
        name="name"
        data-cy="name"
        required
      />
      <InputString label="Surname" name="surname" data-cy="surname" required />
      <br />
      <button data-cy="submit-button" :disabled="touched && invalid">
        Submit form
      </button>
    </form>
  </div>
</template>

<script>
import FormMixin from '@validate-me/vue/FormMixin';

import InputString from './InputString';

export default {
  components: {
    InputString,
  },
  mixins: [FormMixin],
  methods: {
    handleSubmit() {
      if (!this.validate()) {
        return;
      }

      this.process({
        name: 'unexistingRule',
      });
    },
  },
};
</script>
