export class FindHeightSum {

  constructor(data, getAsObject = false, debug = true) {
    this.HALF = 0.5;
    this.DEBUG = debug;
    this.getAsObject = getAsObject;
    this.obj = [];
    this.parseObject(data);
  }

  setupSearch(vin) {
    if (isNaN(parseInt(vin))) {
      console.error("Please enter a integer as input");
      vin = 0;
    }
  
    this.va = Math.abs(parseInt(vin)) / 2;
    this.vb = this.va;
    this.processCounter = 0;

    if (this.va % 1 != 0)  {
      [this.va, this.vb] = this.fixNonInt(this.va, this.vb);
    }
  }

  parseObject(data) {
    for (let i = 0; i < data.length; i++) {
      this.processCounter++
      const prevValue = this.obj[data[i].h_in];
      if (!prevValue) {
        this.obj[data[i].h_in] = [];
      }
      this.obj[data[i].h_in].push(data[i]);
    }
  }
  
  nextStep(va, vb) {
    va++;
    vb--;
    return [va, vb];
  }
  
  fixNonInt(va, vb) {
    return [va + this.HALF, vb - this.HALF];
  }
  
  compareResult(indexValue) {
    let result; 
    if (this.obj[indexValue] && this.obj[indexValue].length >= 1) {
      result = this.obj[indexValue];
    }
    return result;
  }

  buildResult(arrA, arrB) {
    const result = [];
    arrA.forEach(elementA => {
      arrB.forEach((elementB) => {
        this.processCounter++;
        const data = this.getAsObject ? 
          {a: elementA, b: elementB } : 
          ` - ${elementA.first_name} ${elementA.last_name} ${elementA.h_in}    ${elementB.h_in} ${elementB.first_name} ${elementB.last_name}`
        result.push(data);
      });
    });
    return result;
  }
  
  findSumHeight(vin) {
    this.setupSearch(vin);
    let result = [];
  
    for (let VVheightValue in this.obj) {
      this.processCounter++;
      this.resultA = this.compareResult(this.va);
      this.resultB = this.compareResult(this.vb);
  
      if (this.resultA && this.resultB) {
        result = result.concat(this.buildResult(this.resultA, this.resultB));
      }
      this.resultA = this.resultB = undefined;
      
      [this.va, this.vb] = this.nextStep(this.va, this.vb);
    }
    if (this.DEBUG) {
      console.log(result.length ? result : 'No results found');
    }
    this.resultA = this.resultB = undefined;
    return this.getAsObject ? {values: result, iterations: this.processCounter} : result;
  }
}
