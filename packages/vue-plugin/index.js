import directive from './directive';

const ValidatemePlugin = {
  install(Vue) {
    Vue.directive('validate-me', directive);
  },
};

export default ValidatemePlugin;
