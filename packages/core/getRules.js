export const datePatterns = {
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  time: /^([01]\d|2[0-3]):[0-5]\d$/,
  'datetime-local': /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d$/,
  week: /^\d{4}-W([0-4]\d|5[0-3])$/,
  month: /^\d{4}-(0[1-9]|1[0-2])$/,
};
const dateExamples = {
  date: '2019-03-24',
  time: '14:59',
  'datetime-local': '2019-02-28T23:59',
  week: '2019-W53',
  month: '2019-12',
};
const number = 'number';
const color = 'color';
const range = 'range';
const min = 'min';
const max = 'max';
const patternName = 'pattern';

/**
 *
 * @param {string} type Type
 * @param {any} props Props
 * @return {Array<Array<string>>} Configured rules
 */
export default function getRules(type, props) {
  const rules = props.required ? [['required']] : [];
  const addRule = rules.push.bind(rules);

  if (type === color) {
    addRule([color]);
  } else if (type === number || type === range) {
    addRule([number]);
    props.min && addRule([min, props.min]);
    props.max && addRule([max, props.max]);
  } else if (type in dateExamples) {
    const pattern = datePatterns[type];

    addRule([patternName, pattern, '', dateExamples[type]]);

    if (props.min) {
      if (process.env.NODE_ENV !== 'production' && !pattern.test(props.min)) {
        throw new Error(
          `[dev-only] @validate-me: the value "${
            props.min
          }" from the min prop must be a valid ${type} value.`,
        );
      }
      addRule([min, props.min]);
    }
    if (props.max) {
      if (process.env.NODE_ENV !== 'production' && !pattern.test(props.max)) {
        throw new Error(
          `[dev-only] @validate-me: the value "${
            props.max
          }" from the max prop must be a valid ${type} value.`,
        );
      }
      addRule([max, props.max]);
    }
  }
  if (props.pattern) {
    const rule = [patternName, props.pattern];

    if (type === 'email' && props.multiple) {
      rule.push('mul');
    }

    addRule(rule);
  }

  return rules;
}
