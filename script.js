let username = "anonymous", level, data, i = 0, score = 100, correctAnswer, input, selected, correct, wordId, audio, LeitnersHitRate;

window.addEventListener("message", (e) => {
    if (e.data.username) {
        username = e.data.username;
        $(".username").html(e.data.username);
    }
});

$(".username").html(username);

$(".lesson").click(function () {
    level = $(this).data("lesson");
    $("#setup").hide();
    $("#board").show();

    let url = `https://flashcards-5g44.onrender.com/username/${username}/level/${level}`;

    $.ajax({
        async: false,
        url: url,
        success: function (result) {
            data = result;
        }
    });

    $(".lesson-number").html(level);
    nextQuestion();
});

$("#next").click(function () {
    $('.leitners').hide();
    if (i == 10) {
        $("#board").hide();
        $("#finish").show();
        $(".grade span").html(score);
    }
    nextQuestion();
    $("#check").show();
    $("#next").hide();
});


$("#check").click(function () {
    $(".answer").off("click", selectAnswer);

    $("#check").hide();
    $("#next").show();

    if (input == correctAnswer) {
        selected.find(".fa-circle-check").show();
        selected.css("background-color", "lightgreen");
        if (username != "anonymous") {
            updateAnswer(username, wordId, true);
        }
    } else {
        score -= 10;
        selected.find(".fa-circle-xmark").show();
        selected.css("background-color", "#ff000042");
        correct.css("background-color", "lightgreen");
        correct.find(".fa-circle-check").show();
        if (username != "anonymous") {
            updateAnswer(username, wordId, false);
        }
    }
});

function nextQuestion() {

    $(".question-number span").html(i + 1);
    $(".answer").on("click", selectAnswer);

    $(".answer").css("background-color", "#F0F8FF");
    $(".answer .fa-regular").hide();

    $("#check").prop("disabled", true);
    $("#check").css("background-color", "lightblue");
    $("#check").css("cursor", "initial");


    $(".question-text").html(data[i]["arabic"]);
    audio = new Audio((data[i]["audio"]));
    correctAnswer = data[i]["hebrew"];
    wordId = data[i]["id"];
    let answers = [];
    answers.push(correctAnswer);
    data[i]["wrong answers"].forEach(el => {
        answers.push(el);
    });

    answers = shuffle(answers);

    $(".answer").each(function (j, el) {
        $(el).find(".answer-text").html(answers[j]);
        if (answers[j] == correctAnswer) {
            correct = $(el);
        }

    });

    i++;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function updateAnswer(username, wordId, result) {
    $.ajax({
        url: `https://flashcards-5g44.onrender.com/username/${username}/wordId/${wordId}/result/${result}`,
        type: 'PUT',
        success(response) {
            let leitnersHitRate = response.LeitnersHitRate;
            console.log(leitnersHitRate);

            $('.leitners').show();

            let progressValue;
            let progressText;

            if (leitnersHitRate >= 0.75) {
                // progressValue = 1;
                progressText = "שליטה גבוהה";
            } else if (leitnersHitRate >= 0.5) {
                // progressValue = 0.5;
                progressText = "שליטה בינונית";
            } else {
                // progressValue = 0.25;
                progressText = "שליטה נמוכה";
            }
            $(".leitners-text").html(progressText);
            $('.leitners').circleProgress({
                value: leitnersHitRate,
                fill: "green",
                startAngle: -Math.PI * 1.5,
                size:30,
                thickness:6,
            });
        }
    });
}

function selectAnswer() {
    if ($("#check").prop("disabled", true)) {
        $("#check").prop("disabled", false);
        $("#check").css("background-color", "darkslategray");
        $("#check").css("cursor", "pointer");
    }
    $(".answer").css("background-color", "#F0F8FF");
    $(this).css("background-color", "#007bff66");
    input = $(this).find(".answer-text").html();
    selected = $(this);
}

$(".close").click(function () {
    location.reload();
});

$("#audio-icon").click(function () {
    audio.play();
});