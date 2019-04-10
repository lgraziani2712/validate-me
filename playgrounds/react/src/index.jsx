import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom';
import useForm from '@validate-me/react/useForm';

import InputColor from './inputs/InputColor';
import InputDate from './inputs/InputDate';
import InputCheckbox from './inputs/InputCheckbox';
import InputCheckboxList from './inputs/InputCheckboxList';
import InputRadioList from './inputs/InputRadioList';
import InputText from './inputs/InputText';
import InputNumber from './inputs/InputNumber';
import InputEmail from './inputs/InputEmail';

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
        <InputText
          form={form}
          label="Name"
          name="name"
          rules={[['len', '2', '10']]}
          required
        />
        <InputCheckbox
          form={form}
          label="Must be Checked, plz"
          name="check"
          required
        />
        <InputNumber
          form={form}
          name="age"
          label="How old are you?"
          min={1}
          max={100}
          required
        />
        <InputEmail
          form={form}
          name="email"
          label="What is your e-mail?"
          multiple
          required
        />
        <InputCheckboxList
          form={form}
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
          form={form}
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
          form={form}
          label="What day is today?"
          name="date"
          min="2018-02-24"
          max="2019-12-31"
          value="2018-02-24"
          type="date"
          required
        />
        <InputDate
          form={form}
          label="What time is it?"
          name="time"
          min="10:10"
          max="20:20"
          value="10:10"
          type="time"
          required
        />
        <InputDate
          form={form}
          label="What daytime is it?"
          name="datetime-local"
          min="2018-02-24T10:10"
          max="2019-12-31T20:20"
          value="2018-02-24T10:10"
          type="datetime-local"
          required
        />
        <InputDate
          form={form}
          label="What week is today?"
          name="week"
          min="2018-W02"
          max="2019-W50"
          value="2019-W50"
          type="week"
          required
        />
        <InputDate
          form={form}
          label="What month is today?"
          name="month"
          min="2018-02"
          max="2019-12"
          value="2019-12"
          type="month"
          required
        />
        <InputColor form={form} label="Change my color" name="color" />
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
