"use strict";

;(function (name, context, definition) {
    if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); }
    else if (typeof define === 'function' && define.amd) { define(definition); }
    else if (typeof exports === 'object' ) { exports = definition(); }
    else { context[name] = definition(); }
})('BEM', this, function () {

    function Block(blockName, modifiers, befores, afters) {
        this.modifiers = modifiers || [];
        this.befores = befores || [];
        this.afters = afters || [];
        this.name = blockName;
    }

    Block.factory = function (blockName, modifiers, befores, afters) {
        return new Block(blockName, modifiers, befores, afters);
    };

    Block.clone = function (block) {
        if (!(block instanceof Block)) {
            return;
        }

        return new Block(
            block.name,
            block.modifiers.slice(),
            block.befores.slice(),
            block.afters.slice()
        );
    };

    Block.prototype.el = function (el) {
        var block = Block.clone(this);

        block.name += "__" + el;

        return block;
    };

    Block.prototype.mod = function () {
        var block = Block.clone(this);

        for (var i = 0; i < arguments.length; i++) {
            block.modifiers.push(arguments[i]);
        }

        return block;
    };

    Block.prototype.cmod = function (condition) {
        if (!condition || arguments.length < 2) {
            return this;
        }

        // All the arguments minus the condition
        var modifiers = Array.prototype.slice.call(arguments, 1);

        return this.mod.apply(this, modifiers);
    };

    Block.prototype.before = function () {
        var block = Block.clone(this);

        for (var i = 0; i < arguments.length; i++) {
            var b = arguments[i];

            if (b instanceof Block) {
                b = b.toString();
            }

            if (typeof b === 'string') {
                block.befores.push(b);
            }
        }

        return block;
    };

    Block.prototype.after = function () {
        var block = Block.clone(this);

        for (var i = 0; i < arguments.length; i++) {
            var b = arguments[i];

            if (b instanceof Block) {
                b = b.toString();
            }

            if (typeof b === 'string') {
                block.afters.push(b);
            }
        }

        return block;
    };

    Block.prototype.toString = function () {
        var blockName = this.name,
            result = "";

        if (this.befores.length) {
            result += this.befores.join(" ") + " ";
        }

        result += blockName;

        if (this.modifiers.length) {
            result += " ";
            result += this.modifiers.map(function (mod) { return blockName + "--" + mod; }).join(" ");
        }

        if (this.afters.length) {
            result += " ";
            result += this.afters.join(" ");
        }

        return result;
    };


    return {
        Block: Block,
        block: Block.factory
    };
});
