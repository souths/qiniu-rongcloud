'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/default')(app)
  require('./router/qiniu')(app)
  require('./router/rongcloud')(app)
  require('./router/user')(app)
};
