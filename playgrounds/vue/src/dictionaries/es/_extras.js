export default {
  preWarning: 'ATENCIÓN: ',
  unknownRule: (rule, value) =>
    `Falló la regla "${rule}" en el servidor, con el valor: "${value}"`,
};
