import { FindHeightSum } from '../utils/find-height-sum.js'
const mockup = JSON.parse(fs.readFileSync('./mockup.json')).values;
import * as assert from 'assert';
import * as fs from 'fs'

const bigInput = [];
for(let i=0; i < 100000;i++) {
  bigInput.push({
    h_in: i,
    h_meters: i * 2.5,
    first_name: `name ${i}`,
    last_name: `last name ${i}`,
  });
}

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

  describe('Support round decimals', function () {
    it('should return the example response', function () {
      assert.deepEqual(findHeightSum.findSumHeight("139.3"), [
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

  describe('Support no input', function () {
    it('should return nothing', function () {
      assert.deepEqual(findHeightSumDebug.findSumHeight().values, []);
    });
  });
  
  describe('Most efficient than O(n^2)', function () {
    it(`should use less iterations than O(n^2) where n=${mockup.length}`, function () {
      for (let i = 139; i < 177; i++) {
        assert.equal((findHeightSumDebug.findSumHeight(i).iterations < (Math.pow(mockup.length, 2))), true);
        console.log(`\tTesting ${i}: This is ${(Math.pow(mockup.length, 2) / findHeightSumDebug.findSumHeight(i).iterations)} times more efficient than O(n^2) with ${findHeightSumDebug.findSumHeight(i).values.length} pairs found`);
      }
    });
  });
  
  describe('Verify all return values', function () {
    it(`should compare and verify the results: a + b = input`, function () {
      let hasError = false;
      for (let i = 139; i < 177; i++) {
        findHeightSumDebug.findSumHeight(i).values.forEach((value) => {
          hasError = hasError || value.a.h_in + value.b.h_in === i;
        })
      }
      assert.equal(hasError, false);
    });
  });
  
  describe('Hard Test: Big list input', function () {
    it(`should process a 100000 rows list with 10000 as input`, function () {
      const findHeightBig = new FindHeightSum(bigInput, false, false);
      let hasError = false;
      findHeightBig.findSumHeight(10000)

      assert.equal(hasError, false);
    });
  });

});