// install express :- npm i express 
// install knex :-  npm i knex 
// 1. How to create password mysql before connected js file to database.
//      code here :- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Pradeep@1234';

// 2. How to install packege .
//      code here :-  npm init -y   ( install packege.json )
//                    npm i mysql   (install packege-lock.json and mysql)
//                    (npm i -D nodemon or npm i nodemon --save-dev) // nodemon save autometecly devDependencies key in (package.json) file.

// 3. Go to the packege.json file and type ( "start":"nodemon" )in scripts key
//      "scripts": {
//          "test": "echo \"Error: no test specified\" && exit 1",
//          "start":"nodemon"   // run js file with npm start
//        }

// 4. how to run js file.
//      a)  npm start
//      b)  node (js file name)

// 5. how to install mysql server :- sudo apt-get install mysql-server

//  note :- if stop the runing terminal press (ctrl+c) becouse if you press (ctrl+c)
// not store port number but if we press (ctrl+z), stop the terminal but store the port number 
// if you you run again terminal after the crash port number so don't press (ctrl+z).
// It will be good if we press (ctrl+c).

const express = require("express")  // require express 
const app = express()
const knex = require("./connection/database") // import database.js file from connection folder
const port = 6000

app.use(express.json())     // use express object form  to convert into readable form 
                            // as a middleware   
//// .............show all user data.-------------------
app.get('/', async (req,res)=>{
    try {
        const data = await knex('students')
        res.send(data)      // show all user data on postman. 
        console.log(data);      // show all user data on terminal. 
    } catch (error) {
        res.send(error.message)
    }
})

// ------------ which user show data ? only one user data show.---------------- 
app.get('/which_students_data_find/:id', async (req,res)=>{
    try {
        const data = await knex('students').where({'id':req.params.id})
        res.send(data)
        console.log(data);
    } catch (error) {
        res.send(error.message)
    }
})

// ---------- login user here. only login with id. --------------------

app.get('/login/:id',async(req,res)=>{
    try{
        const data= await knex("students").where({'id':req.params.id})
        // res.send("login successful");
        res.send(data)
        console.log(data);
    }catch(err){
        res.send(err.message)
    }
})

// -------- new user insert/ signup with (name,email,password).-----------------
// new user insert on postman .show the output mysql database on terminal .
app.post("/insert", async(req, res)=>{
    try{
        const data = await knex("students").insert(req.body)
        // res.status(201).send({status:"created"})
        res.send('user signup successfully...')
        // res.send(data)
    }catch(err){
        res.send(err.message)
    }
})

// ---------------- update user data here.------------------------
// --------which user data want to update with id ? on postman .------------
app.put("/update/:id",async(req,res)=>{
    try{
        const data =await knex("students").where({'id':req.params.id}).update(req.body);
        res.send("updated students data...")
        console.log(data)
    }
    catch(err){
        res.send(err.message)
    }
})

// -------------- delete user data only with id .---------------------------
// postman and msql database on terminal . 
app.delete("/delete/:id",async(req,res)=>{
    try{
        const data =await knex("students").where({'id':req.params.id}).del(req.body);
        res.send("students data deleted successfully...")
    }catch(err){
        res.send(err.message)

    }
})

app.listen(port, ()=>{
    console.log("server is running on port ", port)
})