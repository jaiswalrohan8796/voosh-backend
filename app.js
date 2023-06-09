//requires
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");

//imports
const userRoutes = require("./routes/userRoutes.js");

//config
const PORT = process.env.PORT || 3000;
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

//routes
app.use(userRoutes);

//server
mongoose
    .connect(process.env.mongodbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`Connected to MongoDB.`);
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}.`);
        });
    })
    .catch((e) => console.log(e));
