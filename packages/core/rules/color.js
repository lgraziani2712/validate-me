const regex = /^#[0-9a-f]{6}$/;
const color = () => value => regex.test(value);

export default color;
