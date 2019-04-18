const pattern = (pattern, flags, type) => {
  const regex =
    typeof pattern === 'string'
      ? new RegExp(
          type !== 'mul' ? `^${pattern}$` : `^${pattern}(,${pattern},?)*$`,
          flags,
        )
      : pattern;

  return regex.test.bind(regex);
};

export default pattern;
