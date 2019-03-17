export default {
  preWarning: 'WARNING: ',
  unknownRule: (rule, value) =>
    `Unknown server rule "${rule}" failed with the value "${value}"`,
};
