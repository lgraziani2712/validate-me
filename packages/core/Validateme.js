const defaultConfig = {
  fields: [],
  store: {
    fields: {},
  },
  setField: field => {
    this.store.fields[field.name] = field;
  },
  processErrorFromServer: f => f,
};

export default class Validateme {
  constructor(newConfig) {
    const configs = Object.assign(defaultConfig, newConfig);

    this.store = configs.store;
    this.handleSetField = configs.setField;
    this.processErrorFromServer = configs.processErrorFromServer;

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
  firstMessageOf(name) {
    const field = this.store.fields[name];

    if (!field) {
      return;
    }
    if (field.hasErrors()) {
      return field.firstError();
    }
    if (field.hasWarnings()) {
      return field.firstWarning();
    }
  }
  beforeSendToServer() {
    Object.values(this.store.fields).forEach(field => {
      field.setSentValue();
      field.clearWarnings();
    });
  }
  process(error) {
    // TODO: validate the data structure?
    const failedFieldsRules = this.processErrorFromServer(error);

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
  data() {
    return Object.values(this.store.fields).reduce((data, field) => {
      data[field.name] = field.value;

      return data;
    }, {});
  }
}
