const app = require("./app")

const dotenv = require("dotenv");
const { path } = require("./app");
const connectDatabase = require("./config/database")


// handling uncaught exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`)
    console.log('Shutting down the server due to handling uncaught exceptions');

    process.exit(1)

    
})


// Config
dotenv.config({path:'backend/config/config.env'})



// Connecting to database
connectDatabase()



const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})


// Unhandled Promise rejection 
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    
    server.close(()=>{
        process.exit(1);
    })
})