<template>
  <div>
    <h2>Form</h2>
    <form @submit.prevent="handleSubmit">
      <InputString
        label="Name"
        :validateme-rules="['len:2:10']"
        name="name"
        v-model="personal.name"
        autofocus
        required
      />
      <div>
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
      <button>Submit form</button>
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
    };
  },
  methods: {
    handleSubmit() {
      const $validateme = this.$validateme;

      if (!$validateme.validate()) {
        return;
      }

      $validateme.process({
        name: ['unexistingMessage'],
      });
    },
  },
};
</script>
