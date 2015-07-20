/*jshint node: true */
/* global describe, it */
"use strict";
var assert = require('assert'),
    BEM = require( "../src/index.js" );

describe('BEM::Constructor', function( done ){

	it( 'BEM should add color-warning modifier to a classname', function() {
		var cl = BEM.block("bbbxc-button");
        var mod = cl.mod("color-warning");
        assert.equal(mod.toString(), 'bbbxc-button bbbxc-button--color-warning');
    });

    it( 'BEM should add element to a classname', function() {
		var cl = BEM.block("bbbxc-button");
        var el = cl.el("view");
        assert.equal(el.toString(), 'bbbxc-button__view');
    });

});