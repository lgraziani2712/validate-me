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
      <InputDate
        label="What date-time is it?"
        name="datetime"
        v-model="datetime"
        min="2019-01-01T08:30"
        max="2019-04-01T08:30"
        type="datetime-local"
        data-cy="datetime"
      />
      <InputDate
        label="At what time did you have gotten up from bed?"
        v-model="time"
        name="time"
        min="00:03"
        max="23:57"
        type="time"
        data-cy="time"
      />
      <InputDate
        label="What is your birth date?"
        v-model="date"
        name="date"
        min="1989-01-01"
        max="2020-12-31"
        type="date"
        data-cy="date"
      />
      <InputDate
        label="What week is today?"
        v-model="week"
        name="week"
        min="2019-W13"
        max="2019-W52"
        type="week"
        data-cy="week"
      />
      <InputDate
        label="What month is today?"
        v-model="month"
        name="month"
        min="2019-02"
        max="2019-11"
        type="month"
        data-cy="month"
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
      <Color
        label="Gimme colors!"
        v-model="color"
        name="color"
        data-cy="color"
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
import InputDate from './InputDate';
import Color from './Color';

export default {
  components: {
    NumberRange,
    InputCheckbox,
    InputString,
    InputEmail,
    InputCheckboxList,
    RadioList,
    InputDate,
    Color,
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
      date: '',
      week: '',
      month: '',
      color: '',
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
