<template>
  <div>
    <h3>{{ label }}</h3>
    <label v-for="(option, key) in options" :key="key">
      <input v-validate-me :name="name" :value="key" type="checkbox" />{{
        option
      }}</label
    >
    <p style="min-height: 1.15em">
      <span v-show="!pristine && error" style="color: red">{{ error }}</span>
      <span v-show="!error && warning" style="color: orange">{{
        warning
      }}</span>
    </p>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import FieldMixin from '@validate-me/vue/FieldMixin';

export default {
  mixins: [FieldMixin],
  props: {
    label: VueTypes.string.isRequired,
    options: VueTypes.objectOf(String).isRequired,
    autofocus: Boolean,
  },
};
</script>
