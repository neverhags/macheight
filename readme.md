# Mach Eight Test

## Installing
This proyect has made with nodeJS. You can install this project using:
```
npm install
```

*note: using node 14.18.1* <br/><br/>


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
