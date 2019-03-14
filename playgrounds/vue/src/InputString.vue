<template>
  <div>
    <h3>{{ label }}</h3>
    <p>
      <input
        v-validate-me="validatemeRules"
        :name="name"
        :value="value"
        :autofocus="autofocus"
        :required="required"
      />
    </p>
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
    name: VueTypes.string.isRequired,
    validatemeRules: VueTypes.arrayOf(VueTypes.string),
    autofocus: Boolean,
    required: Boolean,
  },
};
</script>
