export class FindHeightSum {

  constructor(data, getAsObject = false, debug = true) {
    this.HALF = 0.5;
    this.DEBUG = debug;
    this.getAsObject = getAsObject;
    this.obj = [];
    this.parseObject(data);
  }

  /**
   * Set FindHeightSum variables
   * @param {number} vin Integer input value: sum to find
   */
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

  /**
   * Create a new ordered object based on h_in input
   * @param {PlayerObject} data 
   */
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
  
  /**
   * Set va and vb variables on new step
   * @param {number} va 
   * @param {number} vb 
   * @returns 
   */
  nextStep(va, vb) {
    va++;
    vb--;
    return [va, vb];
  }
  
  /**
   * When the input is unpeer this helps to set a valid int sum
   * @param {number} va 
   * @param {number} vb 
   * @returns 
   */
  fixNonInt(va, vb) {
    return [va + this.HALF, vb - this.HALF];
  }
  
  /**
   * Returns the search result from the main obj
   * @param {number} indexValue 
   * @returns {
   *  string
   * }
   */
  getResult(indexValue) {
    let result; 
    if (this.obj[indexValue] && this.obj[indexValue].length >= 1) {
      result = this.obj[indexValue];
    }
    return result;
  }

  /**
   * Build the final response; it iterate from the result to get all possible 
   * combinations
   * @param {number} arrA 
   * @param {number} arrB 
   * @returns 
   */
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

  /**
   * Find all pairs of players whose height is equal to the input number
   * @param {number} vin 
   * @returns { PlayerSelected[] }
   */
  findSumHeight(vin) {
    this.setupSearch(vin);
    let result = [];
  
    for (let VVheightValue in this.obj) {
      this.processCounter++;
      this.resultA = this.getResult(this.va);
      this.resultB = this.getResult(this.vb);
  
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
