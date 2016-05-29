/**
 * Created by josh on 5/25/16.
 */
var Objects = require('./objects');

module.exports = {
    load: function(gram) {
        return gram.semantics().addOperation('toAST', {
            int: function (a) {
                return Objects.Integer.make(parseInt(this.interval.contents, 10));
            },
            float: function (a, _, b) {
                return Objects.Float.make(parseFloat(this.interval.contents, 10));
            },
            ident: function (a, b) {
                return Objects.Symbol.make(this.interval.contents, null);
            },
            str: function (a, text, b) {
                return Objects.String.make(text.interval.contents);
            },

            AddExpr: function (a, _, b) {
                return Objects.MethodCall.make(a.toAST(), 'add', b.toAST());
            },
            MulExpr: function (a, _, b) {
                return Objects.MethodCall.make(a.toAST(), 'multiply', b.toAST());
            },
            LtExpr: function (a, _, b) {
                return Objects.MethodCall.make(a.toAST(), 'lessThan',b.toAST());
            },
            LteExpr: function (a, _, b) {
                return Objects.MethodCall.make(a.toAST(), 'lessThanEqual',b.toAST());
            },
            GtExpr: function (a, _, b) {
                return Objects.MethodCall.make(a.toAST(), 'greaterThan',b.toAST());
            },
            GteExpr: function (a, _, b) {
                return Objects.MethodCall.make(a.toAST(), 'greaterThanEqual',b.toAST());
            },
            EqExpr: function (a, _, b) {
                return Objects.MethodCall.make(a.toAST(), 'equal',b.toAST());
            },
            NeExpr: function (a, _, b) {
                return Objects.MethodCall.make(a.toAST(), 'notEqual',b.toAST());
            },
            DefVar: function (_, ident) {
                return ident.toAST();
            },
            FunCall: function (a, _1, b, _2) {
                return Objects.FunctionCall.make(a.toAST(), b.toAST());
            },
            Arguments: function (a) {
                return a.asIteration().toAST();
            },
            Block: function (_1, b, _2) {
                return Objects.Block.make(b.toAST());
            },
            AssignExpr: function (a, _, b) {
                return Objects.MethodCall.make(a.toAST(), 'assign',b.toAST());
            },
            WhileExpr: function (_, a, b) {
                return Objects.WhileLoop.make(a.toAST(), b.toAST());
            },
            IfExpr: function (_, a, b) {
                return Objects.IfCond.make(a.toAST(), b.toAST());
            }
        });
    }
}