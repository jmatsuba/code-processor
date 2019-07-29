

let log = [];

const individualTest = function(test) {
  console.log('21DCC', `Running test: ${test.name} `);
  let result = {
    name: test.name,
    hint: test.hint,
    status: 'failed',
    failExplanation: {
      failedReason: null,
      failedTest: null,
      expected: null,
      actual: null,
    },
  };
  let currentTest;
  try {
    for (const testCode of test.asserts) {
      currentTest = testCode;
      eval(testCode);
    }
    result.status = 'passed';
  } catch (error) {
    if (error.code === 'ERR_ASSERTION') {
      // Case: Tested method exists answer did not match what the test was looking for.
      result.failExplanation.failedReason = 'Your code ran but did not produce the correct result.';
      result.failExplanation.failedTest = currentTest;
      result.failExplanation.expected = error.expected;
      result.failExplanation.actual = error.actual;
    } else {
      // Case: Test could not run, probably something is not defined or syntax error
      result.failExplanation.failedReason = `Your code could not run. "${error.message}"`;
      result.failExplanation.failedTest = currentTest;
    }
  }
  return result;
};

const testRunner = function(tests) {
  const originalConsole = console.log;
  console.log = function() {
    if (arguments[0] === '21DCC') {
      log.push([].slice.call(Array.prototype.slice.call(arguments, 1))[0]);
    }
  };

  let results = { testsPassed: false, assertResults: [] };

  for (const testCase of tests) {
    results.assertResults.push(individualTest(testCase));
  }
  results.testsPassed =
    results.assertResults.filter(result => result.status === 'failed').length === 0;
  results.log = log;

  console.log = originalConsole;
  return results;
};

const runLinter = function(code) {
  const lintResults = linter.verify(code, {
    rules: lintRules,
    env: { browser: true, es6: true },
  });
  return lintResults;
};

const vmTestRunner = function(tests) {
  const testRunnerResults = testRunner(tests);
  secretXv7J8w.testsPassed = testRunnerResults.testsPassed;
  secretXv7J8w.results = testRunnerResults.assertResults;
  secretXv7J8w.log = log;
};

secretXv7J8w.lintResults = runLinter(userCode);
vmTestRunner(testCases);
