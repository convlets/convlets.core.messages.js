/// <reference path="Guid.ts" />

class ConvletMessage
{
	constructor()
	{
		//http://stackoverflow.com/questions/26501688/a-typescript-guid-class
		//Server will replace all client-generated GUIDs and respond with the updated command as part of a success response.
		this.ID = this.CreateGuid();
	}

	CreateGuid() : string{
		return Guid.newGuid();
	}

  	private id: string;
    get ID() : string {
        return this.id;
    }
    set ID(id : string) {
        this.id = id;
    }

    get TypeID(): string {
        return undefined;
    }
}