const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

const MONGODB = process.env.MONGODB;
const indexRoutes = require("./routes/");
const authorRoutes = require("./routes/authors");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

mongoose.set("useUnifiedTopology", true);
mongoose.connect(`${MONGODB}`, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDb"));

app.use("/", indexRoutes);
app.use("/authors", authorRoutes);

app.listen(process.env.PORT || 3000);
