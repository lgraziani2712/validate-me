const len = (value, min, max) =>
  `El valor tiene un tamaño de "${
    value.length
  }" pero tiene que estar entre: [${min}, ${max}]`;

export default len;
