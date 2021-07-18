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

const port= process.env.PORT || 3000;
app.listen(port,function() {
    console.log("Port Working...");
})