import $ from "jquery";
import axios from "axios";

const quoteApiUrl = "https://api.quotable.io"; 


function time(){
    const now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    if(minutes < 10){
        $(".time").text(hours + ":" + "0" + minutes);
    } else{
        $(".time").text(hours + ":" + minutes);
    }
    

    if(hours >= 5 && hours < 12){
        $(".timeIndicator").text("Morning");
    } else if (hours >= 12 && hours < 18){
        $(".timeIndicator").text("Afternoon");
    }else if(hours >= 18 && hours < 24 ){
        $(".timeIndicator").text("Evening");
    } else if (hours < 5){
        $(".timeIndicator").text("Morning");
    }


    if(hours >= 5 && hours < 18){
        $(".dayIcon").attr("src", "../images/desktop/icon-sun.svg");
    } else{
        $(".dayIcon").attr("src", "../images/desktop/icon-moon.svg");
    }
}


async function getQuote(){
    var quoteResponse = await axios.get(quoteApiUrl + "/random");
    var quote = quoteResponse.data.content;
    var author = quoteResponse.data.author;
    $(".quoteText").text('"' + quote + '"');
    $(".author").text(author);
   
}



getQuote();
setInterval(time, 1000);




$(".refresh").on("click", function(){
    getQuote();
})

