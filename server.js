import express from "express";
import pg from "pg";
import axios from "axios";
import {locationApiKey as locationApiKey} from "./locationKey.js";




const locationApiUrl = " https://api.ipbase.com/v2/info"; 
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
    try{
        var locationResponse = await axios.get(locationApiUrl);
        var timeZone = locationResponse.data.data.timezone.code;
        var city = locationResponse.data.data.location.city.name;
        var country = locationResponse.data.data.location.country.name;
    } catch (error){
        console.log(error);
    }
    
    //console.log(locationResponse.data.data);
    
    res.render("index.ejs",{
       timezone: timeZone,
       city: city,
       country: country
    });
})






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });