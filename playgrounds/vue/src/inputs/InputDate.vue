<template>
  <LabelWrapper :label="label" :field="vField">
    <input
      v-validate-me
      :name="name"
      :value="vField.value"
      :min="min"
      :max="max"
      :type="type"
    />
  </LabelWrapper>
</template>

<script>
import VueTypes from 'vue-types';
import FieldMixin from '@validate-me/vue/FieldMixin';

import LabelWrapper from './wrappers/LabelWrapper';

const types = ['date', 'time', 'datetime-local', 'week', 'month'];

export default {
  components: {
    LabelWrapper,
  },
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
