//To Satrt --> nodemon index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const mongoDB = 'mongodb+srv://raguram:8680@Panchu@cluster0.ilzd5bf.mongodb.net/?retryWrites=true&w=majority';
const mongoDB = 'mongodb+srv://raguram:8680@Panchu@cluster0.ilzd5bf.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser : true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error :'));

const familySchema = new mongoose.Schema({
    name : String,
    age : Number,
    role : String
})

const Family = mongoose.model('Family', familySchema)

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 1200;
// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }).then(() => {
//     console.log(`connection successful`);
// })
// .catch((err) => {
//     console.log(`no connection`);
// })

// const family = [
//     { name: "Pandi Moorthy", age: 56, role:"Father"},
//     { name: "Panchavarnam", age: 45, role:"Mother"},
//     { name: "Guberalakshaman", age: 24, role:"Brother"},
//     { name: "Pandi Ramya Bharathy", age: 22, role:"Sister"},
//     { name: "Ganesh Ramar", age: 24, role:"Me"}
// ]

app.get("/", (req, res) => {
    Family.find((err, family) => {
        console.log("Family :", family);
        res.json(family)
    });
})

app.get("/family/:id", (req, res) => {
    Family.findById(req.params.id, (err, family) => {
        res.json(family)
    })
})

app.post("/family", (req,res) => {
    const family = new Family({
        name: req.body.name,
        age: req.body.age,
        role: req.body.role
    })
    family.save((err) => {
        res.json(family)
    })
})

app.put("/family/:id", (req,res) => {
    Family.findByIdAndUpdate(req.params.id, req.body, (err) => {
        res.json({message: `Updated ${req.params.id} member data in family`})        
    });
})

app.delete("/family/:id", (req,res) => {
    Family.findByIdAndDelete (req.params.id, (err) => {
        res.json({message: `Deleted ${req.params.id} member data from family`})
    })
})

app.listen(port, () =>{
    console.log(`Here listening post is ${port}`)
})