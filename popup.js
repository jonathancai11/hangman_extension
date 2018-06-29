// Initial eventListener once page loads:
document.addEventListener("DOMContentLoaded", function() {
                          var select_button = document.getElementById("select_button"); // Get select button
                          select_button.addEventListener("click", generate_game); // Listen to select button
                          });

var tries = 7; // Number of tries
var correct = 0; // Number of correct letts
var ltrsTried = new Set();
var letters = "";
var word = "";
var imgnum = 0;

//categories

var actorslist = ["Matt Damon", "Emma Stone", "Brad Pitt", "Mila Kunis", "John Krasinksi",
                  "Jennifer Lawrence", "Jonah Hill", "Scarlett Johansson", "Tom Cruise", "Angelina Jolie",
                  "Leonardo DiCaprio", "Jennifer Aniston", "Denzel Washington", "Julia Roberts", "Tom Hanks",
                  "Marilyn Monroe", "Will Smith", "Natalie Portman", "Harrison Ford", "Anne Hathaway",
                  "Jack Nicholson", "Meryl Streep", "Johnny Depp", "Amy Adams", "Morgan Freeman",
                  "Emma Watson", "Liam Neeson", "Sandra Bullock", "Robert De Niro", "Halle Berry"];
var movieslist = ["Lion King", "Titanic", "The Godfather", "Star Wars", "La La Land",
                  "Forrest Gump", "Fight Club", "The Curious Case of Benjamin Button", "Inception", "Back to the Future",
                  "Pulp Fiction", "Avengers", "Black Panther", "The Matrix", "Saving Private Ryan",
                  "Jaws", "Terminator", "Toy Story", "Superman", "Batman",
                  "Shrek", "Monsters Inc", "Ice Age", "Finding Nemo", "Alien",
                  "Captain America", "The Incredibles", "Deadpool", "Dr Strangelove", "The Wizard of Oz"];
var animalslist = ["Dog", "Cat", "Moose", "Lion", "Porcupine",
                   "Squid", "Tiger", "Cheetah", "Parrot", "Crocodile",
                   "Goose", "Camel", "Owl", "Bear", "Whale",
                   "Crab", "Eagle", "Gecko", "Fox", "Monkey",
                   "Frog", "Jellyfish", "Sponge", "Armadillo", "Sloth",
                   "Anteater", "Blue Footed Booby", "Human", "Antelope", "Panda"];
var brandslist = ["Supreme", "Jordan", "Nike", "J Crew", "Uniqlo",
                  "Adidas", "Puma", "Reebok", "Old Navy", "Converse",
                  "New Balance", "Gap", "Ralph Lauren", "Obey", "Bape",
                  "Gucci", "Louis Vuitton", "Rolex", "Levis", "Stussy",
                  "Heelys", "Crocs", "Sketchers", "Tommy Hilfiger", "Timberland",
                  "PacSun", "Tillys", "Abercrombie and Fitch", "Chanel", "Patagonia"];
var rapperslist = ["Drake", "Kendrick Lamar", "Kanye West", "J Cole", "Lil Uzi Vert",
                   "Jay Z", "Dr Dre", "Eminem", "Childish Gambino", "Future",
                   "Lil Pump", "Snoop Dogg", "Lil Wayne", "Meek Mill", "Big Sean",
                   "Rick Ross", "Wiz Khalifa", "Young Thug", "Tyler The Creator", "Chance The Rapper",
                   "The Notorious BIG", "Eazy E", "Tupac", "Ice Cube", "ASAP Rocky",
                   "Nicki Minaj", "Cardi B", "XXXTentacion", "ScHoolboy Q", "Mac Miller"];

// Generate a game:
function generate_game() {
    
    ltrsTried = new Set();
    tries = 7;
    correct = 0;
    letters = "";
    
    var category = document.getElementById("category").value; // Get selected category
    var difficulty = document.getElementById("difficulty").value; // Get selected difficulty
    word = select_word(category, difficulty); // Select word according to category
    
    
    var display = ("_\xa0\xa0").repeat(word.length); // Display _ for each letter
    for (i = 0; i < word.length; i++) {
        if (word.charAt(i) == " ") {
            display = replaceAt(display, i*3, " ");
            correct++;
        }
    }
    display = display.substring(0, display.length-2); // Truncate end of string to remove extra space
    
    // document.getElementById("word0").innerHTML = word; // Display word
    document.getElementById("word0").innerHTML = display; // Second display
    
    document.onkeypress = guess_letter;    // Begin reading keyboard input for letters
    document.getElementById("notif1").innerHTML = "Tries remaining: " + tries + "; Letters tried: none";
    document.getElementById("notif2").innerHTML = ""; // Reset notification
    imgnum = 0
    document.getElementById("pic").src = "img/post" +imgnum.toString()+ ".gif"

    document.getElementById("notif3").innerHTML = "";
    document.getElementById("word1").innerHTML = "";
    
};

