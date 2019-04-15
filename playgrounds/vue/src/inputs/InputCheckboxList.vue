<template>
  <NonLabelWrapper :field="vField">
    <h3>{{ label }}</h3>
    <label v-for="(option, key) in options" :key="key">
      <input
        v-validate-me
        :name="name"
        :value="key"
        type="checkbox"
        :checked="vField.value[key]"
      />{{ option }}</label
    >
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
    options: VueTypes.objectOf(String).isRequired,
    checked: VueTypes.objectOf(Boolean).def({}),
    autofocus: Boolean,
  },
};
</script>
