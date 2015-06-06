var MessageEnvelope = (function () {
    function MessageEnvelope() {
    }
    Object.defineProperty(MessageEnvelope.prototype, "Data", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageEnvelope.prototype, "ID", {
        set: function (data) {
            this.data = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageEnvelope.prototype, "MessageTypeID", {
        get: function () {
            return this.messageTypeID;
        },
        set: function (messageTypeID) {
            this.messageTypeID = messageTypeID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageEnvelope.prototype, "MessageID", {
        get: function () {
            return this.messageID;
        },
        set: function (messageID) {
            this.messageID = messageID;
        },
        enumerable: true,
        configurable: true
    });
    return MessageEnvelope;
})();
