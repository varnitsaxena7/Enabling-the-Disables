const express=require("express");
const mongoose=require("mongoose");
const app=express();
const path=require('path');
// app.listen(3000);
app.use(express.json());

const InfoPageRoute=express.Router();
const {EntityDataBase}=require("./EntityRegistration");

app.use("/info/:id",InfoPageRoute);

InfoPageRoute.route("/").get(sendInfoPage).post(sendInfoResult);

function sendInfoPage(req,res){
    res.sendFile(path.join(__dirname,"../Frontend/searchPage.html"));
};
async function sendInfoResult(req,res){
    let DataBase=await EntityDataBase.find();
    res.send(DataBase);
}
module.exports={InfoPageRoute};