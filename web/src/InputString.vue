<template>
  <div>
    <h3>{{label}}</h3>
    <p>
      <input
        v-validate-me="validatemeRules"
        :name="name"
        :autofocus="autofocus"
        :required="required"
      />
    </p>
    <p>
      <span v-show="$validateme.inputHasError(name)" style="color: red">
        {{$validateme.firstError(name)}}
      </span>
      <span v-show="$validateme.inputHasWarning(name)" style="color: orange">
        {{$validateme.firstWarning(name)}}
      </span>
    </p>
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

