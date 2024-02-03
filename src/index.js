import $ from "jquery";
import axios from "axios";

const quoteApiUrl = "https://api.quotable.io"; 
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
    } else{
        $("main").removeClass("daytimeBg");
        $("main").addClass("nighttimeBg");
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


// $(".btn").on("click", function(){
    
//     if(showBottom == false){
//         $(".bottomSheet").slideToggle("fast");
//         setTimeout(function(){
//             $(".quoteCont").addClass("hide");
           
//         }, 500);
        
//         showBottom = true;
//     } else{
//         $(".quoteCont").removeClass("hide");
        
//         setTimeout(function(){
//             $(".bottomSheet").slideToggle("fast");
//         }, 500);
//         showBottom = false;
//     }
// })

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

        
        
        showBottom = false;
    }
})