<template>
  <div>
    <input v-validate-me name="name" required>
    <span v-show="inputHasError('name')">
      {{$validateme.firstErrorOf('name')}}
    </span>
  </div>
</template>

<script>
import ValidatemeMixin from '@validate-me/vue-plugin/mixin';

export default {
  mixins: [ValidatemeMixin],
};
</script>
