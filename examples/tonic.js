// First require the package
var BEM = require('bemjs');

// Create a BEM block class
var button = BEM.block("button");
console.log(button.toString());

// Add a modifier to the block
var buttonWarning = button.mod("warning");
console.log(buttonWarning + '');
