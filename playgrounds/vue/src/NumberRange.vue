<template>
  <div>
    <h3>{{ label }}</h3>
    <p>
      <input
        v-validate-me="numberRules"
        :name="name"
        :value="value"
        :autofocus="autofocus"
        :required="required"
        :min="min"
        :max="max"
        :type="type"
      />
    </p>
    <p style="min-height: 1.15em">
      <span v-show="!pristine && error" style="color: red">{{ error }}</span>
      <span v-show="!error && warning" style="color: orange">{{
        warning
      }}</span>
    </p>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
import FieldMixin from '@validate-me/vue/FieldMixin';

export default {
  mixins: [FieldMixin],
  props: {
    label: VueTypes.string.isRequired,
    autofocus: Boolean,
    range: Boolean,
    min: Number,
    max: Number,
  },
  computed: {
    type() {
      return this.range ? 'range' : 'number';
    },
    numberRules() {
      const rules = [];

      if (this.min) {
        rules.push(`min:${this.min}`);
      }
      if (this.max) {
        rules.push(`max:${this.max}`);
      }

      return rules;
    },
  },
};
</script>
