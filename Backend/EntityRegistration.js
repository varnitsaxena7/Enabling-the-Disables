const express=require("express");
const mongoose=require("mongoose");
const app=express();
const path=require('path');
// app.listen(3000);
app.use(express.json());

//Basic DataBase Setup
const database_link="mongodb+srv://010DBMS:YFnDT1Wc7UTfjrXE@010-dbms.dmcnpui.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(database_link).then(()=>{
    console.log("DataBase Connected!");
}).catch(()=>{
    console.log("DataBase Connection failed!");
});

// const EntitySchema=mongoose.Schema({

// });

// Registeration Setup

const EntityRegistrationRoute=express.Router();

app.use("/register",EntityRegistrationRoute);

EntityRegistrationRoute.route("/").get(sendRegistrationPage).post(RegisterEntity);

const EntityDataBase=mongoose.model('entityDataBase',EntitySchema);

function sendRegistrationPage(req,res){
    res.sendFile(path.join(__dirname,"../Frontend/entityRegister.html"));
}

async function RegisterEntity(req,res){
    
    let newEntity=req.body;

    try{
        await createEntity(newEntity);
        console.log("Registeration Successfull!");
        res.status(200).json({message:"Success"});
    }
    catch(err){
        console.log(err);
        console.log("Registeration Failed!");
        res.status(500).json({message:"Failure"});
    }
};

async function createEntity(EntityDetails){
    let result=await EntityDataBase.create(EntityDetails);
    console.log(result);
};

module.exports={EntityDataBase,EntityRegistrationRoute};
