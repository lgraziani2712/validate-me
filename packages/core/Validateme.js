import ValidatemeRules from './ValidatemeRules';

export default class Validateme {
  constructor(fields = [], configs) {
    this.fields = {};
    this.processErrorFromServer = configs.processErrorFromServer;

    fields.forEach(field => this.setField(field));
  }
  field(name) {
    if (!this.fields[name]) {
      throw new Error(`Field "${name}" doesn't exists.`);
    }

    return this.fields[name];
  }
  setField(field) {
    if (this.fields[field.name]) {
      throw new Error(`Field "${field.name}" already exists.`);
    }

    this.fields[field.name] = field;
  }
  beforeSendToServer() {
    Object.values(this.fields).forEach(field => {
      field.setSentValue();
      field.clearWarnings();
    });
  }
  process(error) {
    // TODO: validate the data structure?
    const failedFieldsRules = this.processErrorFromServer(error);

    Object.keys(failedFieldsRules).forEach(fieldName => {
      const field = this.fields[fieldName];

      failedFieldsRules[fieldName].forEach(rawError => {
        const [failedRule, ...args] = rawError.split(':');
        const errorType = ValidatemeRules.hasRule(failedRule)
          ? 'errors'
          : 'warnings';

        if (errorType === 'warnings') {
          field.addWarning(failedRule);

          return;
        }
        if (!field.hasRule(failedRule)) {
          field.setRule(
            failedRule,
            ValidatemeRules.instanciateRule(failedRule, ...args),
          );
        }
        field.addError(failedRule);
      });
    });
  }
}
