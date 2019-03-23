<template>
  <div>
    <h3>{{ label }}</h3>
    <input
      v-validate-me
      :name="name"
      :value="value"
      :min="min"
      :max="max"
      type="date"
    />
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
import { datePatterns } from '@validate-me/vue/directive';

const pattern = datePatterns.date;
const validator = {
  validator: value => pattern.test(value),
};

export default {
  mixins: [FieldMixin],
  props: {
    label: VueTypes.string.isRequired,
    autofocus: Boolean,
    min: validator,
    max: validator,
  },
};
</script>
