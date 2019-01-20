<template>
  <section v-show="isActive" :aria-hidden="!isActive">
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    name: String,
  },
  mounted() {
    console.log('hola');
  },
  data() {
    return {
      isActive: false,
    };
  },
};
</script>
