<template>
  <label>
    <h3>{{ label }}</h3>
    <scope />
    <p style="min-height: 1.15em">
      <span v-show="field.touched && field.error" style="color: red">{{
        field.error
      }}</span>
      <span v-show="!field.error && field.warning" style="color: orange">{{
        field.warning
      }}</span>
    </p>
  </label>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    label: VueTypes.string.isRequired,
    field: VueTypes.any.isRequired,
  },
};
</script>
