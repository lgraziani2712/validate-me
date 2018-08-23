const min = minValue => instance => {
  instance.setArgsToRule('min', [minValue]);

  return value => value >= minValue;
};

export default min;
