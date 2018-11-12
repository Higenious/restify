const restify   = require('restify');
const mongoose = require('mongoose');
const config    =  require('./config');


const  server =  restify.createServer();


//Middlewarer
server.use(restify.plugins.bodyParser());

server.listen(config.PORT,  ()=>{
    mongoose.connect(config.MONGODB_URI,{useNewUrlParser: true})
});

const db = mongoose.connection;

db.on('error',(err)=>{
    console.log(err);
})

db.once('open',()=>{
    require('./routes/customer')(server);
    console.log(`server Successfully starte on ${config.PORT}`);
});
