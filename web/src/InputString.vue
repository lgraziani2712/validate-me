<template>
  <div>
    <h3>{{label}}</h3>
    <div>
      <input
        v-validate-me="validatemeRules"
        :name="name"
        :autofocus="autofocus"
        :required="required"
      >
      <span v-show="$validateme.inputHasErrorOrWarning(name)">
        {{$validateme.firstMessageOf(name)}}
      </span>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  inject: ['$validateme'],
  props: {
    name: VueTypes.string.isRequired,
    label: VueTypes.string.isRequired,
    validatemeRules: VueTypes.arrayOf(String),
    autofocus: Boolean,
    required: Boolean,
  },
}
</script>

