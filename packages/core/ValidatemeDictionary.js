const dictionary = {
  default: (rule, value) =>
    `Server unknown rule "${rule}" failed with the value "${value}"`,
};

function setMessages(messages) {
  Object.keys(messages).forEach(key => {
    dictionary[key] = messages[key];
  });
}

function getMessage(rule, value, ...args) {
  if (!dictionary[rule]) {
    return dictionary.default(rule, value);
  }

  return dictionary[rule](value, ...args);
}

// TODO Add a11y
export default {
  setMessages,
  getMessage,
};
