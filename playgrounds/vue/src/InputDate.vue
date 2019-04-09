<template>
  <div>
    <h3>{{ label }}</h3>
    <input
      v-validate-me
      :name="name"
      :value="value"
      :min="min"
      :max="max"
      :type="type"
    />
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

const types = ['date', 'time', 'datetime-local', 'week', 'month'];

export default {
  mixins: [FieldMixin],
  props: {
    label: VueTypes.string.isRequired,
    autofocus: Boolean,
    min: String,
    max: String,
    type: {
      validator: type => types.includes(type),
      required: true,
    },
  },
};
</script>
