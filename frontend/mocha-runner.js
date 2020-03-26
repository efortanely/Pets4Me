var Mocha = require('mocha'),
fs = require('fs'),
path = require('path');
require('@babel/register')({ extensions: ['.js', '.jsx', '.ts', '.tsx'] });

const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)
 
  arrayOfFiles = arrayOfFiles || []
 
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })
 
  return arrayOfFiles
}

// Instantiate a Mocha instance.
var mocha = new Mocha();

var testDir = 'src/test';

// Add each spec file to the mocha instance
getAllFiles(testDir).filter(function(file) {
    // Only keep the .js files
    return file.includes('.spec');

}).forEach(function(file) {
    mocha.addFile(file)
});

// Run the tests.
mocha.run(function(failures) {
  process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there were failures
});

// const failures = await new Promise((resolve) => mocha.run(resolve));
