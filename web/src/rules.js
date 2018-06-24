const notEmpty = () => instance => value => {
  if (value === undefined || value === null || value === '') {
    instance.addError('notEmpty');
  } else {
    instance.removeError('notEmpty');
  }
};
const len = (min, max) => instance => {
  instance.setArgsToRule('len', [min, max]);

  return rawValue => {
    const value = String(rawValue);

    if (min <= value.length && value.length <= max) {
      instance.removeError('len');
    } else {
      instance.addError('len');
    }
  };
};

export default {
  len,
  notEmpty,
};
