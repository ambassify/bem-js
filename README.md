# BEM-JS [![Circle CI](https://circleci.com/gh/bubobox/concat-js/tree/master.svg?style=svg&circle-token=512452848019d7bf350ad30579e6930414a2fd5f)](https://circleci.com/gh/bubobox/concat-js/tree/master)

Library that we use to automatically add BEM(Block Element Modifier) prefixes to class names.

## Why

[Read this issue](https://github.com/bubobox/components/issues/93)

## Usage
	
	//first require the package
	var bem = require('bem-js');
	
	//choose a class where you want to add a modifier
	var cl = BEM.block("bbbxc-button");
	
	//modified class
	var mod = cl.mod("color-warning");
