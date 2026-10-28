import {test} from 'node:test';
import assert from 'node:assert/strict';
import {isAllowedUpload} from './upload.mjs';
test('small supported upload',()=>assert.equal(isAllowedUpload(1024,'image/png'),true));
test('unsupported MIME',()=>assert.equal(isAllowedUpload(1024,'text/plain'),false));
