import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom';
import useForm, { VContext } from '@validate-me/react/useForm';

import InputColor from './inputs/InputColor';
import InputDate from './inputs/InputDate';
import InputCheckbox from './inputs/InputCheckbox';
import InputCheckboxList from './inputs/InputCheckboxList';
import InputRadioList from './inputs/InputRadioList';
import InputText from './inputs/InputText';
import InputNumber from './inputs/InputNumber';
import InputEmail from './inputs/InputEmail';
import InputSelect from './inputs/InputSelect';
import InputTextarea from './inputs/InputTextarea';

let alreadyProcessed = false;

function App() {
  const [success, setSuccess] = useState(false);
  const form = useForm();

  return (
    <div className="app">
      <form
        onSubmit={evt => {
          evt.preventDefault();

          const [success, fields] = form.validate();

          setSuccess(success);

          if (!success || alreadyProcessed) {
            return;
          }

          // eslint-disable-next-line no-console
          console.log('Persisted!', fields);

          alreadyProcessed = true;

          form.process({
            name: ['unexistingRule'],
            unexistingField: ['withInvalidRule(Wtf)'],
          });
        }}
      >
        <VContext.Provider value={form}>
          <InputSelect
            label="Select a place you want to travel to"
            name="place"
            options={{
              viedma: 'Viedma',
              caba: 'Buenos Aires',
              gavà: 'Gavà',
              kyoto: 'Kyoto',
            }}
            required
          />
          <InputTextarea label="Write what you want" name="write" />
          <InputText
            label="Name"
            name="name"
            rules={[['len', '2', '10']]}
            pattern="\D+"
            required
          />
          <InputCheckbox label="Must be Checked, plz" name="check" required />
          <InputNumber
            name="age"
            label="How old are you?"
            min={1}
            max={100}
            required
          />
          <InputEmail
            name="email"
            label="What is your e-mail?"
            multiple
            required
          />
          <InputCheckboxList
            name="ides"
            label="What IDE do you like?"
            options={{
              vscode: 'VSCode',
              intelliIdea: 'IntelliJIdea',
              sublime: 'Sublime',
              atom: 'Atom',
              vim: 'Vim',
            }}
            value={{ vscode: true, sublime: true }}
          />
          <InputRadioList
            name="bestIde"
            label="What is the best IDE for you?"
            options={{
              vscode: 'VSCode',
              intelliIdea: 'IntelliJIdea',
              sublime: 'Sublime',
              atom: 'Atom',
              vim: 'Vim',
            }}
            value="vscode"
          />
          <InputDate
            label="What day is today?"
            name="date"
            min="2018-02-24"
            max="2019-12-31"
            value="2018-02-24"
            type="date"
            required
          />
          <InputDate
            label="What time is it?"
            name="time"
            min="10:10"
            max="20:20"
            value="10:10"
            type="time"
            required
          />
          <InputDate
            label="What daytime is it?"
            name="datetime-local"
            min="2018-02-24T10:10"
            max="2019-12-31T20:20"
            value="2018-02-24T10:10"
            type="datetime-local"
            required
          />
          <InputDate
            label="What week is today?"
            name="week"
            min="2018-W02"
            max="2019-W50"
            value="2019-W50"
            type="week"
            required
          />
          <InputDate
            label="What month is today?"
            name="month"
            min="2018-02"
            max="2019-12"
            value="2019-12"
            type="month"
            required
          />
          <InputColor label="Change my color" name="color" />
        </VContext.Provider>
        <hr />
        <button>Save!</button>
        <div>Persisted? {success ? 'yes' : 'no'}</div>
      </form>
    </div>
  );
}

const rootElement = document.getElementById('react');

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement,
);
