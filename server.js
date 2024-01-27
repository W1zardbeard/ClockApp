import express from "express";
import pg from "pg";



const app = express();
const port = 3000;

export const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "webDevQuiz",
    password: "1234",
    port: 5432,
  });
  db.connect();


app.use(express.static("public"));
app.use([express.json(), express.urlencoded({ extended: true })])



app.get("/", (req, res) => {
 
    res.render("index.ejs",{
       
    });
})






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });