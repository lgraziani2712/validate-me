/* eslint-disable no-underscore-dangle */

const _unknownRule = (rule, value) =>
  `Falló la regla "${rule}" en el servidor, con el valor: "${value}"`;

export default _unknownRule;
