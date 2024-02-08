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
    var dayOfWeek;
    try{
        var timezoner = await axios.get("http://worldtimeapi.org/api/ip");
        var dayOfYear = timezoner.data.day_of_year;
        var weekNumber = timezoner.data.week_number;
        var dayNumber = timezoner.data.day_of_week;

        var locationResponse = await axios.get(locationApiUrl);
        var timeZone = locationResponse.data.data.timezone.code;
        var city = locationResponse.data.data.location.city.name;
        var country = locationResponse.data.data.location.country.name;
        var timezoneId = locationResponse.data.data.timezone.id;
    } catch (error){
        console.log(error);
    }

    switch (dayNumber){
        case 0:
            dayOfWeek = "Sunday";
            break;
        case 1:
            dayOfWeek = "Monday";
            break;
        case 2:
            dayOfWeek = "Tuesday";
            break;
        case 3:
            dayOfWeek = "Wednesday";
            break;
        case 4:
            dayOfWeek = "Thursday";
            break;
        case 5:
            dayOfWeek = "Friday";
            break;
        case 6:
            dayOfWeek = "Saturday";
            break;
        default: 
            dayOfWeek = "Error";
            break;
    } 
    console.log(timezoner.data);
    //console.log(locationResponse.data.data);
    
    res.render("index.ejs",{
       dayOfYear: dayOfYear,
       weekNumber: weekNumber,
       dayOfWeek: dayOfWeek, 
       timezoneId: timezoneId,
       timezone: timeZone,
       city: city,
       country: country
    });
})






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });