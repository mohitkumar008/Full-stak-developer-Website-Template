const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser');
const port = 80;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/node-demo");

app.use(express.static("public")); //for serving static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var nameSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    msg: String
  });

  var User = mongoose.model("User", nameSchema);


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post("/contact-form", (req, res) => {
    var myData = new User(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started succesfully on ${port}`)
})