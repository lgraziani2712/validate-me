export default {
  len: (value, min, max) =>
    `The value has length "${
      String(value).length
    }" but needs to be between [${min}, ${max}]`,
  notEmpty: () => 'The field is required.',
};
