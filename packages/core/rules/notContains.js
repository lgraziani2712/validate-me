const notContains = partialValue => instance => {
  instance.setArgsToRule('notContains', [partialValue]);

  return value => !value.includes(partialValue);
};

export default notContains;
