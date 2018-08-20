# @validateme/vanilla

Basic example. I'm not using it any project.

## Usage

```js
import Validateme from '@validate-me/core/Validateme';
import ValidatemeItem from '@validate-me/core/ValidatemeItem';
import vanillaConnector from '@validate-me/vanilla';

window.addEventListener('load', () => {
  const myForm = document.getElementById('my-form');
  const resultMessage = document.getElementById('result-message');
  const inputName = 'name';
  const validateme = new Validateme([new ValidatemeItem({ name: inputName })]);

  vanillaConnector(validateme, form);

  form.addEventListener('submit' evt => {
    evt.preventDefault();

    if (!validateme.validate()) {
      return;
    }

    // Constructs the form data from each input
    const data = {
      name: form[inputName].value,
    };

    fetch('apiEndPoint', {
      body: JSON.stringify(data),
      method: 'POST',
    })
      .then(response => {
        resultMessage.innerHTML = 'Data submited successfully!';
      })
      .catch(error => {
        validateme.process(error.data);
      });
  });
});
```
