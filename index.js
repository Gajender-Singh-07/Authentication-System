const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const otpgenerator = require("otp-generator");
const nodemailer = require('nodemailer');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/node_modules/bootstrap/dist/css/"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist/js/"));

myOtp = otpgenerator.generate(6,{ digits: true,upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false });

mongoose.connect("mongodb://localhost:27017/Auth")
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(err);
    })

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: "chauhangajendersingh40@gmail.com",
          pass: "yuxr bmyv zfko xrsy",
        },
    });
      
const dataSchema = new mongoose.Schema({
    User: String,
    Email: String,
    Password: String
})

app.use(session({
    secret: "Hello",
}));

app.use(flash());

const myCollection = new mongoose.model("person", dataSchema);

app.use(express.urlencoded({ extended: false }));

app.get("/login", (req, res) => {
    res.render("Login", {key: req.flash("key")});
})

app.get("/signup", (req, res) => {
    res.render("Signup");
})


app.get("/", (req, res) => {
    if (req.session.username) {
        res.render("Home", { user: req.session.username, email:req.session.email, password:req.session.password,message:req.flash("key") });
    }
    else {
        res.redirect("/login");
    }
});
app.post("/signin", (req, res) => {
    const { Email, Password } = req.body;
 myCollection.findOne({ Email })
        .then((result) => {
            if (Password == result.Password) {
                req.session.username = result.User;
                req.session.email = result.Email;
                req.session.password = result.Password;
                req.flash("key", "successfully logged in!");
                res.redirect("/");
            }
            else {
                req.flash("key", "Password not match");
                // console.log("Password not match");
            }
        })
        .catch((err) => {
        console.log(err);
    })
})

app.post("/submit", (req, res) => {
    myCollection.create(req.body).then((result) => {
        res.redirect("/login");
        console.log(result);
    })
        .catch((err) => {
            console.log(err);
        });
})


app.get("/verifyemail", (req, res) => {
    res.render("Everify");
})

app.post("/otpverify", (req, res) => {
    console.log(req.body);
    myCollection.findOne({ Email: req.body.Email })
        .then((result) => {
            async function main() {
                const info = await transporter.sendMail({
                    from: 'chauhangajendersingh40@gmail.com', // sender address
                    to: req.body.Email, // list of receivers
                    subject: "Otp for Update Password", // Subject line
                    html: "<h1>otp :-" + myOtp + "</h1>", // html body
                });
              
                console.log("Message sent: %s", info.messageId);
            }
              
            main().catch(console.error);
            
            // res.send("Otp send");
            res.render("OtpVerify",{id:result._id});

        })
        .catch((err) => {
            console.log(err);
        })
        res.render("Verifyotp",{id:req.body.id});
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
})

app.post("/changepass", (req, res) => {
    console.log(req.body);
    if (myOtp == req.body.myOtp) {
        res.render("ChangePassword",{id:req.body.id});
    } else {
        console.log("OTP not Verified");
}
})

app.post("/updatepass", (req, res) => {
    console.log(req.body);
    if (req.body.newpass == req.body.confirmpass) {
        myCollection.updateOne({ _id: req.body.id }, { $set: { Password: req.body.Cpass } })
            .then(() => {
                res.redirect("/");
            })
            .catch((err) => {
                console.log(err);   
            })
    }
    else {
        console.log("Password not match");
    }
});

app.get("*", (req, res) => {
    res.render("NotFound");
})

app.get("/logout", (req, res) => {
    res.send("logged out!");
})


app.listen(2000);