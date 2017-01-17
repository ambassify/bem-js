# BEMJS
[![Circle CI](https://circleci.com/gh/ambassify/concat-js/tree/master.svg?style=svg&circle-token=512452848019d7bf350ad30579e6930414a2fd5f)](https://circleci.com/gh/ambassify/concat-js/tree/master)

Library to generate [BEM](https://en.bem.info/methodology/naming-convention/) class names in javascript.

We built this library to be used on our [React](https://facebook.github.io/react/) projects to easily generate the CSS classnames that we required for our components. See the [example](#examples) for a usage with React. We also implemented [some optimizations](#optimizations) which should not be noticeable by anyone using this library but are specific to the React use-case.

## Install

```sh
npm install bemjs --save
```

## Usage

```js
// First require the package
var BEM = require('bemjs');

// Create a BEM block class
var button = BEM.block("button");
console.log(button.toString());
// button

// Add a modifier to the block
var buttonWarning = button.mod("warning");
console.log(buttonWarning + '');
// button button--warning
```

## Examples

We use this in conjunction with React to generate the CSS classnames for our components.

```js
import React from 'react';
import { block } from 'bemjs';

const bButton = block('button');
const bIcon = bButton.el('icon');
const bLabel = bButton.el('label');

class Button extends React.Component {
    render() {
        return (
            <button className={bButton}>
                <span className={bIcon} />
                <span className={bLabel}>
                    {this.props.children}
                </span>
            </button>
        );
    }
}
```

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
  Get the string representation of a the single most specific class generated using this Block.

## Optimizations

### immutable
The entire library is immutable, so each operation on a `Block` will result in a new `Block` being generated. This prevents unexpected side-effect from occuring, so you should never alter the properties of a `Block` instance.

### caching
When attempting to create a new `Block` instance that will result in a copy of an already existing instance we will return the old instance from an internal cache. Since `Block` is immutable this will generate the exact same classnames. This optimization prevents React from attempting to re-render each time the `className` is set to a new instance of `Block`.

```
var class1 = BEM.block('button');
var class2 = BEM.block('button');
class1 === class2; // true
```

## Contributing

If you have some issue or code you would like to add, feel free to open a Pull Request or Issue and we will look into it as soon as we can.

## License

We are releasing this under a MIT License.

## About us

If you would like to know more about us, be sure to have a look at [our website](https://www.ambassify.com), or our Twitter accounts [Ambassify](https://twitter.com/Ambassify), [Sitebase](https://twitter.com/Sitebase), [JorgenEvens](https://twitter.com/JorgenEvens)
