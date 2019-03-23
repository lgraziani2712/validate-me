const min = rawMinValue => {
  const minValue = isNaN(rawMinValue) ? rawMinValue : parseInt(rawMinValue);

  return value => value >= minValue;
};

export default min;
