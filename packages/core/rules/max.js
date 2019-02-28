const max = rawMaxValue => {
  const maxValue = parseInt(rawMaxValue);

  return value => value <= maxValue;
};

export default max;
