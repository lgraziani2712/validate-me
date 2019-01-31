<template>
  <div>
    <h2>Form</h2>
    <form @submit.prevent="handleSubmit" data-cy="form">
      <InputString
        label="Name"
        :validateme-rules="['len:2:10']"
        name="name"
        v-model="personal.name"
        autofocus
        required
        data-cy="name"
      />
      <div data-cy="surname">
        <h3>Surname</h3>
        <p>
          <input
            v-validate-me
            v-model="personal.surname"
            name="surname"
            required
          />
        </p>
        <p>
          <span v-show="$validateme.hasErrors('surname')" style="color: red">
            {{ $validateme.firstError('surname') }}
          </span>
          <span
            v-show="$validateme.hasWarnings('surname')"
            style="color: orange"
          >
            {{ $validateme.firstWarning('surname') }}
          </span>
        </p>
      </div>
      <br />
      <button data-cy="submit-button" :disabled="isValid != null && !isValid">Submit form</button>
    </form>
  </div>
</template>

<script>
import ValidatemeMixin from '@validate-me/vue/mixin';

import InputString from './InputString';

export default {
  components: {
    InputString,
  },
  mixins: [ValidatemeMixin],
  data() {
    return {
      personal: {
        name: '',
        surname: '',
      },
      isValid: null,
    };
  },
  methods: {
    handleSubmit() {
      const $validateme = this.$validateme;

      this.isValid = $validateme.validate();

      if (!this.isValid) {
        return;
      }

      $validateme.process({
        name: ['unexistingMessage'],
      });
    },
  },
};
</script>
