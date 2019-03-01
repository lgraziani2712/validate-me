const errorHandler = f => f;

export default class Validateme {
  constructor(newErrorHandler) {
    this.fields = {};
    this.errorHandler = newErrorHandler || errorHandler;
  }
  setField(field) {
    const name = field.name;

    if (this.fields[name]) {
      throw new Error(`Field "${name}" already exists.`);
    }

    this.fields[name] = field;
  }
  process(error) {
    const failedFieldsRules = this.errorHandler(error);
    const fields = this.fields;

    return Promise.all(
      Object.keys(failedFieldsRules).map(fieldName => {
        const field = fields[fieldName];

        return field.parseError(failedFieldsRules[fieldName]);
      }),
    );
  }
  validate() {
    let isValid = true;

    for (const field of Object.values(this.fields)) {
      if (!field.validate()) {
        isValid = false;

        break;
      }
    }

    if (isValid) {
      Object.values(this.fields).forEach(field => {
        field.setSentValue();
      });
    }

    return isValid;
  }
}
