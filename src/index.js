 /*jslint node: true */
"use strict";

(function (classes) {

    function Block(blockName, modifiers, befores, afters) {
        this.modifiers = modifiers || [];
        this.befores = befores || [];
        this.afters = afters || [];
        this.name = blockName;
    }
    Block.prototype.mod = function () {
        var mod = this.modifiers.slice();
        var befores = this.befores.slice();
        var afters= this.afters.slice();

        for (var _i = 0; _i < arguments.length; _i++) {
            mod.push(arguments[_i]);
        }
        return new Block(this.name, mod, befores, afters);
    };
    Block.prototype.cmod = function (condition) {
        var mod = this.modifiers.slice();
        var befores = this.befores.slice();
        var afters= this.afters.slice();

        for (var _i = 1; _i < arguments.length; _i++) {
            mod[_i - 1] = arguments[_i];
        }
        if (condition) {
            mod.push(arguments[_i]);
        }
        return new Block(this.name, mod, befores, afters);
    };
    Block.prototype.toString = function () {
        var blockName = this.name;
        var result = "";
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
    Block.prototype.el = function (el) {
        return new Block(this.name + "__" + el);
    };
    Block.prototype.after = function () {
        var other = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            other[_i - 0] = arguments[_i];
        }
        for (var i = 0; i < other.length; i++) {
            var o = other[i];
            if (o) {
                this.afters.push(o.toString());
            }
        }
        return this;
    };
    Block.prototype.before = function () {
        var mod = this.modifiers.slice();
        var befores = this.befores.slice();
        var afters= this.afters.slice();
        var other = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            other[_i - 0] = arguments[_i];
        }
        for (var i = 0; i < other.length; i++) {
            var o = other[i];
            if (o) {
                befores.push(o.toString());
            }
        }
        return new Block(this.name, mod, befores, afters);
    };

    function block(name) {
        return new Block(name);
    }

    classes.Block = Block;
    classes.block = block;
})(module.exports || (window.classes = {}));