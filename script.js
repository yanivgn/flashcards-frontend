let username;
let level;
let data;
let i = 0;


$("form").submit(function (e) {
    e.preventDefault();
    username = $("#name").val();
    level = $("#level").val();
    if (username == "" || level == null || level == "") {
        alert("נא הזינו שם משתמש ומספר שיעור");
        return false;
    }
    $("#setup").hide();
    $("#board").show();
    let url = `https://flashcards-5g44.onrender.com/username/${username}/level/${level}`;
    console.log(url);
    $.ajax({
        async: false,
        url: url,
        success: function (result) {
           data = result;
        }
    });
    nextQuestion();
});

$("#next").click(nextQuestion);

function nextQuestion(){
     $(".question").html(data[i]["arabic"]);

     $(".answer").each(function(j, el){
        if(j==0){
            $(el).html(data[i]["hebrew"]);
        }else{
            $(el).html(data[i]["wrong answers"][j-1]);
        }
     });
     i++;
}