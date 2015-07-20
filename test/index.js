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

    it( 'BEM should add bbbxc-menuitem after a classname', function() {
		var cl = BEM.block("bbbxc-menu");
		cl.afters = ['bbbxc-menuitem'];
        var af = cl.after();
        assert.equal(af.toString(), 'bbbxc-menu bbbxc-menuitem');
    });

    it( 'BEM should add bbbxc-menuitem before a classname', function() {
		var cl = BEM.block("bbbxc-menuitem__button");
		cl.befores = ['bbbxc-menuitem'];
        var af = cl.after();
        assert.equal(af.toString(), 'bbbxc-menuitem bbbxc-menuitem__button');
    });

});