import getRules from '@validate-me/core/getRules';
import ValidatemeField from '@validate-me/vanilla/ValidatemeField';

function handleValue(field, type, options) {
  const checkbox = type === 'checkbox';
  const prop = checkbox ? 'checked' : 'value';
  const checkList = checkbox && options;

  return checkList
    ? ({ target }) =>
        field.run({
          ...field.value,
          [target.defaultValue]: target.checked,
        })
    : ({ target }) => field.run(target[prop]);
}
/**
 * @param {HTMLElement} error Span
 * @param {HTMLElement} warn Span
 * @return {ProxyHandler} Proxy handler
 */
const proxyHandler = (error, warn) => ({
  set(target, prop, val) {
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
  },
});
const oncePassive = { once: true, passive: true };
const passive = { passive: true };

/**
 * Connect Validateme to raw html element.
 *
 * @param {Validateme} form The validateme instance.
 * @param {HTMLElement} element The entire element with the input.
 * @param {Array<string[]>} baseRules Extra rules that aren't setted through the input props.
 * @param {Object} [options] Possible options for checkbox lists, & radios.
 * @param {Object} [values] Possible values for checkbox lists, & radios.
 * @return {void}
 */
export default function vanillaConnector(
  form,
  element,
  baseRules,
  options,
  values,
) {
  if (options) {
    return listBuilder(form, element, options, values || {});
  }

  const input = element.querySelector('input');
  const field = new Proxy(
    new ValidatemeField(
      input.name,
      input.type === 'checkbox' ? input.checked : input.value,
      input.required,
    ),
    proxyHandler(
      element.querySelector('.error'),
      element.querySelector('.warning'),
    ),
  );
  const rules = getRules(input.type, input);

  field.setRules(baseRules ? rules.concat(baseRules) : rules);

  form.setField(field);

  input.addEventListener('blur', () => field.touch(), oncePassive);
  input.addEventListener(
    'input',
    handleValue(field, input.type, options),
    passive,
  );
}

function listBuilder(form, element, options, values = {}) {
  const optionsHtml = element.querySelector('.options');
  const name = optionsHtml.getAttribute('data-name');
  const type = optionsHtml.getAttribute('data-type');
  const [labels, inputs] = Object.keys(options).reduce(
    (elements, key) => {
      const label = document.createElement('label');
      const input = document.createElement('input');

      input.type = type;
      input.name = name;
      input.value = key;
      input.checked = type === 'radio' ? values : values[key];

      label.append(input, options[key]);

      elements[0].push(label);
      elements[1].push(input);

      return elements;
    },
    [[], []],
  );

  optionsHtml.append(...labels);
  const field = new Proxy(
    new ValidatemeField(name, values),
    proxyHandler(
      element.querySelector('.error'),
      element.querySelector('.warning'),
    ),
  );

  form.setField(field);

  inputs.forEach(input => {
    input.addEventListener('blur', () => field.touch(), oncePassive);
    input.addEventListener('input', handleValue(field, type, options), passive);
  });
}
