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

app.post('/authenticate', async (req,res)=>{
    const {username} = req.body;
    try {
        const r = await axios.put("https://api.chatengine.io/users/", 
            {username : username , secret : username , first_name: username},
            {headers : {'private-key' :'91ad7b9c-6825-4c6b-80fc-276b16122a56'}}
        )
        return res.status(r.status).json(r.data)
    } catch (e) {
        return res.status(e.response.status).json(e.response.data)   
    }  
})





//server
const PORT = process.env.PORT ;
app.listen( PORT , 
    (err) => err?console.log(err): console.log(`server is running on ${PORT}!`)
    );
