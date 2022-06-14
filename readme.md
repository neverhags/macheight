# Mach Eight Test

## Installing
This proyect has made with nodeJS. You can install this project using:
```
npm install
```

*note: using node 18.3.0* <br/><br/>


## Getting Starting
You can use npm or run directly with node:
```
# npm start -- <INPUT>
npm start -- 139

# Or directly with node
# node start index.js <INPUT>
node index.js 139
``` 
It must show the result like this:

``` 
> macheight@1.0.0 start /e/Development/tests/MachEight
> node index.js "139"

[
  ' - Brevin Knight 70    69 Nate Robinson',
  ' - Mike Wilks 70    69 Nate Robinson'
]
``` 

## Testing 
The test are provided by Mocha, to run the test you must use:
```
npm test
```

## Linting 
The test are provided by eslint, to run the linter you must use:
```
npm run lint
```


# Test

### Mach Eight Sample Project

Thank you for taking the time to complete this sample project. We're a tech
first company and we value our engineers tremendously. We're are looking for
hard working, smart engineers with either excellent experience or lots of
potential.


## Project

The project is to write a function that searches through NBA player heights
based on user input. The raw data is taken from
[here](https://www.openintro.org/data/index.php?data=nba_heights).  The data is
served in json format by the endpoint
[here](https://mach-eight.uc.r.appspot.com/).

The task is to create an application that takes a single integer input. The
application will download the raw data from the website above
(https://mach-eight.uc.r.appspot.com) and print a list of all pairs of players
whose height in inches adds up to the integer input to the application. If no
matches are found, the application will print "No matches found"

Sample output is as follows:
```
> app 139

- Brevin Knight         Nate Robinson
- Nate Robinson         Mike Wilks
```

The algorithm to find the pairs must be faster than O(n^2). All edge cases
should be handled appropriately. This is _not_ a closed book test. You are
encouraged to reach out with any questions that you come across.

## Evaluation

All candidates who submit an algorithm that is efficient and correct will pass
to the next step of the interview process. We define "efficient" as faster than
O(n^2) and "correct" as returning the correct results for all possible inputs.
Any assignment that doesn't return the correct answer for the sample input
above (139) will fail.

If you feel the need to impress us by going above and beyond, we're impressed
by good unit tests as well as clean and readable code. We're less interested in
your knowledge of any particular framework (react, django, etc.). You're
welcome to create a full featured web app with pretty graphics if you want, but
that will not improve your chances of passing. There have been passing
assignments written in under 30 lines of python.


## Submission

The preferred form of submission is by publishing a public repo on github with
your code and a README file explaining how to run the code. We can also accept
an emailed zip file with the same contents.