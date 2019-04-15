<template>
  <LabelWrapper :label="label" :field="vField">
    <input
      v-validate-me
      :name="name"
      :value="vField.value"
      :autofocus="autofocus"
      :required="required"
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

export default {
  components: {
    LabelWrapper,
  },
  mixins: [FieldMixin],
  props: {
    label: VueTypes.string.isRequired,
    autofocus: Boolean,
    range: Boolean,
    min: Number,
    max: Number,
  },
  computed: {
    type() {
      return this.range ? 'range' : 'number';
    },
  },
};
</script>
