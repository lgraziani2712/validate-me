<template>
  <div>
    <h3>{{ label }}</h3>
    <label v-for="(option, key) in options" :key="key">
      <input
        v-validate-me
        :name="name"
        :value="key"
        type="radio"
        :checked="checked === key"
      />
      {{ option }}
    </label>
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
    checked: String,
    autofocus: Boolean,
  },
};
</script>
