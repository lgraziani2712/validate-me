const len = (value, min, max) =>
  `The value has length "${
    value.length
  }" but needs to be between [${min}, ${max}].`;

export default len;
