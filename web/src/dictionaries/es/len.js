const len = (value, min, max) =>
  `El valor tiene un tamaño de "${
    String(value).length
  }" pero tiene que estar entre: [${min}, ${max}]`;

export default len;
