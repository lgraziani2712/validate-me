<template>
  <NonLabelWrapper :field="vField">
    <label>
      <input
        v-validate-me
        :name="name"
        :checked="vField.value"
        :autofocus="autofocus"
        type="checkbox"
      />
      {{ label }}
    </label>
  </NonLabelWrapper>
</template>

<script>
import VueTypes from 'vue-types';
import FieldMixin from '@validate-me/vue/FieldMixin';

import NonLabelWrapper from './wrappers/NonLabelWrapper';

export default {
  components: {
    NonLabelWrapper,
  },
  mixins: [FieldMixin],
  props: {
    label: VueTypes.string.isRequired,
    autofocus: Boolean,
    checked: Boolean,
  },
};
</script>
