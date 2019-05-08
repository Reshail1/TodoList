//Imports
const http = require("http");
const app  = require("./backend/app");

//Declarations
const server = http.createServer(app);
const port = process.env.PORT || 3000;


//Listening
server.listen(port,()=>{
    console.log("Server is listening at Port : " + port);
});