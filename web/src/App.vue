<template>
  <div>
    <h2>Form</h2>
    <form @submit.prevent="handleSubmit">
      <input-string
        label="Name"
        name="name"
        :validateme-rules="['len:2:10']"
        autofocus
        required
      />
      <div>
        <h3>Surname</h3>
        <div>
          <input v-validate-me name="surname" required>
          <span v-show="$validateme.inputHasErrorOrWarning('surname')">
            {{$validateme.firstMessageOf('surname')}}
          </span>
        </div>
      </div>
      <br>
      <button>Submit form</button>
    </form>
  </div>
</template>

<script>
import ValidatemeMixin from '@validate-me/vue-plugin/mixin';

import InputString from './InputString';

export default {
  components: {
    InputString,
  },
  mixins: [ValidatemeMixin],
  methods: {
    handleSubmit() {
      if (!this.$validateme.validate()) {
        return;
      }
      this.$validateme.beforeSendToServer();

      console.log(this.$validateme.data());

      this.$validateme.process({
        name: ['unexistingRule'],
      });
    },
  },
};
</script>
