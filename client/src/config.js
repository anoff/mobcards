const {default: colors} = require('vuetify/es5/util/colors')

const config = { // needs to be ES6 module so it can be imported by webpack
  socketLocation: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : window.location.origin,
  theme: {
    primary: colors.grey.darken3,
    secondary: colors.grey.lighten1,
    accent: colors.orange.darken3,
    error: colors.red.darken4,
    warning: colors.orange.accent3,
    info: colors.lightBlue.base,
    success: colors.green.accent4
  }
}

module.exports = config
