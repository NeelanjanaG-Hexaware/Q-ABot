const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const path = require('path')
var fs = require('fs'); 
const { request } = require('http');

const PORT=3001

app.get('/people/:parameter',(req,res)=>{
    const dir = path.join(__dirname, '../people/people.json')
    var contents = fs.readFileSync(dir);
    var jsonContent = JSON.parse(contents);
    const inp =req.params.parameter;
    //const sp = inp.split(" ");
    var arr=["john","aames","millard","bhupathi","abraham","ulysses","grover","theodore roosevelt", "gerald ford","Beckham"]
    arr.forEach(element => {
        console.log(element) 
        if(inp==element){
            const a = jsonContent[element];
            console.log(a)
            //console.log(res.request._header);
            res.send("<h2> Question</h2> &nbsp<h3>"+inp+ "</h3><br><h2>Answer:</h2> <br><p>"+a+"</p>");
            res.end();
        }
    });  
})

app.post('/people/login',(req,res)=>{
    const user = {
        username : '54039',
        password : 'neel@54039'
    }
    jwt.sign({user},'secretkey',(error,token)=>{
        res.json({
            token
        });
    });
});

//Authorization: Bearer <access_token>
function verifytoken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        console.log(bearer)
        const bearerToken = bearer[1];
        console.log(bearerToken)
        req.token = bearerToken;
        next()
    }
    else{
        res.sendStatus(403);
    }
}



app.get('/sample',(req,res,next) =>{
    res.send("sample hello")
})

app.listen(PORT, () => {
    console.log("app runs on "+PORT)
})