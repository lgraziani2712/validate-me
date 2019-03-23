<template>
  <div>
    <h2>Form</h2>
    <form autocomplete="off" @submit.prevent="handleSubmit" data-cy="form">
      <InputString
        label="Name"
        :validateme-rules="[['len', '2', '10']]"
        v-model="name"
        name="name"
        data-cy="name"
        required
      />
      <NumberRange
        label="Age"
        v-model="age"
        name="age"
        data-cy="age"
        :min="10"
        :max="12"
      />
      <Datetime
        label="What date-time is it?"
        name="datetime"
        v-model="datetime"
        min="2019-01-01T08:30"
        max="2019-04-01T08:30"
        data-cy="datetime"
      />
      <Time
        label="At what time did you have gotten up from bed?"
        v-model="time"
        name="time"
        min="00:03"
        max="23:57"
        data-cy="time"
      />
      <InputCheckbox label="Ok?" name="ok" v-model="ok" data-cy="ok" />
      <InputEmail
        label="Emails"
        name="emails"
        v-model="emails"
        pattern=".+@gmail.com"
        multiple
        data-cy="emails"
      />
      <InputCheckboxList
        v-model="ide"
        name="ides"
        label="What IDE do you like?"
        :options="['VSCode', 'IntelliJIdea', 'Sublime', 'Atom', 'Vim']"
        data-cy="ides"
      />
      <RadioList
        v-model="job"
        name="job"
        label="What job would you prefer?"
        :options="['Front-end', 'Back-end', 'UI/UX Designer', 'Data Scientist']"
        data-cy="job"
      />
      <NumberRange
        label="From 0 to 10, how much experience do you think you have?"
        v-model="exp"
        name="experience"
        data-cy="exp"
        :min="0"
        :max="10"
        range
      />
      <br />
      <button data-cy="submit-button" :disabled="touched && invalid">
        Submit form
      </button>
    </form>
  </div>
</template>

<script>
import FormMixin from '@validate-me/vue/FormMixin';

import InputString from './InputString';
import InputCheckbox from './InputCheckbox';
import NumberRange from './NumberRange';
import InputEmail from './InputEmail';
import InputCheckboxList from './InputCheckboxList';
import RadioList from './RadioList';
import Datetime from './Datetime';
import Time from './Time';

export default {
  components: {
    NumberRange,
    InputCheckbox,
    InputString,
    InputEmail,
    InputCheckboxList,
    RadioList,
    Datetime,
    Time,
  },
  mixins: [FormMixin],
  data() {
    return {
      name: 'a',
      ok: true,
      age: '',
      emails: '',
      job: '',
      exp: '5',
      datetime: '',
      time: '',
      ide: [],
    };
  },
  methods: {
    handleSubmit() {
      if (!this.validate()) {
        return;
      }

      this.process({
        name: ['unexistingRule'],
      });
    },
  },
};
</script>
