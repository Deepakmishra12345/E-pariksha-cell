var express = require("express");

var bodyParser = require("body-parser");
var mongoose = require("mongoose")

const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/e-ParikshaCell',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));

// Student dbs
app.post("/sign_up",(req,res)=>{
    var txt = req.body.txt;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "name": txt,
        "email": email,
        "password": password
    }

    db.collection('student').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record Inserted Successfully");
    });

    return res.redirect('log.html')
})

app.get("/login",(req,res) =>{
    res.render("login");
})

// login check
app.post("/login",async(req,res) =>{
    try {
        const email = req.body.email;
        const password=req.body.password;

        const useremail = await db.collection('student').findOne({email:email});
        if(useremail.password === password){
            // res.status(201).render("index");
            return res.redirect('box1.html')
        }else{
            res.send("Invalid login Details");
        }
        
    } catch (error) {
        res.status(400).send("Invalid login Details")
        
    }
})

// / admin login check
app.post("/sig_up",async(req,res) =>{
    try {
        const name = req.body.name;
        const password=req.body.password;

        const username = await db.collection('admin').findOne({name:name});
        if(username.password === password){
            // res.status(201).render("index");
            return res.redirect('admin option page.html')
        }else{
            res.send("Invalid login Details");
        }
        
    } catch (error) {
        res.status(400).send("Invalid login Details")
        
    }
})

// / faculty login check
app.post("/signh_down",async(req,res) =>{
    try {
        const name = req.body.txtEmail;
        const password=req.body.txtPassword;

        const username = await db.collection('faculty').findOne({username:name});
        if(username.password === password){
            // res.status(201).render("index");
            return res.redirect('facultyform.html')
        }else{
            res.send("Invalid login Details");
        }
        
    } catch (error) {
        res.status(400).send("Invalid login Details")
        
    }
})
// contact us data

app.post("/contact",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;

    var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "message": message
    }

    db.collection('contact').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record Inserted Successfully");
    });

    return res.redirect('index.html')
})

// / contact us data

app.post("/complaint",(req,res)=>{
    var name = req.body.student_name;
    var phone = req.body.mobile_no;
    var email = req.body.email_id;
    var gender = req.body.student-gender;
    var div = req.body.student-div;
    var year = req.body.student-year;
    var br = req.body.student-br;
    var message = req.body.message;

    var data = {
        "name": name,
        "phone": phone,
        "email": email,
        "gender": gender,
        "division": div,
        "year": year,
        "branch": br,
        "message": message,
    }

    db.collection('complaints').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record Inserted Successfully");
    });

    return res.redirect('index.html')
})

// Signup dbs
app.post("/sigin",(req,res)=>{
    // var txt = req.body.txt;
    var email = req.body.email;
    var password = req.body.password;
    var password1 = req.body.passwordCh;

    var data = {
        // "name": txt,
        "email": email,
        "password": password,
        "password1": password1


    }
    if(password === password1){
        // res.status(201).render("index");
        // return res.redirect('box1.html')
        db.collection('signin').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("record Inserted Successfully");
        });
    }else{
        res.send("Invalid login Details");
    }
   

    return res.redirect('link.html')
})

app.get("/login1",(req,res) =>{
    res.render("login1");
})

// login check
app.post("/login1",async(req,res) =>{
    try {
        const email = req.body.email;
        const password=req.body.password;

        const useremail = await db.collection('signin').findOne({email:email});
        if(useremail.password === password){
            // res.status(201).render("index");
            return res.redirect('https://search-ai.netlify.app/')
        }else{
            res.send("Invalid login Details");
        }
        
    } catch (error) {
        res.status(400).send("Invalid login Details")
        
    }
})

app.post("/contactus1",(req,res)=>{
    // var name = req.body.name;
    var email = req.body.email;
    var query = req.body.query;
    
   
    // var message = req.body.message;
    
    var feedback1 = req.body.feedback1;
    var feedback2 = req.body.feedback2;
    

    var data = {
        // "name": name,

        "email": email,
        "query": query,
        "cb1": yes,
        "cb2":yes,
       "feedback1":feedback1,
       "feedback2":feedback2
    }

    db.collection('contactus1').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record Inserted Successfully");
    });

    return res.redirect('link.html')
})

//subscribe home page 
app.post("/subcribe",(req,res)=>{
    var email = req.body.email;

    var data = {
        "email": email,
    }

    db.collection('subscribe').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record Inserted Successfully");
    });

    return res.redirect('index.html')
})


app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on port 3000");