const { default: axios } = require('axios');
const express = require('express');
const res = require('express/lib/response');
let app = express();
const routes = require('./routes')
// const registry = require('./routes/registery.json')
const PORT = 3000

app.use(express.json())
app.use('/',routes)

// app.use('/hello',app1)

// function app1(){
//     console.log("app1")
//     res.send("done")
// }


app.listen(PORT, () => {
    console.log("port"+PORT)
})