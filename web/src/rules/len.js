const len = (min, max) => instance => {
  instance.setArgsToRule('len', [min, max]);

  return rawValue => {
    const value = String(rawValue);

    return value === '' || (min <= value.length && value.length <= max);
  };
};

export default len;
