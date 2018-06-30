const defaultConfig = {
  processErrorFromServer: f => f,
};

export default class Validateme {
  constructor(fields = [], configs = defaultConfig) {
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

        field.addFailedRule(failedRule, ...args);
      });
    });
  }
  validate() {
    return Object.values(this.fields).reduce(
      (success, field) => field.validate() && success,
      true,
    );
  }
}
