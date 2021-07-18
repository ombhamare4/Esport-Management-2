const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://webRubik:test'OR'a'='a'@web-db.qjovo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("esportmanagement").collection("users");
//   // perform actions on the collection object
//   client.close();
//   console.log("MongoDB Working")
// });
app.use(bodyParser.urlencoded({ extended: true }))

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://webRubik:test'OR'a'='a'@web-db.qjovo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
    // if(err) throw err;
    const db = client.db("esportmanagement");
    const usersCollection = db.collection("users")
    console.log("MongoDb Working...");
    // var myVar = { teamName:"Soul",password:"8378199",totalFinish:101,highestFinish:78};
    // db.collections('users').insertOne(myVar,function(err,res){
    //     if(err) throw err;
    //     console.log("Document Inserted");
    //     client.close();
    // });

    app.post('/signupUser', (req, res) => {
        usersCollection.insertOne({ teamName: req.body.teamName, 
            password: req.body.password, 
            totalTeamFinish:{type: Number, default: 0}, 
            highestTeamFinish:{type: Number, default: 0 },
            players:{
                playerOne:
                {
                    ign:req.body.playerOneName, 
                    bgmiID:req.body.playerOneID,
                    highestFinish:{type: Number, default: 0},
                    totalFinish:{ type: Number, default: 0}
                },
                playerTwo:
                {
                    ign:req.body.playerTwoName, 
                    bgmiID:req.body.playerTwoID,
                    highestFinish:{type: Number, default: 0},
                    totalFinish:{ type: Number, default: 0}
                },
                playerThree:
                {
                    ign:req.body.playerThreeName, 
                    bgmiID:req.body.playerThreeID,
                    highestFinish:{type: Number, default: 0},
                    totalFinish:{ type: Number, default: 0}
                },
                playerFour:
                {
                    ign:req.body.playerFourName, 
                    bgmiID:req.body.playerFourID,
                    highestFinish:{type: Number, default: 0},
                    totalFinish:{ type: Number, default: 0}
                },
                playerFive:
                {
                    ign:req.body.playerFiveName, 
                    bgmiID:req.body.playerFiveID,
                    highestFinish:{type: Number, default: 0},
                    totalFinish:{ type: Number, default: 0}
                },
                playerSix:
                {
                    ign:req.body.playerSixName, 
                    bgmiID:req.body.playerSixID,
                    highestFinish:{ type: Number, default: 0},
                    totalFinish:{ type: Number, default: 0}
                }}})
            .then(result => {
                console.log(result)
                res.render('home.ejs')
            })
            .catch(error => console.error(error))

    });
});

// const mongoose = require('mongoose');

// mongoose.connect(url, { useNewUrlParser: true });
// const con = mongoose.connection;
// con.on('open', function (err, client) {
//     console.log("Mongoose working")
// });



app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/signup', (req, res) => {
    res.render('signup.ejs');
});



app.get('/standing', (req, res) => {
    res.render('standing.ejs');
});

app.get('/tournamet', (req, res) => {
    res.render('tournamet.ejs');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Port Working...");
});