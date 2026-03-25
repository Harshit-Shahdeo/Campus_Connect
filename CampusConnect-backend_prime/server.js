const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./config/dbConnection");
connectDb();


const port = process.env.PORT || 5001;
app.use(express.json());
app.use("/api/reactions", require("./routes/reactionRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/commentRoutes"))

app.listen(port, () =>{
    console.log(`Server running on ${port}`);
})

