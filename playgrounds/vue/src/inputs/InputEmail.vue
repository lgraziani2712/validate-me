<template>
  <LabelWrapper :label="label" :field="vField">
    <input
      v-validate-me="rules"
      type="email"
      :name="name"
      :value="vField.value"
      :autofocus="autofocus"
      :required="required"
      :multiple="multiple"
      :pattern="pattern"
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
    rules: VueTypes.arrayOf(VueTypes.arrayOf(String)),
    autofocus: Boolean,
    multiple: Boolean,
    pattern: String,
  },
};
</script>
