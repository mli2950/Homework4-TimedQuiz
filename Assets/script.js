// Global variables to store values
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
var quizTimer = 90;

// Arrays containing questions, options, and answers
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

// Hide the intital input form until needed
get("initialInput").setAttribute("style", "display: none");

// Get function
function get(x) {
    return document.getElementById(x);
}

// Function containing main code to display results, and questions
function displayQuestion() {
    // Grab the test ID and assign it to test variable
    test = get("test");

    // If the users position in the questions is equal to or higher than the amount of questions, display reuslts page
    if (pos >= questions.length) {
        // Concatenated results text display, as well as calculating percentage
        test.innerHTML = "<h2>You got " + correct + " of " + questions.length + " questions correct</h2>" + Math.round(100 * correct/questions.length) + "%";
        get("test_status").innerHTML = "Test Completed";
        // Display the initial input form that is hidden
        get("initialInput").setAttribute("style", "display: block");
        // Set the quiz timer to undefined to stop it from decrementing
        quizTimer = "";
        // Hide the timer 
        get("timer").setAttribute("style", "display: none");
        // Display the button to save highscores
        get("submit-button").setAttribute("style", "display: block", "center")
        // Select the highscore ID, and change its text content to display the highscore that is stored in local storage
        var highscore = document.querySelector("#highscore");
        highscore.textContent = "Highscore: " + localStorage.getItem(localStorage.key(1)) + " by: " + localStorage.getItem(localStorage.key(0));
        // if there is no key or value stored in local Storage, display nothing, instead of null
        if (localStorage.getItem(localStorage.key(1)) == null) {
            highscore.textContent = "";
        }

        return false;
    }
    // Grab the test status id and assign it a concatenated string that lets the user know what question they are on 
    get("test_status").innerHTML = "Question " + (pos + 1) + " of " + questions.length;
    // Grab the correct values from the questions array and assign them
    question = questions[pos].question;
    chA = questions[pos].a;
    chB = questions[pos].b;
    chC = questions[pos].c;
    chD = questions[pos].d;

    // Use the grabbed question variable to display the question
    test.innerHTML = "<h3>" + question + "</h3>";

    // Use the grabbed options and display them
    test.innerHTML += "<label> <input type='radio' name='choices' value='A'> " + chA + "</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='B'> "+chB+"</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='C'> " + chC + "</label><br><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='D'> " + chD + "</label><br><br>";
    test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
  
    
    
}


// Check the users answer vs the correct answer. If correct, increment the correct variable. If incorrect, decrement timer by 10. Once answered, move to the next position, then loop back to the displayQuestion function.
function checkAnswer() {
    choices = document.getElementsByName("choices");
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }

    if (choice == questions[pos].answer) {
        correct++;
    } else {
        quizTimer -= 10;
    }

    pos++

    displayQuestion();
}

// Start Function
function start() {
    // Hide the quiz title
    get("quizTitle").setAttribute("style", "display: none");
    // Hide the quiz instructions
    get("quizInst").setAttribute("style", "display: none");
    // Hide the quiz start button
    get("start-button").setAttribute("style", "display: none");
    // Display the quiz questions
    get("showQuiz").setAttribute("style", "display: block !important");
    // Code for the timer
    setInterval(function () {
        // If the tiemr is less than or equal to 0, display the results page and inform the user time has expired
        if (quizTimer <= 0) {
          clearInterval(quizTimer);
            get("timer").innerHTML = "You have run out of time!";
            test.innerHTML = "<h2>You got " + correct + " of " + questions.length + " questions correct</h2>" + Math.round(100 * correct/questions.length) + "%";
            get("test_status").innerHTML = "Test Completed";
            // Grab the highscore ID, and if there is a highscore value and key stored in localstore, display it
            var highscore = document.querySelector("#highscore");
            highscore.textContent = "Highscore: " + localStorage.getItem(localStorage.key(1)) + " by: " + localStorage.getItem(localStorage.key(0));

            // if there is no value and key stored, display nothing
            if (localStorage.getItem(localStorage.key(1)) == null) {
            highscore.textContent = "";
        }
        return false;
        } else {
            // Display the current value of the timer
          get("timer").innerHTML = quizTimer;
        }
        // Decrement timer by 1 second
        quizTimer -= 1;
      }, 1000);
    //   Loop back to the displayQuestion function
    displayQuestion();
}
// Hide the submit button until needed
get("submit-button").setAttribute("style", "display: none")

// submitButton function
function submitButton() {
    // variables to store the IDs
    var userSubmit = document.getElementById("initialInput").value;
    var highscore = document.querySelector("#highscore");
    
    // Store the value of the highscore from local storage
    var hsStore = localStorage.getItem(localStorage.key(1));

    // If the users current correct answers is higher than the stored highscore, replace the stored highscore in localstorage, and update the text display.
    if (correct > hsStore) {
        localStorage.setItem("Highscore: ", correct);
        localStorage.setItem("Player: ", userSubmit);
        highscore.textContent = "Highscore: " + correct + " by: " + userSubmit;
    }
    
}

// Event listeners for the buttons
get("submit-button").addEventListener("click", submitButton);
get("start-button").addEventListener("click", start);


    