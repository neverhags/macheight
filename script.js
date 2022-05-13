import * as fs from 'fs'
const mockup = JSON.parse(fs.readFileSync('./mockup.json')).values;

let vin = 0; 
const HALF = 0.5;
let va = vin / 2;
let vb = va;
let obj = {
  value: [],
  max: 0,
  min: Infinity
};
let resultA, resultB;

const nextStep = (va, vb) => {
  va++;
  vb--;
  return [va, vb];
}

const fixNonInt = (va, vb) => {
  return [va + HALF, vb - HALF];
}

const compareResult = (indesValue) => {
  let result; 
  if (obj.value[indesValue] && obj.value[indesValue].length >= 1) {
    result = obj.value[indesValue].shift();
  }
  return result;
}

const findSumHeight = () => {
  if (va % 1 != 0)  {
    [va, vb] = fixNonInt(va, vb);
  }

  for (let heightValue in obj.value) {
    resultA = compareResult(va);
    resultB = compareResult(vb);

    if (resultA && resultB) {
      break;
    } else {
      resultA = resultB = undefined;
    }
    
    [va, vb] = nextStep(va, vb);
  }

  console.log((resultA && resultB) ? [resultA, resultB, vin,va,vb] : 'No results found');
  resultA = resultB = undefined;
}

for (let i = -50; i < 200; i++) {
  try {
    vin = Math.abs(parseInt(i));
  } catch (error) {
    console.error("Please write a number");
    break;
  }

  obj = {
    value: [],
    max: 0,
    min: Infinity
  };

  for (let i = 0; i < mockup.length; i++) {
    const prevValue = obj.value[mockup[i].h_in];
    if (!prevValue) {
      obj.value[mockup[i].h_in] = [];
    }
    obj.value[mockup[i].h_in].push(mockup[i]);
  }

  va = vin / 2;
  vb = va;
  findSumHeight();
}
