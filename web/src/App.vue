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
        <p><input v-validate-me name="surname" required /></p>
        <p>
          <span v-show="$validateme.inputHasError('surname')" style="color: red">
            {{$validateme.firstError('surname')}}
          </span>
          <span v-show="$validateme.inputHasWarning('surname')" style="color: orange">
            {{$validateme.firstWarning('surname')}}
          </span>
        </p>
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
