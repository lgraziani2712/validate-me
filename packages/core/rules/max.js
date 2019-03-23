const max = rawMaxValue => {
  const maxValue = isNaN(rawMaxValue) ? rawMaxValue : parseInt(rawMaxValue);

  return value => value <= maxValue;
};

export default max;
