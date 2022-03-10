const express = require('express')
const decodee = require("jwt-decode")
//import jwt_decode from "jwt-decode";
const router = express.Router()
const axios = require('axios')

const jwt = require('jsonwebtoken')
// const registery = require('./registery.json')
var t = " "
var o = " "
const h = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
//const p = "eyJ1c2VyIjp7InVzZXJuYW1lIjoiNTMzOTQiLCJwYXNzd29yZC"
const p = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
var abc =" "


router.all('/:auth/:parameter',function(req,res,next){
        var un = req.params.auth;
    var ab = req.params.parameter
    const sp = ab.split(" ");
    var oo = sp.length;
    console.log(oo)
    var arr=["describe", "what","tell", "is","about","what","are","where","me"]

    for(let i = 0; i<sp.length;i++){
        for(let j = 0; j<arr.length;j++){
            if(sp[i] === arr[j] ){
                console.log(sp[i])
                sp.splice(i,1)
            }
        }
    }
    console.log(sp)
    abc = sp[0];
    console.log(abc)  

        // arr.forEach(element=>{
        //     console.log(element)
        //     if(element === sp)
        //     {
        //         console.log(sp)
        //         sp.splice(element,1)
        //     }
        // })

        const user = {
            username : un,
            password : 'neel@54039'
        }
        
        jwt.sign({user},'secretkey',(error,token)=>{
           o = token
            console.log(token)
            var [header, payload, signature] = token.split(".")
            //res.json({
                var decoded = decodee(token);
                console.log(decoded)
                var res = payload.substring(0, 50);

                console.log(res)
                let count = 0;
                if(res !== p){
                    count++
                }
                console.log(count)
                if( un == "neel"){
                    
                    console.log("if condition *******")
                    next();   
                    
                }
                else{
                    console.log("You are not authorized user")
                    var data = "You are not authorized user";
                    res.status(420).send(data);   
                    res.end();   
                }
            //     token
            // });
       });
    // console.log(req.params.auth)
    
},
function(req,res,next){
    var un = req.params.auth;
    var ab = req.params.parameter
        console.log(abc,"dfghjk")
        
    if(abc == "john" || abc == "aames" || abc == "millard" || abc == "abraham" || abc == "ulysses" || abc == "grover" || abc == "theodore roosevelt" || abc == "woodrow wilson" || abc == "Beckham" || abc == "calvin coolidge" || abc == "gerald ford" || abc =="bhupathi"){
        console.log("abcccc",abc);
        axios.get('http://localhost:3001/people/'+req.params.parameter).then((response)=>{
            res.send(response.data)
        })  
    }
    else if(abc=="kangaroo" || abc=="turtle" || abc == "penguin" || abc == "elephant" || abc == "otter" || abc == "beetle" ){ 
        axios.get('http://localhost:3003/animal/'+abc).then((response)=>{
            res.send(response.data)
        })
        //.catch((error) => {console.log("error in calling")})
    }
    else if(abc=="Ghana" || abc=="Finland" || abc=="Liechtenstein" || abc == "Indonesia" || abc == "Singapore" || abc == "Qatar" || abc == "Egypt" || abc == "Romania"){
        axios.get('http://localhost:3002/countries/'+abc).then((response)=>{
            res.send(response.data)
            //res.data.headers['auth'];
        })
    }
    else{
        res.send("the data you are searching for doesnt exists")
    }
    
    
})
module.exports = router