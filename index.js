import {exit} from 'process';
import * as fs from 'fs';

import FindHeightSum from './utils/find-height-sum.js';
import fetchUrl from './utils/fetchUrl.js';

const {values: mockup} = JSON.parse(fs.readFileSync('./utils/mockup.json'));
const url = 'https://mach-eight.uc.r.appspot.com/';
const useMockup = false;

const vin = Math.abs(parseInt(process.argv[2], 0));
if (Number.isNaN(process.argv[2])) {
  console.log('Please write a number');
  exit(0);
}

if (useMockup) {
  const findHeightSum = new FindHeightSum(mockup, true);
  findHeightSum.findSumHeight(vin);
} else {
  fetchUrl(url)
      .then(({values}) => {
        const findHeightSum = new FindHeightSum(values);
        findHeightSum.findSumHeight(vin);
      })
      .catch((error) => {
        console.error(error, 1);
      });
}
