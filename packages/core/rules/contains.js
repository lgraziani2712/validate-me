const contains = partialValue => instance => {
  instance.setArgsToRule('contains', [partialValue]);

  return value => value.includes(partialValue);
};

export default contains;
