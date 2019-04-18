import Validateme from '@validate-me/vanilla/Validateme';
import vanillaConnector from '@validate-me/vanilla';

const inputGetter = element => element.querySelector('input');
const optionsGetter = element => element.querySelector('.options');

window.addEventListener('load', () => {
  const form = document.getElementById('form');
  const validateme = new Validateme();
  const connect = vanillaConnector(validateme, element => {
    const error = element.querySelector('.error');
    const warn = element.querySelector('.warning');

    return (target, prop, val) => {
      const touched = target.touched;

      target[prop] = val;

      if (touched && prop === 'error') {
        error.textContent = val;
        warn.textContent = val ? '' : target.warning;
      }
      if (prop === 'warning') {
        warn.textContent = target.warning;
      }

      return true;
    };
  });

  connect(
    document.getElementById('name'),
    inputGetter,
  );
  connect(
    document.getElementById('age'),
    inputGetter,
  );
  connect(
    document.getElementById('datetime'),
    inputGetter,
  );
  connect(
    document.getElementById('time'),
    inputGetter,
  );
  connect(
    document.getElementById('date'),
    inputGetter,
  );
  connect(
    document.getElementById('emails'),
    inputGetter,
  );
  connect(
    document.getElementById('color'),
    inputGetter,
  );
  connect(
    document.getElementById('experience'),
    inputGetter,
  );
  connect(
    document.getElementById('ok'),
    inputGetter,
  );
  connect(
    document.getElementById('ides'),
    optionsGetter,
    undefined,
    {
      vscode: 'VSCode',
      atom: 'Atom',
      sublime: 'Sublime',
    },
    { vscode: true },
  );
  connect(
    document.getElementById('job'),
    optionsGetter,
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
