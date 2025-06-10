import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://chatapp-backend.azurewebsites.net/chatHub")
  .configureLogging(signalR.LogLevel.Information)
  .build();

connection
  .start()
  .then(() => console.log("Connected to SignalR"))
  .catch((err) => console.error("Error connecting to SignalR:", err));

export default connection;