// Process guesses:
function guess_letter() {
    document.getElementById("notif2").innerHTML = "" // Reset notification
    e = window.event; // Get keyboard input
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    
    // Process only letter inputs
    if (((charCode<123) && (charCode>96)) || ((charCode<91) && (charCode>64))) {
        var ltr = String.fromCharCode(charCode);
        
        // Check if letter is in the word
        flag = false
        for (i = 0; i < word.length; i++) {
            if (ltr.toLowerCase() == word.charAt(i)){
                flag = true;
                display = document.getElementById("word0").innerHTML;
                display = replaceAt(display, i*13, ltr.toLowerCase());
                document.getElementById("word0").innerHTML = display;
                correct++;
            }
            if (ltr.toUpperCase() == word.charAt(i)) {
                flag = true;
                display = document.getElementById("word0").innerHTML;
                display = replaceAt(display, i*13, ltr.toUpperCase());
                document.getElementById("word0").innerHTML = display;
                correct++;
            }
        }
        if (ltrsTried.has(ltr.toLowerCase()) && tries != 0) { // Check if letter has been previously tried
            document.getElementById("notif2").innerHTML = "You've already tried this letter!";
            flag = true;
            return;
        } else {
            ltrsTried.add(ltr.toLowerCase());
        }
        if (flag == false) {
            tries--; // Decrease tries
            imgnum++
            document.getElementById("pic").src = "img/post" +imgnum.toString()+ ".gif"
        }
        if (tries <= 0) { // If tries get to 0, you lose the game
            document.getElementById("notif1").innerHTML = "You lost!";
            document.getElementById("notif3").innerHTML = "The word was:";
            document.getElementById("word1").innerHTML = word;
            return;
        }
        letters = letters + ltr.toLowerCase() + " ";
        var notiftext = "Tries remaining: " + tries + "; Letters tried: " + letters;
        document.getElementById("notif1").innerHTML = notiftext;
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
function select_word(category, difficulty) {
    var tempword = "";
    if (category == "actors") {
        tempword = get_random(actorslist);
        while (!(matches_difficulty(tempword, difficulty))) {
            tempword = get_random(actorslist);
        }
    }
    if (category == "movies") {
        tempword = get_random(movieslist);
        while (!(matches_difficulty(tempword, difficulty))) {
            tempword = get_random(movieslist);
        }
    }
    if (category == "animals") {
        tempword = get_random(animalslist);
        while (!(matches_difficulty(tempword, difficulty))) {
            tempword = get_random(animalslist);
        }
    }
    if (category == "brands") {
        tempword = get_random(brandslist);
        while (!(matches_difficulty(tempword, difficulty))) {
            tempword = get_random(brandslist);
        }
    }
    if (category == "rappers") {
        tempword = get_random(rapperslist);
        while (!(matches_difficulty(tempword, difficulty))) {
            tempword = get_random(rapperslist);
        }
    }
    return tempword;
}

function matches_difficulty(tempword, difficulty) {
    if (difficulty == "random") {
        return true;
    } else {
        var count = 0;
        var counted;
        for (i = 0; i < tempword.length; i++) {
            counted = false;
            for (j = 0; j < i; j++) {
                if (tempword.charAt(i) == tempword.charAt(j)) {
                    counted = true;
                }
            }
            if ((counted == false) && (tempword.charAt(i) != " ")) {
                count++;
            }
        }
        if ((count <= 5) && (difficulty == "easy")) {
            return true;
        } else if ((count > 5) && (count <= 10) && (difficulty == "medium")) {
            return true;
        } else if ((count > 10) && (difficulty == "hard")) {
            return true;
        }
    }
    return false;
}

// Given an array, return a random element in the array
function get_random(array) {
    return array[Math.floor(Math.random()*array.length)]
}
