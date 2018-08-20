import directive from './directive';
import { setServerErrorHandler } from './mixin';

const ValidatemePlugin = {
  install(Vue, props) {
    if (props && props.serverErrorHandler) {
      setServerErrorHandler(props.serverErrorHandler);
    }

    Vue.directive('validate-me', directive);
  },
};

export default ValidatemePlugin;
