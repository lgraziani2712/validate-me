<template>
  <div>
    <scope />
    <p style="min-height: 1.15em">
      <span v-show="field.touched && field.error" style="color: red">{{
        field.error
      }}</span>
      <span v-show="!field.error && field.warning" style="color: orange">{{
        field.warning
      }}</span>
    </p>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    field: VueTypes.any.isRequired,
  },
};
</script>
