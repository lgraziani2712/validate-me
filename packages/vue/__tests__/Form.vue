<template>
  <Field :name="name" :rules="rules" />
</template>

<script>
import VueTypes from 'vue-types';

import Field from './Field';

export default {
  components: {
    Field,
  },
  props: {
    name: VueTypes.string.isRequired,
    rules: VueTypes.arrayOf(VueTypes.arrayOf(String)),
  },
};
</script>
