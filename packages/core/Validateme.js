// TODO: validate the data structure?
const defaultConfig = {
  fields: [],
  store: {
    fields: {},
  },
  setField(field) {
    this.store.fields[field.name] = field;
  },
  serverErrorHandler: f => f,
};

export default class Validateme {
  constructor(newConfig) {
    const configs = Object.assign(defaultConfig, newConfig);

    this.store = configs.store;
    this.handleSetField = configs.setField;
    this.serverErrorHandler = configs.serverErrorHandler;

    configs.fields.forEach(field => this.setField(field));
  }
  field(name) {
    return this.store.fields[name];
  }
  setField(field) {
    if (this.store.fields[field.name]) {
      throw new Error(`Field "${field.name}" already exists.`);
    }

    this.handleSetField(field);
  }
  hasError(name) {
    return this.field(name) && this.field(name).hasErrors();
  }
  hasWarning(name) {
    return this.field(name) && this.field(name).hasWarnings();
  }
  firstError(name) {
    const field = this.store.fields[name];

    return field && field.hasErrors() ? field.firstError() : '';
  }
  firstWarning(name) {
    const field = this.store.fields[name];

    return field && field.hasWarnings() ? field.firstWarning() : '';
  }
  beforeSendToServer() {
    Object.values(this.store.fields).forEach(field => {
      field.setSentValue();
      field.clearWarnings();
    });
  }
  process(error) {
    const failedFieldsRules = this.serverErrorHandler(error);

    Object.keys(failedFieldsRules).forEach(fieldName => {
      const field = this.store.fields[fieldName];

      failedFieldsRules[fieldName].forEach(rawError => {
        field.parseRawError(rawError);
      });
    });
  }
  validate() {
    return Object.values(this.store.fields).reduce(
      (success, field) => field.validate() && success,
      true,
    );
  }
}
