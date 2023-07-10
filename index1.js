const express = require("express");

const path = require("path")
const bodyParser = require("body-parser");
var mongoose = require("mongoose")

const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/contactUs',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const port = 8000;

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));

var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
});

var Contact = mongoose.model('Contact', contactSchema);

app.post('/contact', (req,res) => {
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=> {
        res.status(400).send("item was not saved to the database");
    });
    // return res.redirect('index.html');
})

app.listen(port, () => {
    console.log(`Server running at ${port}`);
  });
