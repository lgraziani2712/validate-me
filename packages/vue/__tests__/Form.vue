<template>
  <Field
    :name="name"
    :min="min"
    :max="max"
    :rules="rules"
    :pattern="pattern"
    :required="required"
    :options="options"
  />
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
