<template>
  <section
    v-show="isActive"
    :aria-hidden="!isActive"
  >
    <slot />
  </section>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    name: VueTypes.string.isRequired,
  },
  data() {
    return {
      isActive: false,
    };
  },
};
</script>
