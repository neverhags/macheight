import { FindHeightSum } from '../utils/find-height-sum.js'
const mockup = JSON.parse(fs.readFileSync('./mockup.json')).values;
import * as assert from 'assert';
import * as fs from 'fs'

describe('Array', function () {
  const findHeightSum = new FindHeightSum(mockup, false, false);
  const findHeightSumDebug = new FindHeightSum(mockup, true, false);
  describe('Find into numbers', function () {
    it('should return the example response', function () {
      assert.deepEqual(findHeightSum.findSumHeight(139), [
        ' - Brevin Knight 70    69 Nate Robinson',
        ' - Mike Wilks 70    69 Nate Robinson'
      ]);
    });
  });

  describe('Support negative inputs', function () {
    it('should return the example response', function () {
      assert.deepEqual(findHeightSum.findSumHeight(-139), [
        ' - Brevin Knight 70    69 Nate Robinson',
        ' - Mike Wilks 70    69 Nate Robinson'
      ]);
    });
  });

  describe('Support string inputs', function () {
    it('should return the example response', function () {
      assert.deepEqual(findHeightSum.findSumHeight("139"), [
        ' - Brevin Knight 70    69 Nate Robinson',
        ' - Mike Wilks 70    69 Nate Robinson'
      ]);
    });
  });

  describe('Support negative string inputs', function () {
    it('should return the example response', function () {
      assert.deepEqual(findHeightSum.findSumHeight("-139"), [
        ' - Brevin Knight 70    69 Nate Robinson',
        ' - Mike Wilks 70    69 Nate Robinson'
      ]);
    });
  });

  describe('Support characters input', function () {
    it('should return nothing', function () {
      assert.deepEqual(findHeightSumDebug.findSumHeight("a").values, []);
    });
  });
  
  describe('Most efficient as O(n^2)', function () {
    it(`should use less iterations as O(n^2) where n=${mockup.length}`, function () {
      let testIndex = 160;
      assert.equal((findHeightSumDebug.findSumHeight(testIndex).iterations < (Math.pow(mockup.length, 2))), true);
      console.log(`Testing ${testIndex}: This is ${(Math.pow(mockup.length, 2) / findHeightSumDebug.findSumHeight(testIndex).iterations)} times more efficient than O(n^2)`);

      testIndex = 139;
      assert.equal((findHeightSumDebug.findSumHeight(testIndex).iterations < (Math.pow(mockup.length, 2))), true);
      console.log(`Testing ${testIndex}: This is ${(Math.pow(mockup.length, 2) / findHeightSumDebug.findSumHeight(testIndex).iterations)} times more efficient than O(n^2)`);

      testIndex = 157;
      assert.equal((findHeightSumDebug.findSumHeight(testIndex).iterations < (Math.pow(mockup.length, 2))), true);
      console.log(`Testing ${testIndex}: This is ${(Math.pow(mockup.length, 2) / findHeightSumDebug.findSumHeight(testIndex).iterations)} times more efficient than O(n^2)`);

      testIndex = 168;
      assert.equal((findHeightSumDebug.findSumHeight(testIndex).iterations < (Math.pow(mockup.length, 2))), true);
      console.log(`Testing ${testIndex}: This is ${(Math.pow(mockup.length, 2) / findHeightSumDebug.findSumHeight(testIndex).iterations)} times more efficient than O(n^2)`);
    });
  });
  
  describe('Verify all return values', function () {
    it(`should compare and verify the results: a + b = input`, function () {
      let hasError = false;
      for (let i = 139; i < 172; i++) {
        findHeightSumDebug.findSumHeight(i).values.forEach((value) => {
          hasError = hasError || value.a.h_in + value.b.h_in === i;
        })
      }
      assert.equal(hasError, false);
    });
  });
});