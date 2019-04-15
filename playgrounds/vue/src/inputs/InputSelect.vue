<template>
  <LabelWrapper :label="label" :field="vField">
    <select
      v-validate-me
      :name="name"
      :value="vField.value"
      :required="required"
    >
      <option value="" disabled>Select an option</option>
      <option v-for="(option, key) in options" :key="key" :value="key">{{
        option
      }}</option>
    </select>
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
    options: VueTypes.objectOf(String).isRequired,
    autofocus: Boolean,
  },
};
</script>
