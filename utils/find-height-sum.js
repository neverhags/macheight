/**
 * A class that can return the height sum from two players
 * Author: Heilner Garcia <heilnergarcia@gmail.com>
 */
class FindHeightSum {
  #pointerA;
  #pointerB;
  /**
   * FindHeightSum constructor
   * @param {PlayerObject} data
   * @param {boolean} getAsObject
   * @param {boolean} verbose
   */
  constructor(data, getAsObject = false, verbose = true) {
    // this.HALF = 0.5;
    this.VERBOSE = verbose;
    this.getAsObject = getAsObject;
    this.data = [];
    this.#parseObject(data);
  }

  /**
   * Set FindHeightSum variables
   * @param {number} vin Integer input value: sum to find
   * @return {boolean}
   */
  #setupSearch(vin) {
    vin = parseInt(vin, 0);
    if (Number.isNaN(vin)) {
      console.log('Please enter a integer as input');
      return false;
    }

    this.#pointerA = 0;
    this.#pointerB = Math.abs(vin);
    // Testing/Benchmark: Count process iterations
    this.processCounter = 0;
    return true;
  }

  /**
   * Create a new ordered object based on h_in input
   * @param {PlayerObject} data
   */
  #parseObject(data) {
    for (let i = 0; i < data.length; i++) {
      this.processCounter++;
      const prevValue = this.data[data[i].h_in];
      if (!prevValue) {
        this.data[data[i].h_in] = [];
      }
      this.data[data[i].h_in].push(data[i]);
    }
  }

  /**
   * Sums and subtract 1 to input values to get the same sum result
   * Ej: A + B = R => 2 + 2 = 4 => 3 + 1 = 4
   */
  #nextStep() {
    [this.#pointerA, this.#pointerB] = [this.#pointerA + 1, this.#pointerB - 1];
  }

  /**
  * Get obj[indexValue] verified result
  * @param {number} indexValue
  * @param {*} obj
  * @return {Array}
  */
  #getResult({indexValue, obj}) {
    if (obj[indexValue] && obj[indexValue].length >= 1) {
      return obj[indexValue];
    }
    return false;
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Build the final response; it iterate from the result to get all possible
   * combinations
   * @param {number} arrA
   * @param {number} arrB
   * @returns
   */
  #buildResult(arrA, arrB) {
    const result = [];
    // Each iteration gets a valid answer
    arrA.forEach((elementA) => {
      arrB.forEach((elementB) => {
        this.processCounter++;
        // Returns A/B object or an string readable in console
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
    if (!this.#setupSearch(vin)) {
      return;
    }
    let result = [];
    let resultA;
    let resultB;

    // eslint-disable-next-line prefer-const, no-unused-vars
    while (this.#pointerA <= this.#pointerB) {
      this.processCounter++;
      resultA = this.#getResult({indexValue: this.#pointerA, obj: this.data});
      resultB = this.#getResult({indexValue: this.#pointerB, obj: this.data});


      if (resultA && resultB) {
        result = result.concat(this.#buildResult(resultA, resultB));
      }

      resultA = resultB = undefined;
      this.#nextStep();
    }

    if (this.VERBOSE) {
      console.log(result.length ? result : 'No results found');
    }

    resultA = undefined;
    resultB = undefined;

    return this.getAsObject ?
      {values: result, iterations: this.processCounter} :
      result;
  }
}

export default FindHeightSum;
