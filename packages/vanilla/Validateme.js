import { processErrors } from '@validate-me/core/rules';

let errorHandler = f => f;

export function setErrorHandler(handler) {
  errorHandler = handler;
}

export default class Validateme {
  constructor() {
    this.fields = {};
  }
  setField(field) {
    const name = field.name;

    if (this.fields[name]) {
      throw new Error(`Field "${name}" already exists.`);
    }

    this.fields[name] = field;
  }
  process(error) {
    return processErrors(this.fields, errorHandler(error));
  }
  validate() {
    let isValid = true;
    const fields = Object.values(this.fields);

    for (const field of fields) {
      if (!field.validate()) {
        isValid = false;

        break;
      }
    }

    if (isValid) {
      fields.forEach(field => field.clearWarning());
    }

    return isValid;
  }
}
