/// <reference path="MessageEnvelope.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CommandEnvelope = (function (_super) {
    __extends(CommandEnvelope, _super);
    function CommandEnvelope() {
        _super.apply(this, arguments);
    }
    return CommandEnvelope;
})(MessageEnvelope);
