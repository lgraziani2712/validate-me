<template>
  <div>
    <h2>Form</h2>
    <form autocomplete="off" @submit.prevent="handleSubmit">
      <InputSelect
        label="Select a place you want to travel to"
        name="place"
        :options="{
          viedma: 'Viedma',
          caba: 'Buenos Aires',
          gavà: 'Gavà',
          kyoto: 'Kyoto',
        }"
        required
      />
      <InputTextarea label="Write what you want" name="write" />
      <InputText
        label="Name"
        :validateme-rules="[['len', '2', '10']]"
        name="name"
        required
      />
      <InputNumberRange label="Age" name="age" :min="10" :max="12" />
      <InputDate
        label="What date-time is it?"
        name="datetime"
        type="datetime-local"
        min="2019-01-01T08:30"
        max="2019-04-01T08:30"
      />
      <InputDate
        label="At what time did you have gotten up from bed?"
        name="time"
        min="00:03"
        max="23:57"
        type="time"
      />
      <InputDate
        label="What is your birth date?"
        name="date"
        min="1989-01-01"
        max="2020-12-31"
        type="date"
      />
      <InputDate
        label="What week is today?"
        name="week"
        min="2019-W13"
        max="2019-W52"
        type="week"
      />
      <InputDate
        label="What month is today?"
        name="month"
        min="2019-02"
        max="2019-11"
        type="month"
      />
      <InputCheckbox label="Ok?" name="ok" checked />
      <InputEmail
        label="Emails"
        name="emails"
        pattern=".+@gmail\.com"
        multiple
      />
      <InputCheckboxList
        name="ides"
        label="What IDE do you like?"
        :options="{
          vscode: 'VSCode',
          intelliJIdea: 'IntelliJIdea',
          sublime: 'Sublime',
          atom: 'Atom',
          vim: 'Vim',
        }"
        :checked="{ vscode: true, atom: true }"
      />
      <InputRadioList
        name="job"
        label="What job would you prefer?"
        :options="{
          frontend: 'Front-end',
          backend: 'Back-end',
          uiUxDesigner: 'UI/UX Designer',
          dataScientist: 'Data Scientist',
        }"
        checked="uiUxDesigner"
      />
      <InputNumberRange
        label="From 0 to 10, how much experience do you think you have?"
        name="experience"
        :min="0"
        :max="10"
        range
      />
      <InputColor label="Gimme colors!" name="color" />
      <br />
      <button>Submit form</button>
    </form>
  </div>
</template>

<script>
import FormMixin from '@validate-me/vue/FormMixin';

import InputText from './inputs/InputText';
import InputTextarea from './inputs/InputTextarea';
import InputCheckbox from './inputs/InputCheckbox';
import InputNumberRange from './inputs/InputNumberRange';
import InputEmail from './inputs/InputEmail';
import InputCheckboxList from './inputs/InputCheckboxList';
import InputRadioList from './inputs/InputRadioList';
import InputDate from './inputs/InputDate';
import InputColor from './inputs/InputColor';
import InputSelect from './inputs/InputSelect';

export default {
  components: {
    InputNumberRange,
    InputCheckbox,
    InputText,
    InputTextarea,
    InputEmail,
    InputCheckboxList,
    InputRadioList,
    InputDate,
    InputColor,
    InputSelect,
  },
  mixins: [FormMixin],
  methods: {
    handleSubmit() {
      const [success, fields] = this.validate();

      if (!success) {
        return;
      }

      // eslint-disable-next-line no-console
      console.log('Persisted!', fields);

      this.process({
        name: ['unexistingRule'],
      });
    },
  },
};
</script>
