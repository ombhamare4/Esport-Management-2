const express = require('express');
const app = express();
const bodyParser = require('body-parser')


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = "mongodb+srv://webRubik:test'OR'a'='a'@web-db.qjovo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";



MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
    // if(err) throw err;
    const db = client.db("esportmanagement");
    const usersCollection = db.collection("users");
    const adminAccount = db.collection("admin");
    console.log("MongoDb Working...");

    //login user 
    app.post('/loginUser',(req, res) => {
        const teamName = req.body.teamName;
        const password = req.body.password;
        usersCollection.find({teamName: teamName, password: password}).toArray().then(result => {
            console.log("User Found");
            res.redirect('/');
        }).catch(error => console.error(error));
    });


    app.post('/signupUser', (req, res) => {
        usersCollection.insertOne({
            teamName: req.body.teamName,
            password: req.body.password,
            totalTeamFinish: { type: Number, default: 0 },
            highestTeamFinish: { type: Number, default: 0 },
            totalWins: { type: Number, default: 0 },
            players: {
                playerOne:
                {
                    ign: req.body.playerOneName,
                    bgmiID: req.body.playerOneID,
                    highestFinish: { type: Number, default: 0 },
                    totalFinish: { type: Number, default: 0 }
                },
                playerTwo:
                {
                    ign: req.body.playerTwoName,
                    bgmiID: req.body.playerTwoID,
                    highestFinish: { type: Number, default: 0 },
                    totalFinish: { type: Number, default: 0 }
                },
                playerThree:
                {
                    ign: req.body.playerThreeName,
                    bgmiID: req.body.playerThreeID,
                    highestFinish: { type: Number, default: 0 },
                    totalFinish: { type: Number, default: 0 }
                },
                playerFour:
                {
                    ign: req.body.playerFourName,
                    bgmiID: req.body.playerFourID,
                    highestFinish: { type: Number, default: 0 },
                    totalFinish: { type: Number, default: 0 }
                },
                playerFive:
                {
                    ign: req.body.playerFiveName,
                    bgmiID: req.body.playerFiveID,
                    highestFinish: { type: Number, default: 0 },
                    totalFinish: { type: Number, default: 0 }
                },
                playerSix:
                {
                    ign: req.body.playerSixName,
                    bgmiID: req.body.playerSixID,
                    highestFinish: { type: Number, default: 0 },
                    totalFinish: { type: Number, default: 0 }
                }
            }
        })
            .then(result => {
                res.redirect('/home')
            })
            .catch(error => console.error(error))

    });

    //all teams information display (only to admin)
    app.get('/adminTeam', (req, res) => {
        usersCollection.find().toArray().then(result => {
            console.log(result);
            res.render('adminTeamDetails.ejs', { teamInfo: result });
        }).catch(error => console.error(error))

    });

    //team information edit page (only to admin)
    app.get('/editTeamInfo/:id', (req, res) => {
        const objId = ObjectId(req.params.id);
        usersCollection.find({ "_id": objId }).toArray().then(result => {
            res.render('adminTeamEdit.ejs', { teamInfo: result[0] });
        }).catch(error => console.error(error))
    });

    //team information update (only to admin)
    app.post('/updateTeamInfo/:id', (req, res) => {
        const objId = ObjectId(req.params.id);
        usersCollection.findOneAndUpdate(
            { _id: objId },
            {
                $set: {
                    teamName: req.body.teamName,
                    totalTeamFinish: {
                        default: req.body.totalTeamFinish
                    }
                }
            },
            {
                upsert: true
            }

        )
        res.redirect('/adminTeam');
    });



});

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