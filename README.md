# BEM-JS [![Circle CI](https://circleci.com/gh/bubobox/concat-js/tree/master.svg?style=svg&circle-token=512452848019d7bf350ad30579e6930414a2fd5f)](https://circleci.com/gh/bubobox/concat-js/tree/master)

Helper library to generate BEM class names.

## Why

[Read this issue](https://github.com/bubobox/components/issues/93)

## Usage

    //first require the package
    var BEM = require('bem-js');

    //choose a class where you want to add a modifier
    var cl = BEM.block("bbbxc-button");

    //add the modifier to the class
    var mod = cl.mod("color-warning");

## API

The library exposes two properties. `Block` which is the actual class and `block` which is an alias to `Block.factory` for easy creation of `Block` instances.

- `Block( name, modifiers, befores, afters )`  
  Create a new Block instance by using the `new` keyword. Only the first argument is required.

- `Block.factory( name, modifiers, befores, afters )`  
  Create a new Block instance by calling the factory method. Only the first argument is required.

- `Block.clone( block )`  
  Clone an existing block.

- `Block.prototype.el (el)`  
  Get a new block that is a BEM element of this block.

- `Block.prototype.mod (modifier[, modifier, ...])`  
  Get a new block that is a BEM modifier of this block. You can pass in as many arguments as you like, every argument will be seen as a modifier.


- `Block.prototype.cmod (condition, modifier[, modifier, ...])`  
  Get a new block that is a BEM modifier of this block if condition evaluates to `true`. You can pass in as many arguments as you like, every argument will be seen as a modifier.


- `Block.prototype.before (block[, block, ...])`  
  Get a new block that is the current block prefixed with another BEM block.You can pass in as many arguments as you like, every argument will be seen as a prefix block. Arguments can be instances of Block or strings.


- `Block.prototype.after (block[, block, ...])`  
  Get a new block that is the current block postfixed with another BEM block.You can pass in as many arguments as you like, every argument will be seen as a prefix block. Arguments can be instances of Block or strings.


- `Block.prototype.toString ()`  
  Get the string representation of this block

- `Block.prototype.single ()`  
  Get the string representation of a single class generated using BEM-JS.
