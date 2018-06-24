const rules = {};

function setRules(tempRules) {
  Object.keys(tempRules).forEach(key => {
    rules[key] = tempRules[key];
  });
}
function hasRule(name) {
  return !!this.rules[name];
}
function instanciateRule(name, ...args) {
  return this.rules[name](...args);
}

export default {
  setRules,
  hasRule,
  instanciateRule,
};
