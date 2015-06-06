/// <reference path="Guid.ts" />
var ConvletMessage = (function () {
    function ConvletMessage() {
        //http://stackoverflow.com/questions/26501688/a-typescript-guid-class
        //Server will replace all client-generated GUIDs and respond with the updated command as part of a success response.
        this.ID = this.CreateGuid();
    }
    ConvletMessage.prototype.CreateGuid = function () {
        return Guid.newGuid();
    };
    Object.defineProperty(ConvletMessage.prototype, "ID", {
        get: function () {
            return this.id;
        },
        set: function (id) {
            this.id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConvletMessage.prototype, "TypeID", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    return ConvletMessage;
})();
