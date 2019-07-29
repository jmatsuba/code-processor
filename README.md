# Code Processor
This is the code processor I built while working at Ligthhouse Labs.  

It tackles the hard issue of running untrusted user scripts on the server side and provides meaningful feedback to users if they were unable to pass the test suite for a challenge. 

It uses `vm2` to handle jailing the evaluation of usercode and `workerpool` for threading purposes and handling the infinite loop problem.  

## Getting Started

1. Clone the project
2. `npm i`
3. `npm start`
4. See below example of a request

## Example
Request (Passing Code)
```
PUT localhost:5000/process
  {
    "num": 1,
    "code": "function add(a,b) { return a + b; }"
  }
```

Response
```
{
    "testsPassed": true,
    "results": [
        {
            "name": "add(a,b) should return correct value",
            "hint": "make sure your function returns 2 for 1+1",
            "status": "passed",
            "failExplanation": {
                "failedReason": null,
                "failedTest": null,
                "expected": null,
                "actual": null
            }
        }
    ],
    "lintResults": [],
    "log": [
        "Running test: add(a,b) should return correct value "
    ]
}
```


Request (Failing Code)
```
PUT localhost:5000/process
  {
    "num": 1,
    "code": "function add(a,b) { return b; }"
  }
```

Response
```
{
    "testsPassed": false,
    "results": [
        {
            "name": "add(a,b) should return correct value",
            "hint": "make sure your function returns 2 for 1+1",
            "status": "failed",
            "failExplanation": {
                "failedReason": "Your code ran but did not produce the correct result.",
                "failedTest": "assert.equal(add(1,2), 3)",
                "expected": 3,
                "actual": 2
            }
        }
    ],
    "lintResults": [],
    "log": [
        "Running test: add(a,b) should return correct value "
    ]
}
```



Request (Failing Code, with a console.log)
```
PUT localhost:5000/process
  {
    "num": 1,
    "code": "function add(a,b) { console.log('hello'); return b; }"
  }
```

Response
```
{
    "testsPassed": false,
    "results": [
        {
            "name": "add(a,b) should return correct value",
            "hint": "make sure your function returns 2 for 1+1",
            "status": "failed",
            "failExplanation": {
                "failedReason": "Your code ran but did not produce the correct result.",
                "failedTest": "assert.equal(add(1,2), 3)",
                "expected": 3,
                "actual": 2
            }
        }
    ],
    "lintResults": [],
    "log": [
        "Running test: add(a,b) should return correct value ",
        "hello"
    ]
}
```
