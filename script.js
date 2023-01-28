let username;
let level;
let data;
let i = 0;
let score;


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

$("#next").click(function(){
    if(true){

    }else{

    }
    nextQuestion();
});

function nextQuestion() {
    $(".question").html(data[i]["arabic"]);

    let answers = [];
    answers.push(data[i]["hebrew"]);
    data[i]["wrong answers"].forEach(el => {
        answers.push(el);
    });

    answers = shuffle(answers);



    $(".answer").each(function (j, el) {
        $(el).html(answers[j]);
    });

    i++;
}


function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}