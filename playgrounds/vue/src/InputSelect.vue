<template>
  <div>
    <h3>{{ label }}</h3>
    <select
      v-validate-me
      :name="name"
      :value="vField.value"
      :required="required"
    >
      <option value="" disabled>Select an option</option>
      <option v-for="(option, key) in options" :key="key" :value="key">{{
        option
      }}</option>
    </select>
    <p style="min-height: 1.15em">
      <span v-show="vField.touched && vField.error" style="color: red">{{
        vField.error
      }}</span>
      <span v-show="!vField.error && vField.warning" style="color: orange">{{
        vField.warning
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
