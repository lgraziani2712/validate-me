const regex = /^#[0-9a-f]{6}$/;
const test = regex.test.bind(regex);
const color = () => test;

export default color;
