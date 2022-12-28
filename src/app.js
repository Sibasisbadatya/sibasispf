const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const validator = require("validator");
const User = require("./models/model");
const port = process.env.PORT || 8000;

require("./db/conn");
const staticPath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials("partialspath");
console.log(__dirname);
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/signup", (req, res) => {
    res.render("signup");
});
app.post("/signup", async (req, res) => {

    try {
        const password = req.body.password;
        const name = req.body.username;
        const email = req.body.email;
        const rpassword = req.body.rpassword;
        const database = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            rpassword: req.body.rpassword,
        })
        console.log("emailcheck");
        let useremailcheck = await User.findOne({ email: email });

        if (useremailcheck) {
            res.render("error");
        }
        else if (password === rpassword) {
            res.render("main");
            let registered = await database.save();
        }
        else {
            res.render("error");
        }
    } catch (error) {
        res.status(400).json(error);
    }
})
app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login", async (req, res) => {
    const password = req.body.password;
    const name = req.body.username;
    const email = req.body.email;
    let usernamechecked = await User.findOne({ email: email });
    console.log("logging check")
    if (usernamechecked) {
        console.log("login data matched");
        res.render("main");
    }
    else {
        res.render("error");
    }
})
app.listen(port, () => {
    console.log(`connected to port ${port}`);
});
