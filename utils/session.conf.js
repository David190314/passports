const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
let {sequelize} = require("../models");
const sessionConf  = session({
    secret: "academlo secret",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      expiration: 1 * 60 * 60 * 1000,
      db: sequelize
    })
})


module.exports = sessionConf