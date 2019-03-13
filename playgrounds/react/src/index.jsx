import React, { useContext, useState, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import ValidatemeForm, {
  SubmittableForm,
} from '@validate-me/react/ValidatemeForm';

import MyAwesomeInput from './MyAwesomeInput';

const validations = ['min:0', 'max:10'];

function Button() {
  const canSubmit = useContext(SubmittableForm);

  return <button disabled={!canSubmit}>Guardar!</button>;
}

let alreadyProcessed = false;

function App() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <ValidatemeForm
        onSubmit={(success, processError) => {
          setSuccess(success);

          if (!success || alreadyProcessed) {
            return;
          }

          alreadyProcessed = true;

          processError({
            asd1: 'unexistingRule',
            unexistingField: 'withInvalidRule(Wtf)',
          });
        }}
      >
        <MyAwesomeInput
          validations={validations}
          name="asd1"
          value="12"
          type="number"
          required
        />
        <hr />
        <MyAwesomeInput
          validations={validations}
          name="asd2"
          value="5"
          type="number"
          required
        />
        <hr />
        <Button />
        <div>Persistió? {success ? 'yes' : 'no'}</div>
      </ValidatemeForm>
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
