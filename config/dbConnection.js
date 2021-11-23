const Pool = require('pg').Pool
 const connection = new Pool({
   user: 'postgres',
   host: 'localhost',
   port: '5432',
   database: 'sigwitz',
   password: "root",
   
 });
 
connection.connect(function(err){
     if(err){
         console.log(err.message);
     }else{
         console.log("connected to database")
     }
 })
 module.exports=connection;
 
  
 
  
 
 
  