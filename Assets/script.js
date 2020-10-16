var pos = 0;
var correct = 0;
var test = "";
var test_status = "";
var question = "";
var choice = "";
var choices = "";
var chA = "";
var chB = "";
var chC = "";
var chD = "";

var questions = [
    {
        question: "Who is the Colorado Rockies all time home runs leader?",
        a: "Todd Helton",
        b: "Larry Walker",
        c: "Nolan Arenado",
        d: "Dante Bichette",
        answer: "A"
    },

    {
        question: "Who is the Colorado Rockies all time hits leader?",
        a: "Larry Walker",
        b: "Dante Bichette",
        c: "Troy Tulowitzki",
        d: "Todd Helton",
        answer: "D"
    },

    {
        question: "Who is the Colorado Rockies all time strike outs leader?",
        a: "Aaron Cook",
        b: "Ubaldo Jimenez",
        c: "Jorge de la Rosa",
        d: "Pedro Estacio",
        answer: "C"
    },

    {
        question: "In what year did the Colorado Rockies play their first game?",
        a: "1994",
        b: "1997",
        c: "1993",
        d: "1995",
        answer: "C"
    },

    {
        question: "How many times have the Colorado Rockies reached the postseason?",
        a: "6",
        b: "9",
        c: "2",
        d: "5",
        answer: "D"
    },

    {
        question: "How many times has Nolan Arenado won the gold glove award?",
        a: "1",
        b: "4",
        c: "7",
        d: "2",
        answer: "C"
    }

]

function get(x) {
    return document.getElementById(x);
}

function displayQuestion() {
    test = get("test");
    if (pos >= questions.length) {
        test.innerHTML = "<h2>You got " + correct + " of " + questions.length + " questions correct</h2>";
        get("test_status").innerHTML = "Test Completed";
        pos = 0;
        correct = 0;
        return false;
    }
    get("test_status").innerHTML = "Question " + (pos + 1) + " of " + questions.length;
    
    question = questions[pos].question;
    chA = questions[pos].a;
    chB = questions[pos].b;
    chC = questions[pos].c
    chD = questions[pos].d

test.innerHTML = "<h3>" + question + "</h3>";

    test.innerHTML += "<label> <input type='radio' name='choices' value='A'> " + chA + "</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='B'> "+chB+"</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='C'> " + chC + "</label><br><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='D'> " + chD + "</label><br><br>";
    
  test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
    
    
}

function checkAnswer() {
    choices = document.getElementsByName("choices");
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }

    if (choice == questions[pos].answer) {
        correct++;
    }

    pos++

    displayQuestion();
}





window.addEventListener("load", displayQuestion);
    