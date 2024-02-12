import $ from "jquery";
import axios from "axios";

const quoteApiUrl = "https://type.fit/api/quotes"; 
var showBottom = false;
$(".bottomSheet").hide();
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
        $("main").removeClass("nighttimeBg");
        $("main").addClass("daytimeBg");

        $(".bottomSheet").removeClass("darkMode");
        $(".statCont h6").removeClass("statDarkmode");
        $(".statCont h2").removeClass("statDarkmode");
    } else{
        $(".bottomSheet").addClass("darkMode");
        $(".statCont h6").addClass("statDarkmode");
        $(".statCont h2").addClass("statDarkmode");

        $("main").removeClass("daytimeBg");
        $("main").addClass("nighttimeBg");
        $(".dayIcon").attr("src", "../images/desktop/icon-moon.svg");
    }
}


async function getQuote(){
    var quoteResponse = await axios.get(quoteApiUrl);
    var randomQuote = quoteResponse.data[(Math.floor(Math.random() * quoteResponse.data.length))];
    var quote = randomQuote.text;
    var author = randomQuote.author.split(",")[0];

    $(".quoteText").text('"' + quote + '"');
    $(".author").text(author);
   
}



getQuote();
setInterval(time, 1000);




$(".refresh").on("click", function(){
    getQuote();
})




$(".btn").on("click", function(){
    if(showBottom == false){
        $(".bottomSheet").removeClass("animate__slideOutDown");
        $(".bottomSheet").show();
        $(".bottomSheet").addClass("animate__slideInUp");

        $(".quoteCont").removeClass("animate__fadeIn");
        $(".quoteCont").addClass("animate__fadeOut");
        setTimeout(function(){
            $(".quoteCont").hide();
        }, 800);

        $(".btnArrow").addClass("btnArrowRot");
        $(".btnText").text("Less");

        showBottom = true;
    } else{
        $(".bottomSheet").removeClass("animate__slideInUp");
        $(".bottomSheet").addClass("animate__slideOutDown");
        setTimeout(function(){
            $(".bottomSheet").hide();
            $(".quoteCont").removeClass("animate__fadeOut");
            $(".quoteCont").show();
            $(".quoteCont").addClass("animate__fadeIn");
        }, 800);

        $(".btnArrow").removeClass("btnArrowRot");
        $(".btnText").text("More");
        showBottom = false;
    }
})