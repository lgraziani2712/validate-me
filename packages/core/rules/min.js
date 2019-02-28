const min = rawMinValue => {
  const minValue = parseInt(rawMinValue);

  return value => value >= minValue;
};

export default min;
