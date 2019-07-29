const responses = {
  noRunResult: {
    testsPassed: false,
    results: [
      {
        name: 'Tests could not run',
        hint: 'Check that all of your code is inside of functions.',
        status: 'failed',
        failExplanation: {
          failedReason: 'Execution did not hit the test code',
          failedTest: 'n/a',
          expected: 'Tests to run',
          actual: 'Tests did not run',
        },
      },
    ],
  },
  infiniteLoopResult: {
    testsPassed: false,
    results: [
      {
        name: 'Your code took longer than expected to run.',
        hint: 'Check you code for infinite loops.',
        status: 'failed',
        failExplanation: {
          failedReason: 'Your code took longer than expected to run.',
          failedTest: 'n/a',
          expected: 'Tests to complete',
          actual: 'Tests did not run or did not complete',
        },
      },
    ],
  },
};

const testData = {
  1: [
    {
      name: 'add(a,b) should return correct value',
      hint: 'make sure your function returns 2 for 1+1',
      asserts: ['assert.equal(add(1,2), 3)', 'assert.equal(add(2,3), 5)'],
    },
    {
      name: 'minus(a-b) should return correct value',
      hint: 'make sure your function returns 1 for 2-1',
      asserts: ['assert.equal(minus(2,1), 1)', 'assert.equal(minus(2,2), 0)'],
    },
  ],
  2: [
    {
      name: 'add(a,b) should return correct value',
      hint: 'make sure your function returns 2 for 1+1',
      asserts: ['assert.equal(add(1,2), 3)', 'assert.equal(add(2,3), 5)'],
    },
    {
      name: 'minus(a-b) should return correct value',
      hint: 'make sure your function returns 1 for 2-1',
      asserts: ['assert.equal(minus(2,1), 1)', 'assert.equal(minus(2,2), 0)'],
    },
  ],
  3: [
    {
      name: 'add(a,b) should return correct value',
      hint: 'make sure your function returns 2 for 1+1',
      asserts: ['assert.equal(add(1,2), 3)', 'assert.equal(add(2,3), 5)'],
    },
    {
      name: 'minus(a-b) should return correct value',
      hint: 'make sure your function returns 1 for 2-1',
      asserts: ['assert.equal(minus(2,1), 1)', 'assert.equal(minus(2,2), 0)'],
    },
  ],
};

module.exports = { responses, testData };
