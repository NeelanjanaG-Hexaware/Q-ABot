const { response } = require('express');
const express = require('express')
const axios = require('axios')
const app = express()
const path = require('path')
const HOST = 'localhost'
const PORT=3003
var fs = require('fs'); 
var t = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiNTMzOTQiLCJwYXNzd29yZCI6IlJhbXlhQDUzMzk0In0sImlhdCI6MTYxOTUzOTI4NH0.vHa2WQ_iA8BQCWN48ma7Th5OWv_oCWhuvnOmIxRuy4Q"
function verifytoken(req,res,next){
    if(req.headers.auth == t){
        next()
    }
    else{
        res.send("unauthorized")
        //res.sendStatus(403);
        console.log("auth unsuccessfull in microservice");
    }
}

app.get('/animal/:parameter',function(req,res,next) {
    const dir = path.join(__dirname, '../animal/animal.json')
    var contents = fs.readFileSync(dir);
    var jsonContent = JSON.parse(contents);
    const inp2 = req.params.parameter
    console.log("entered")
    var arr=["leopard","kangaroo","penguin","elephant","otter","beetle","turtle"]; 
    arr.forEach(element => {
        console.log(element) 
        if(inp2==element){
            const a = jsonContent[element];
            console.log(a)
            //console.log(res.request._header);
            res.send("<h2> Question</h2> &nbsp<h3>"+inp2+ "</h3><br><h2>Answer:</h2> <br><p>"+a+"</p>");
            res.end();
        }
    })
})

app.listen(PORT, () => {
    
    
    console.log("app runs on 3003")
})