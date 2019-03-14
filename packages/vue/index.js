import directive from './directive';
import { setErrorHandler } from './FormMixin';

const ValidatemePlugin = {
  install(Vue, props) {
    if (props && props.errorHandler) {
      setErrorHandler(props.errorHandler);
    }

    Vue.directive('validate-me', directive);
  },
};

export default ValidatemePlugin;
