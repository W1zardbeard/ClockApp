import express from "express";
import pg from "pg";
import axios from "axios";


const apiUrl = "https://api.quotable.io"; 
const app = express();
const port = 3000;

// export const db = new pg.Client({
//     user: "postgres",
//     host: "localhost",
//     database: "clockApp",
//     password: "1234",
//     port: 5432,
//   });
//   db.connect();


app.use(express.static("public"));
app.use([express.json(), express.urlencoded({ extended: true })])



app.get("/", async (req, res) => {
    // const quote = await axios.get(apiUrl + "/random");
    // console.log(quote.data.content);
    res.render("index.ejs",{
       
    });
})






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });