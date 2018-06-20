// Initial eventListener once page loads:
document.addEventListener("DOMContentLoaded", function() {
                          var select_button = document.getElementById("select_button"); // Get select button
                          select_button.addEventListener("click", generate_game); // Listen to select button
                          });

var tries = 10; // Number of tries
var correct = 0; // Number of correct letts
var word = "";
var ltrsTried = new Set();

//categories
var actorslist = ["Matt Damon", "Emma Stone", "Brad Pitt", "Mila Kunis", "John Krasinksi"];
var movieslist = ["Lion King", "Titanic", "The Godfather", "Star Wars", "La La Land"];
var animalslist = ["Dog", "Cat", "Moose", "Lion", "Porcupine"];
var brandslist = ["Supreme", "Jordan", "Nike", "J Crew", "Uniqlo"];
var rapperslist = ["Drake", "Kendrick Lamar", "Kanye West", "J Cole", "Lil Uzi Vert"];

// Generate a game:
function generate_game() {
    
    ltrsTried = new Set();
    tries = 10;
    correct = 0;
    
    var category = document.getElementById("category").value; // Get selected category
    word = select_word(category); // Select word according to category
    
    var display = ("_\xa0\xa0\xa0").repeat(word.length); // Display _ for each letter
    for (i = 0; i < word.length; i++) {
        if (word.charAt(i) == " ") {
            display = replaceAt(display, i*4, " ");
            correct++;
        }
    }
    display = display.substring(0, display.length-3); // Truncate end of string to remove extra space
    
    document.getElementById("word0").innerHTML = word; // Display word
    document.getElementById("word1").innerHTML = display; // Second display
    
    document.onkeypress = guess_letter;    // Begin reading keyboard input for letters
    document.getElementById("notif1").innerHTML = tries; // Display tries
    document.getElementById("notif2").innerHTML = ""; // Reset notification
    
};

// Process guesses:
function guess_letter() {
    document.getElementById("notif2").innerHTML = "" // Reset notification
    e = window.event; // Get keyboard input
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    
    // Process only letter inputs
    if (((charCode<123) && (charCode>96)) || ((charCode<91) && (charCode>64))) {
        var ltr = String.fromCharCode(charCode);
        
        if (ltrsTried.has(ltr.toLowerCase())) { // Check if letter has been previously tried
            document.getElementById("notif2").innerHTML = "You've already tried this letter!";
            return;
        } else {
            ltrsTried.add(ltr.toLowerCase());
        }
        
        if (tries <= 0) { // If tries get to 0, you lose the game
            document.getElementById("notif1").innerHTML = "You lost!";
            return;
        }
        // Check if letter is in the word
        flag = false
        for (i = 0; i < word.length; i++) {
            if (ltr.toLowerCase() == word.charAt(i)){
                flag = true;
                display = document.getElementById("word1").innerHTML;
                display = replaceAt(display, i*19, ltr.toLowerCase());
                document.getElementById("word1").innerHTML = display;
                correct++;
            }
            if (ltr.toUpperCase() == word.charAt(i)) {
                flag = true;
                display = document.getElementById("word1").innerHTML;
                display = replaceAt(display, i*19, ltr.toUpperCase());
                document.getElementById("word1").innerHTML = display;
                correct++;
            }
        }
        if (flag == false) {
            tries --; // Decrease tries
            document.getElementById("notif1").innerHTML = tries; // Display tries
        }
        if (correct == word.length) {
            var win = "You win!";
            document.getElementById("notif1").innerHTML = win;
            return;
        }
    }
};

// replace the 'n'th character of 's' with 't'
function replaceAt(s, n, t) {
    return s.substring(0, n) + t + s.substring(n + 1);
}

// Select the word based on the category:
function select_word(category) {
    if (category == "actors") {
        //var word = "Actors";
        var word = actorslist[Math.floor(Math.random()*actorslist.length)];
    }
    if (category == "movies") {
        //var word = "Movies";
        var word = movieslist[Math.floor(Math.random()*movieslist.length)];
    }
    if (category == "animals") {
        //var word = "Animals";
        var word = animalslist[Math.floor(Math.random()*animalslist.length)];
    }
    if (category == "brands") {
        //var word = "Brands";
        var word = brandslist[Math.floor(Math.random()*brandslist.length)];
    }
    if (category == "rappers") {
        //var word = "Rappers";
        var word = rapperslist[Math.floor(Math.random()*rapperslist.length)];
    }
    return word;
}

