import {test} from 'node:test';
import assert from 'node:assert/strict';
import {shippingFee} from './shipping.mjs';
test('below threshold',()=>assert.equal(shippingFee(9999),500));
test('above threshold',()=>assert.equal(shippingFee(10001),0));
