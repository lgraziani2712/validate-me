const max = maxValue => instance => {
  instance.setArgsToRule('max', [maxValue]);

  return value => value <= maxValue;
};

export default max;
