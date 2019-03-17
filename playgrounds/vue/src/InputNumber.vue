<template>
  <div>
    <h3>{{ label }}</h3>
    <p>
      <input
        v-validate-me
        :name="name"
        :value="value"
        :autofocus="autofocus"
        :required="required"
        type="number"
        :min="min"
        :max="max"
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
    autofocus: Boolean,
    min: Number,
    max: Number,
  },
};
</script>
