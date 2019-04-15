<template>
  <div>
    <Field
      :name="name"
      :min="min"
      :max="max"
      :rules="rules"
      :pattern="pattern"
      :required="required"
      :options="options"
    />

    <Field
      v-if="name2"
      :name="name2"
      :min="min"
      :max="max"
      :rules="rules"
      :pattern="pattern"
      :required="required"
      :options="options"
    />
  </div>
</template>

<script>
import VueTypes from 'vue-types';

import FormMixin from '../FormMixin';

import Field from './Field';

export default {
  components: {
    Field,
  },
  mixins: [FormMixin],
  props: {
    name: VueTypes.string.isRequired,
    name2: String,
    type: String,
    min: String,
    max: String,
    pattern: String,
    required: Boolean,
    options: VueTypes.objectOf(String),
    rules: VueTypes.arrayOf(VueTypes.arrayOf(String)),
  },
};
</script>
