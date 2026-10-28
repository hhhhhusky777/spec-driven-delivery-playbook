import {test} from 'node:test';
import assert from 'node:assert/strict';
import {nextPage} from './pages.mjs';
test('last full page',()=>assert.equal(nextPage(0,10,10),null));
test('more records',()=>assert.equal(nextPage(0,10,11),10));
test('mock adapter reports infinity',()=>assert.equal(nextPage(0,10,Infinity),null));
