import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom';
import useForm from '@validate-me/react/useForm';

import MyAwesomeInput from './MyAwesomeInput';

const rules = ['min:0', 'max:10'];

let alreadyProcessed = false;

function App() {
  const [success, setSuccess] = useState(false);
  const [formState, form] = useForm();

  return (
    <div className="App">
      <form
        onSubmit={evt => {
          evt.preventDefault();

          const success = form.validate();

          setSuccess(success);

          if (!success || alreadyProcessed) {
            return;
          }

          alreadyProcessed = true;

          form.process({
            asd1: 'unexistingRule',
            asd2: 'min:10',
            unexistingField: 'withInvalidRule(Wtf)',
          });
        }}
      >
        <MyAwesomeInput
          form={form}
          rules={rules}
          name="asd1"
          value="12"
          type="number"
          required
        />
        <hr />
        <MyAwesomeInput
          form={form}
          rules={rules}
          name="asd2"
          value="5"
          type="number"
          required
        />
        <hr />
        <button disabled={formState.touched && formState.invalid}>Save!</button>
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
