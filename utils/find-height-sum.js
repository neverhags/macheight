/**
 * A class that can return the height sum from two players
 * Author: Heilner Garcia <heilnergarcia@gmail.com>
 */
class FindHeightSum {
  /**
   * FindHeightSum constructor
   * @param {PlayerObject} data
   * @param {boolean} getAsObject
   * @param {boolean} debug
   */
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
    vin = parseInt(vin, 0);
    if (Number.isNaN(vin)) {
      console.error('Please enter a integer as input');
    }

    this.va = Math.abs(vin) / 2;
    this.vb = this.va;
    this.processCounter = 0;

    if (this.va % 1 !== 0) {
      [this.va, this.vb] = this.fixNonInt(this.va, this.vb);
    }
  }

  /**
   * Create a new ordered object based on h_in input
   * @param {PlayerObject} data
   */
  parseObject(data) {
    for (let i = 0; i < data.length; i++) {
      this.processCounter++;
      const prevValue = this.obj[data[i].h_in];
      if (!prevValue) {
        this.obj[data[i].h_in] = [];
      }
      this.obj[data[i].h_in].push(data[i]);
    }
  }

  /**
   * Sums and subtract 1 to input values to get the same sum result
   * Ej: A + B = R => 2 + 2 = 4 => 3 + 1 = 4
   * @param {number} valueA
   * @param {number} valueB
   * @return {Array<number>}
   */
  nextStep(valueA, valueB) {
    return [valueA + 1, valueB - 1];
  }

  /**
   * When the input is unpeer this helps to set a valid int sum
   * @param {number} va
   * @param {number} vb
   * @return {Array<number>}
   */
  fixNonInt(va, vb) {
    return [va + this.HALF, vb - this.HALF];
  }

  /**
   * Returns the search result from the main obj
   * @param {number} indexValue
   * @return {Array}
   */
  getResult(indexValue) {
    let result;
    if (this.obj[indexValue] && this.obj[indexValue].length >= 1) {
      result = this.obj[indexValue];
    }
    return result;
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Build the final response; it iterate from the result to get all possible
   * combinations
   * @param {number} arrA
   * @param {number} arrB
   * @returns
   */
  buildResult(arrA, arrB) {
    const result = [];
    arrA.forEach((elementA) => {
      arrB.forEach((elementB) => {
        this.processCounter++;
        const data = this.getAsObject ?
          {a: elementA, b: elementB} :
          ` - ${elementA.first_name} ${elementA.last_name} ${elementA.h_in}` +
          `    ${elementB.h_in} ${elementB.first_name} ${elementB.last_name}`;
        result.push(data);
      });
    });
    return result;
  }

  /**
   * Find all pairs of players whose height is equal to the input number
   * @param {number} vin
   * @return { PlayerSelected[] }
   */
  findSumHeight(vin) {
    this.setupSearch(vin);
    let result = [];

    // eslint-disable-next-line prefer-const, no-unused-vars
    for (let _ of this.obj) {
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

    this.resultA = undefined;
    this.resultB = undefined;
    return this.getAsObject ?
    {values: result, iterations: this.processCounter} :
    result;
  }
}

export default FindHeightSum;
