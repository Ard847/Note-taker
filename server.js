const express = require("express")
const fs = require("fs")
const path = require("path")
let server = express()
let port = 3000

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.resolve("Develop/public")));

let dbData;
server.get("/api/notes",(req,res) =>{
    fs.readFile('./develop/db/db.json',(err,data) => {
        if(err){
            console.log(err)
            return 
        }
        dbData = JSON.parse(data)
        console.log(dbData)
        res.send(dbData)
    })
})

server.get("/api/notes/:id",(req,res) =>{
    res.json(notes[Number(req.params.id)]);
}) 


server.post("/api/notes",(req,res)  =>{
    req.body.id = (dbData.length).toString()
    dbData.push(req.body)
    fs.writeFile('./develop/db/db.json',JSON.stringify(dbData),(err) => {
        if(err){
            console.log(err)
            return
        }
        console.log("saved sucessfully ")
        
    })
    res.json(dbData)
})

 server.delete("/api/notes/:id",(req,res) => {
    console.log("here")
    fs.readFile('./develop/db/db.json',(err,data) => {
        if(err){
            console.log(err)
            return 
        }
        dbData = JSON.parse(data)
        dbData = dbData.filter((value) => value.id !=  req.params.id)
        fs.writeFile('./develop/db/db.json',JSON.stringify(dbData),(err) => {
            if(err){
                console.log(err)
                return
            }
            console.log("deleted sucessfully ")
        })
        res.json(dbData)
    })     
}) 

server.get("/notes",(req,res) =>{
  res.sendFile(path.resolve("./Develop/public/notes.html"))
})

server.get("*",(req,res) => {
    res.sendFile(path.resolve("./Develop/public/index.html"))
})


server.listen(port, ()=>{
    console.log("I am listining in port ",port)
})