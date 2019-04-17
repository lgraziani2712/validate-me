import Validateme from '@validate-me/vanilla/Validateme';
import vanillaConnector from '@validate-me/vanilla';

window.addEventListener('load', () => {
  const form = document.getElementById('form');
  const validateme = new Validateme();

  vanillaConnector(validateme, document.getElementById('name'));
  vanillaConnector(validateme, document.getElementById('age'));
  vanillaConnector(validateme, document.getElementById('datetime'));
  vanillaConnector(validateme, document.getElementById('time'));
  vanillaConnector(validateme, document.getElementById('date'));
  vanillaConnector(validateme, document.getElementById('emails'));
  vanillaConnector(validateme, document.getElementById('color'));
  vanillaConnector(validateme, document.getElementById('experience'));
  vanillaConnector(validateme, document.getElementById('ok'));
  vanillaConnector(
    validateme,
    document.getElementById('ides'),
    undefined,
    {
      vscode: 'VSCode',
      atom: 'Atom',
      sublime: 'Sublime',
    },
    { vscode: true },
  );
  vanillaConnector(
    validateme,
    document.getElementById('job'),
    undefined,
    {
      frontend: 'Front-end',
      backend: 'Back-end',
      uiUxDesigner: 'UI/UX Designer',
      dataScientist: 'Data Scientist',
    },
    'uiUxDesigner',
  );

  let first = true;

  form.addEventListener('submit', evt => {
    evt.preventDefault();

    const [success, data] = validateme.validate();

    if (!success) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log('Persisted!', data);

    if (first) {
      first = false;
      validateme.process({
        name: ['unexistingRule'],
      });
    }
  });
});
