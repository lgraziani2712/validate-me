<template>
  <div>
    <h2>Form</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <h3>Name</h3>
        <div>
          <input v-validate-me="['len:2:10']" name="name" autofocus required>
          <span v-show="inputHasErrorOrWarning('name')">
            {{$validateme.firstMessageOf('name')}}
          </span>
        </div>
      </div>
      <div>
        <h3>Surname</h3>
        <div>
          <input v-validate-me name="surname" required>
          <span v-show="inputHasErrorOrWarning('surname')">
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

export default {
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
