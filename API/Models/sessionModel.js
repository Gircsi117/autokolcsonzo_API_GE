const session = require("express-session");

const store = new session.MemoryStore();

exports.store = store;