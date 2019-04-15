<template>
  <LabelWrapper :label="label" :field="vField">
    <input
      v-validate-me="rules"
      :name="name"
      :value="vField.value"
      :autofocus="autofocus"
      :required="required"
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
  },
};
</script>
