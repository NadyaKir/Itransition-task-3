# Task 
Using the language of your choice—from the Java/C#/PHP/JavaScript/TypeScript/Ruby/Python set, please—to write a script that implements a generalized rock-paper-scissors game (with the supports of arbitrary odd number of arbitrary combinations). Of course, it's recommended to use the language of your "specialization", but it's not required.

When launched with command line parameters (arguments to the main or Main method in the case of Java or C#, sys.argv in Python, process.argv in Node.js, etc.) it accepts an odd number ≥ 3 non-repeating strings (if the arguments are incorrect, you must display a neat error message—what exactly is wrong and an example of how to do it right). All messages should be in English. These passed strings are moves (for example, Rock Paper Scissors or Rock Paper Scissors Lizard Spock or 1 2 3 4 5 6 7 8 9).

Important: moves are passed as command line arguments, you don't parse them from the input stream (for example, a move may contain a space, but it shouldn't matter to your code).

The victory is defined as follows—half of the next moves in the circle wins, half of the previous moves in the circle lose (the semantics of the strings-moves is not important, he plays by the rules build upon the moves order the user used, even if the stone loses to scissors in its order—the contents of the strings-moves are not important for you). 
## Demo

[Demo-video](https://www.dropbox.com/scl/fi/n9dsrta7w8jgbiwwh7oky/Itransition-task-3.mov?rlkey=ijipsd5t8d1o5e1yadxhb0q2n&st=dl4uuafz&dl=0") of the project

