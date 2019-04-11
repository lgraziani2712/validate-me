<template>
  <div>
    <h3>{{ label }}</h3>
    <p>
      <textarea
        v-validate-me
        :name="name"
        :value="vField.value"
        :autofocus="autofocus"
        :required="required"
      />
    </p>
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
    autofocus: Boolean,
    required: Boolean,
  },
};
</script>
