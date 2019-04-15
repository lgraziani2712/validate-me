<template>
  <LabelWrapper :label="label" :field="vField">
    <textarea
      v-validate-me
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
    autofocus: Boolean,
    required: Boolean,
  },
};
</script>
