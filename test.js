import { exit } from 'process';
import axios from 'axios';
import { FindHeightSum } from './utils/find-height-sum.js'
import * as fs from 'fs'


const mockup = JSON.parse(fs.readFileSync('./mockup.json')).values;
const url = 'https://mach-eight.uc.r.appspot.com/';
const useMockup = true;

let vin;
if (isNaN(process.argv[2])) {
  console.log("Please write a number");
  exit(0);
}
vin = Math.abs(parseInt(process.argv[2]));
if (useMockup) {
  const findHeightSum = new FindHeightSum(mockup, vin);
  findHeightSum.findSumHeight();
  console.log(findHeightSum.processCounter);
} else {
  axios.get(url)
    .then((response) => {
      const findHeightSum = new FindHeightSum(response.data.values, vin);
      findHeightSum.findSumHeight();
    })
    .catch((error) => {
      console.error(error);
    });
};



