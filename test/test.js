import { FindHeightSum } from '../utils/find-height-sum.js'
const mockup = JSON.parse(fs.readFileSync('./mockup.json')).values;
import * as assert from 'assert';
import * as fs from 'fs'

describe('Array', function () {
  const findHeightSum = new FindHeightSum(mockup, 139)
  describe('Find into numbers', function () {
    it('should return the example response', function () {
      assert.deepEqual(findHeightSum.findSumHeight(), [
        ' - Brevin Knight 70    69 Nate Robinson',
        ' - Mike Wilks 70    69 Nate Robinson'
      ]);
    });
  });
});