const wp = require('workerpool');
const fs = require('fs');
const lintRules = require('./lintRules');
const { responses, testData } = require('./appData');

// Load the script to do all the processing as a string from a file. Once on app start.
const runnerScript = fs.readFileSync('./lib/testRunner.js').toString();

function runProgram(program, userCode, testCases, responses, lintRules) {
  const linter = require('eslint').linter;
  const { NodeVM } = require('vm2');
  const assert = require('assert');
  let secretXv7J8w = responses.noRunResult;

  const vm = new NodeVM({
    console: 'off',
    sandbox: { assert, secretXv7J8w, testCases, console, userCode, linter, lintRules },
    require: {
      root: './',
      mock: {
        fs: {
          readFileSync() {
            return 'Nice try!';
          },
        },
      },
    },
  });

  try {
    vm.run(program);
  } catch (e) {
    secretXv7J8w = {
      testsPassed: false,
      results: [
        {
          name: 'Tests could not run',
          hint: `Error Message: ${e.message}`,
          status: 'failed',
          failExplanation: {
            failedReason: 'Execution did not hit the test code',
            failedTest: 'n/a',
            expected: 'Tests to run',
            actual: 'Tests did not run',
          },
        },
      ],
    };
  }

  return secretXv7J8w;
}

const timeoutError = function() {
  return new Promise(resolve => {
    // Case: infinite loops or something that is causing excessively long execution
    setTimeout(() => {
      resolve(responses.infiniteLoopResult);
    }, 1000);
  });
};

const replaceConsoleLogs = function(code) {
  return code.replace('console.log(', 'console.log("21DCC",');
};

// Only function needed for export
module.exports.process = async (num, code) => {
  const pool = wp.pool();
  const challengeTests = testData[num];

  const runProgramPrms = (async () => {
    const program = replaceConsoleLogs(code) + runnerScript;
    const workerpoolResult = await pool.exec(runProgram, [
      program,
      code,
      challengeTests,
      responses,
      lintRules,
    ]);
    return workerpoolResult;
  })();

  let result;
  try {
    result = await Promise.race([timeoutError(), runProgramPrms]);
  } catch (e) {
    // Case: Not reachable as a error in submitted code, this is a true 500 error
    result = { testsPassed: false, message: 'There was an unexpected error.' };
  }
  pool.terminate(true);
  return result;
};
