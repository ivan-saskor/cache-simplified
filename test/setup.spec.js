import clearScreen from 'clear';

require('babel-polyfill');

const Sinon = require('sinon');
const Chai = require('chai');
const SinonChai = require('sinon-chai');
const DirtyChai = require('dirty-chai');
const ChaiAsPromised = require('chai-as-promised');

Chai.should();
Chai.use(ChaiAsPromised);
Chai.use(DirtyChai);
Chai.use(SinonChai);

global.sinon = Sinon;
global.expect = Chai.expect;

before(() => { if (process.env.CLEAR_SCREEN) clearScreen(); });
