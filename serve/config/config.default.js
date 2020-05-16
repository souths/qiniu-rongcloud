/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1589502889350_1680';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  //跨域设置(允许所有域)
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  //跨域设置(只允许http://localhost:300跨域)
  // config.security = {
  //   csrf: { enable: false },
  //   domainWhiteList: ['*']
  // };
  // config.cors = {
  //   origin: 'http://localhost:3000', //只允许这个域进行访问接口
  //   credentials: true,   // 开启认证
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  // };

  return {
    ...config,
    ...userConfig,
  };
};
