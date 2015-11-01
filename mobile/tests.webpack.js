var chai = require('chai');
chai.use(require("sinon-chai"));
global.expect = chai.expect;

global.sinon = require('sinon');

var context = require.context('./app', true, /-test.js$/);
context.keys().forEach(context);
