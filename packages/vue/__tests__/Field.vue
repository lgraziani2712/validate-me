<template>
  <input
    v-if="!options"
    v-validate-me="rules"
    :name="name"
    :type="type"
    :min="min"
    :max="max"
    :value="vField.value"
    :required="required"
  />
  <div v-else>
    <label v-for="(option, key) in options" :key="key">
      <input
        v-validate-me
        :name="name"
        :type="type"
        :value="key"
        :checked="vField.value[key]"
      />
      {{ option }}
    </label>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

import FieldMixin from '../FieldMixin';

export default {
  mixins: [FieldMixin],
  props: {
    type: String,
    min: String,
    max: String,
    options: VueTypes.objectOf(String),
    rules: VueTypes.arrayOf(VueTypes.arrayOf(String)),
  },
};
</script>
