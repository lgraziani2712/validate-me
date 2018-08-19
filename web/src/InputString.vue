<template>
  <div>
    <h3>{{label}}</h3>
    <p>
      <input
        v-validate-me="validatemeRules"
        :name="name"
        :autofocus="autofocus"
        :required="required"
        @input.passive="handleInput"
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
    label: VueTypes.string.isRequired,
    validatemeRules: VueTypes.arrayOf(String),
    autofocus: Boolean,
    required: Boolean,
  },
  computed: {
    name() {
      if (!this.$vnode.data.model) {
        throw new Error('[$validateme] v-model not found and is required.');
      }

      return this.$vnode.data.model.expression;
    },
  },
  methods: {
    handleInput(evt) {
      this.$emit('input', evt.target.value);
    }
  },
};
</script>

