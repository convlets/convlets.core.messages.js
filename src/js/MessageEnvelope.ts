class MessageEnvelope
{
  	private data: string;
    get Data() : string {
        return this.data;
    }
    set ID(data : string) {
        this.data = data;
    }	

	private messageTypeID: string;
    get MessageTypeID() : string {
        return this.messageTypeID;
    }
    set MessageTypeID(messageTypeID : string) {
        this.messageTypeID = messageTypeID;
    }	

	private messageID: string;
    get MessageID() : string {
        return this.messageID;
    }
    set MessageID(messageID : string) {
        this.messageID = messageID;
    }    
}