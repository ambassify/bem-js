"use strict";

;(function (name, context, definition) {
    if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); }
    else if (typeof define === 'function' && define.amd) { define(definition); }
    else if (typeof exports === 'object' ) { exports = definition(); }
    else { context[name] = definition(); }
})('BEM', this, function () {
    // This ensures that a block producing the same classes is also always
    // the exact same object. This allows for === comparisons to succeed
    // which is required for the PureRenderMixin used in our ReactJS projects.
    var cache = {};

    function Block(blockName, modifiers, befores, afters) {
        this.modifiers = modifiers || [];
        this.befores = befores || [];
        this.afters = afters || [];
        this.name = blockName;

        if( cache[this] )
            return cache[this];

        cache[this] = this;
    }

    Block.factory = function (blockName, modifiers, befores, afters) {
        return new Block(blockName, modifiers, befores, afters);
    };

    Block.clone = function (block, newBlock) {
        if (!(block instanceof Block) || !newBlock) {
            return;
        }

        return new Block(
            newBlock.name || block.name,
            newBlock.modifiers || block.modifiers,
            newBlock.befores || block.befores,
            newBlock.afters || block.afters
        );
    };

    Block.prototype.el = function (el) {
        return this.clone({
            name: this.name + '__' + el
        });
    };

    Block.prototype.mod = function () {
        var modifiers = this.modifiers.slice();

        for (var i = 0; i < arguments.length; i++) {
            modifiers.push(arguments[i]);
        }

        return this.clone({
            modifiers: modifiers
        });
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
        var befores = this.befores.slice();

        for (var i = 0; i < arguments.length; i++) {
            var b = arguments[i];

            if (b instanceof Block) {
                b = b.toString();
            }

            if (typeof b === 'string') {
                befores.push(b);
            }
        }

        return this.clone({
            befores: befores
        });
    };

    Block.prototype.after = function () {
        var afters = this.afters.slice();

        for (var i = 0; i < arguments.length; i++) {
            var b = arguments[i];

            if (b instanceof Block) {
                b = b.toString();
            }

            if (typeof b === 'string') {
                afters.push(b);
            }
        }

        return this.clone({
            afters: afters
        });
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

    Block.prototype.single = function() {
        var result = this.name;

        if( this.modifiers.length )
            result += '--' + this.modifiers[0];

        return result;
    }

    Block.prototype.clone = function(newBlock) {
        return Block.clone(this, newBlock);
    }


    return {
        Block: Block,
        block: Block.factory
    };
});
