let settings = {
  db: null
};

const globals = {
  set(key, val) {
    if (Object.keys(settings).includes(key)) {
      settings[key] = val;
      return val;
    }
    return undefined;
  },

  get(key) {
    return settings[key];
  }
};

module.exports = globals;
