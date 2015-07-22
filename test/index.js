/*jshint node: true */
/* global describe, it */
"use strict";
var assert = require('assert'),
    BEM = require( "../src/index.js" ),
    Immutable = require('immutable');

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

    it( 'Should be immutable', function () {
    var block = BEM.block('block'),

        modifier1 = block.mod('modifier1'),
        modifier2 = block.cmod(true, 'modifier2'),

        block2 = block.before(BEM.block('block2')),
        block3 = block.after(BEM.block('block3'));
        
        // mod immutability
        assert(modifier1.modifiers.indexOf('modifier1') >= 0, 'modifier1 should be in modifier1');
        assert(modifier1.modifiers.indexOf('modifier2') === -1, 'modifier2 should not be in modifier1');

        // cmod immutability
        assert(modifier2.modifiers.indexOf('modifier1') === -1, 'modifier1 should not be in modifier2');
        assert(modifier2.modifiers.indexOf('modifier2') >= 0, 'modifier2 should be in modifier2');

        // before immutability
        assert(block2.befores.length === 1, 'block2 should have one before');
        assert(block3.befores.length === 0, 'block3 should have no befores');

        // after immutability
        assert(block2.afters.length === 0, 'block2 should have no befores');
        assert(block3.afters.length === 1, 'block3 should have one before');

        // block should still be the same as when created
        assert(block.modifiers.length === 0, 'block should have no modifiers');
        assert(block.before.length === 0, 'block should have no befores');
        assert(block.after.length === 0, 'block should have no afters');
    });

});