import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import React from 'react'
import { shallowRender, findByTestId } from 'testing/shallow_rendering'
import stubReactAsReactNative from 'testing/stub_react_as_react_native'

chai.use(sinonChai);
global.expect = chai.expect;
global.sinon = sinon;

stubReactAsReactNative(React);
global.React = React;

global.shallowRender = shallowRender;
global.findByTestId = findByTestId;

const context = require.context('./app', true, /-test.js$/);
context.keys().forEach(context);

