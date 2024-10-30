const express = require ("express");
const app = express ();
const cors = require('cors');
const axios = require("axios")
app.use(express.json());
const db_connect = require("./connect_db");
app.use(cors({origin:true}));
require("dotenv").config();
//connexion db
db_connect();


//routes
app.use("/user", require("./routes/user"));
app.use("/film", require("./routes/film"));
app.use("/favori", require("./routes/favori"));
app.use("/filmdirect", require("./routes/filmdirect"));







//server
const PORT = process.env.PORT ;
app.listen( PORT , 
    (err) => err?console.log(err): console.log(`server is running on ${PORT}!`)
    );
