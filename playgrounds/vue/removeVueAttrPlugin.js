/**
 * @param {Array<string>} attrs Attributes to remove
 * @return {ModuleOptions} Vue loader's module option
 */
module.exports = function removeVueAttrPlugin(attrs) {
  return {
    preTransformNode(astEl) {
      const { attrsMap, attrsList } = astEl;

      attrs.forEach(attr => {
        if (attrsMap[attr]) {
          delete attrsMap[attr];

          attrsList.splice(attrsList.findIndex(({ name }) => name === attr), 1);
        }
      });

      return astEl;
    },
  };
};
