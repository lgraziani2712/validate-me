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
    : ({ target }) => {
        field.run(target[prop]);
      };
}

const oncePassive = { once: true, passive: true };
const passive = { passive: true };
const vanillaConnector = (form, proxySetter) => (
  element,
  inputGetter,
  baseRules,
  options,
  values,
) => {
  if (options) {
    return listBuilder(
      form,
      proxySetter,
      inputGetter,
      element,
      options,
      values || {},
    );
  }
  const input = inputGetter(element);
  const field = new Proxy(
    new ValidatemeField(
      input.name,
      input.type === 'checkbox' ? input.checked : input.value,
      input.required,
    ),
    { set: proxySetter(element) },
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

  return field;
};

function listBuilder(form, proxySetter, inputGetter, element, options, values) {
  const optionsHtml = inputGetter(element);
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
  const field = new Proxy(new ValidatemeField(name, values), {
    set: proxySetter(element),
  });

  form.setField(field);

  inputs.forEach(input => {
    input.addEventListener('blur', () => field.touch(), oncePassive);
    input.addEventListener('input', handleValue(field, type, options), passive);
  });

  return field;
}

export default vanillaConnector;
