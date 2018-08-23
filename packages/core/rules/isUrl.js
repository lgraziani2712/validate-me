const isUrl = () => () => /^https?:\/\/([\w-]+\.)+\w{2,}(\/.+)?$/.test;

export default isUrl;
