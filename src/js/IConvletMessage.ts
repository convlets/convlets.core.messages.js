interface IConvletMessage
{
	//http://stackoverflow.com/questions/26501688/a-typescript-guid-class
	//Server will replace all client-generated GUIDs and respond with the updated command as part of a success response.
   	ID : string;
   	TypeID: string;
}