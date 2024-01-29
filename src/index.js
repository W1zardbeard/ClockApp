import $ from "jquery";
import axios from "axios";
const quoteApiUrl = "https://api.quotable.io"; 

$( document ).ready(function() {
   

  
});


async function getQuote(){
    var quoteResponse = await axios.get(quoteApiUrl + "/random");
    var quote = quoteResponse.data.content;
    var author = quoteResponse.data.author;
    $(".quoteText").text('"' + quote + '"');
    $(".author").text(author);
   
}

getQuote();



$(".refresh").on("click", function(){
    getQuote();
})

