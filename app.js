const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/img',express.static(__dirname + 'public/img'));

app.set('views','./views');
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('home.ejs');
})

app.get('/login',(req,res)=>{
    res.render('login.ejs');
})

app.get('/signup',(req,res)=>{
    res.render('signup.ejs');
})

app.get('/standing',(req,res)=>{
    res.render('standing.ejs');
})

app.get('/tournamet',(req,res)=>{
    res.render('tournamet.ejs');
})

const port= process.env.PORT || 3000;
app.listen(port,function() {
    console.log("Port Working...");
})