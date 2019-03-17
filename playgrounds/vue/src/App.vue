<template>
  <div>
    <h2>Form</h2>
    <form autocomplete="off" @submit.prevent="handleSubmit" data-cy="form">
      <InputString
        label="Name"
        :validateme-rules="['len:2:10']"
        v-model="name"
        name="name"
        data-cy="name"
        required
      />
      <InputNumber
        label="Age"
        v-model="age"
        name="age"
        data-cy="age"
        :min="10"
        :max="12"
      />
      <InputCheckbox label="Ok?" name="ok" v-model="ok" data-cy="ok" />
      <InputEmail
        label="Emails"
        name="emails"
        v-model="emails"
        pattern=".+@gmail.com"
        multiple
      />
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
import InputCheckbox from './InputCheckbox';
import InputNumber from './InputNumber';
import InputEmail from './InputEmail';

export default {
  components: {
    InputNumber,
    InputCheckbox,
    InputString,
    InputEmail,
  },
  mixins: [FormMixin],
  data() {
    return {
      name: 'a',
      ok: true,
      age: '',
      emails: '',
    };
  },
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
