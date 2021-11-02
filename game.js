function Bear() { 
    this.dBear = 100; //bear step length
    this.htmlElement = document.getElementById("bear"); //bear image
    this.id = this.htmlElement.id; 
    this.x = this.htmlElement.offsetLeft; 
    this.y = this.htmlElement.offsetTop; 
    this.move = function(xDir, yDir) {  //horizontal, vertical moves the bear step
        this.x += this.dBear * xDir; //it updates the x poistion 
        this.y += this.dBear * yDir; //it updates the y poisition 
        this.display();  //display update
    }; 
    this.display = function() { 
        this.fitBounds(); //for the bear to stay in the board and not go outside of the board space
        this.htmlElement.style.left = this.x + "px"; 
        this.htmlElement.style.top = this.y + "px"; 
        this.htmlElement.style.display = "block"; 
    };
    this.fitBounds = function() {
        let parent = this.htmlElement.parentElement;
        let iw = this.htmlElement.offsetWidth;
        let ih = this.htmlElement.offsetHeight;
        let l = parent.offsetLeft;
        let t = parent.offsetTop;
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;
        //if it goes out of the board then it will come back to the board (horizontally)
        if (this.x < 0) this.x = 0; 
        if (this.x > w - iw) this.x = w - iw;
        //if it goes out of the board then it will come back to the board (vertically)
        if (this.y < 0) this.y = 0;
        if (this.y > h - ih) this.y = h - ih;
    };
}
function start() { 
    //create bear 
    bear = new Bear();
    // Add an event listener to the keypress event.
    document.addEventListener("keydown", moveBear, false);
    bees = new Array(); //new array for bees 
    makeBees();  //create bees 
    updateBees();
    lastStingTime = new Date();
    document.getElementById("speedBear").addEventListener("change",setSpeed);
   
   
}
function restart() {
    score = 0; //set the score to 0 
    hits.innerHTML = score;
    duration.innerHTML = 0; //set the duration to 0
    updateTimer = clearTimeout();
    removeBees(); //it removes all of the bees which are there in the array 
    start(); //it will start the game again using the button 
}
// Handle keyboad events 
// to move the bear 
function moveBear(e) { 
    if (start != true) {
        start = true;
        lastStingTime = new Date(); //take start time
    }
    //codes of the four keys 
    const KEYUP = 38; 
    const KEYDOWN = 40; 
    const KEYLEFT = 37; 
    const KEYRIGHT = 39; 
    if (e.keyCode == KEYRIGHT) { 
        bear.move(1, 0)  //move bear to the right by the use of the right key 
    } 
    if (e.keyCode == KEYLEFT) { 
        bear.move(-1, 0) //move the bear to the left by the use of left key 
    } 
    if (e.keyCode == KEYUP) { 
        bear.move(0, -1) //move the bear to the up by the use of the up key 
    }
    if (e.keyCode == KEYDOWN) { 
        bear.move(0, 1) //move the bear down by the use of the down key 
    }  
}
function setSpeed(){
    bear.dBear = parseInt(document.getElementById("speedBear").value); //get speed of the value in the input field 
}
class Bee {
    constructor(beeNumber) {
        this.htmlElement = createBeeImg(beeNumber); //bee image
        this.id = this.htmlElement.id; 
        this.x = this.htmlElement.offsetLeft;
        this.y = this.htmlElement.offsetTop;
        this.move = function(dx, dy) {
            this.x += dx; //moving the bee to the x axis 
            this.y += dy; //moving the bee to the y axis 
            this.display();
        };
        this.display = function() {
            //adjust position of bee and display it
            this.fitBounds();//add this to keep the bees in the space
            this.htmlElement.style.left = this.x + "px";
            this.htmlElement.style.top = this.y + "px";
            this.htmlElement.style.display = "block";  
        };
        this.fitBounds = function() {
            //Ensure that the bee will not go outside the board space and just be within the board space 
            let parent = this.htmlElement.parentElement; //
            let iw = this.htmlElement.offsetWidth;
            let ih = this.htmlElement.offsetHeight;
            let l = parent.offsetLeft;
            let t = parent.offsetTop;
            let w = parent.offsetWidth;
            let h = parent.offsetHeight;
            if (this.x < 0)
                this.x = 0;
            if (this.x > w - iw)
                this.x = w - iw;
            if (this.y < 0)
                this.y = 0;
            if (this.y > h - ih)
                this.y = h - ih;
        }; 
    } 
}
function getRandomInt(max) {
    return Math.floor((Math.random()) * max); //gives a random number between the integer 0 to max
}
function createBeeImg(wNum) { 
    //get dimension and position of board div 
    let boardDiv = document.getElementById("board"); 
    let boardDivW = boardDiv.offsetWidth; 
    let boardDivH = boardDiv.offsetHeight; 
    let boardDivX = boardDiv.offsetLeft; 
    let boardDivY = boardDiv.offsetTop; 
    //create the IMG element 
    let img = document.createElement("img"); //image tag
    img.setAttribute("src", "images/bee.gif"); 
    img.setAttribute("width", "100"); 
    img.setAttribute("alt", "A bee!"); 
    img.setAttribute("id", "bee" + wNum); 
    img.setAttribute("class", "bee"); 
    //add the IMG element to the DOM as a child of the board div 
    img.style.position = "absolute"; 
    boardDiv.appendChild(img); //it appends the image 
    //set initial position 
    let x = getRandomInt(boardDivW); //set the location of the bee randomly on the x axis 
    let y = getRandomInt(boardDivH); //set the location of the bee randomly on the x axis 
    img.style.left = (boardDivX + x) + "px"; 
    img.style.top = (y) + "px"; 
    //return the img object 
    return img; 
}
function makeBees() { 
    let nbBees = document.getElementById("nbBees").value; 
    nbBees = Number(nbBees); 
    if (isNaN(nbBees)) { 
        window.alert("Invalid number of bees"); 
        return; 
    } 
    //create bees 
    let i = 1; 
    while (i <= nbBees) { 
        var num = i; 
        var bee = new Bee(num); //creating a bee
        bee.display(); //shows the bee
        bees.push(bee); //add the bee object to the bees array 
        i++; 
    } 
}
function addBee() {
    let nbBees = document.getElementById("nbBees").value; //the number of bees which is specified by the user
    nbBees = Number(nbBees); //it converts into numbers
    nbBees++; // number of bee increments 
    var bee = new Bee(nbBees); //creating new bees
    bee.display(); //displaying the bee 
    bees.push(bee); //adding the bees to the array 
}
function removeBees() {
    beesArray = document.getElementsByClassName("bee");
    beesArray.forEach(e => e.remove());
}
function moveBees() { 
    //get speed input field value
    let speed = document.getElementById("speedBees").value; //get speed of the value in the input field 
    for (let i = 0; i < bees.length; i++) { 
        let dx = getRandomInt(2 * speed) - speed;  //move the bee randomly in the x axis 
        let dy = getRandomInt(2 * speed) - speed; //move the bee randomly in the x axis 
        bees[i].move(dx, dy); 
        isHit(bees[i], bear); // add this counts the stings
    } 
}
function updateBees() { // update loop for game 
    moveBees(); //move the bees randomly 
    //use a fixed update period 
    let period = document.getElementById("periodTimer").value; //use of the input field periodTimer
    let score = hits.innerHTML;
    if (Number(score) < 1000) { //if the score is less then 1000
        updateTimer = setTimeout('updateBees()', period); //this will update the Timer 
    } else {
        score = "Game Over" //it will show as Game Over
        hits.innerHTML = score;
        updateTimer = clearTimeout(); //it will clear the timer 
    }
}
function isHit(defender, offender) { 
    if (overlap(defender, offender)) { //check if the two image overlap 
        let score = hits.innerHTML; 
        score = Number(score) + 1; //increment the score, every time the bee and the bear collides the score is increment 
        hits.innerHTML = score; //shows the new score 
        //calculate longest duration 
        let newStingTime = new Date(); 
        let thisDuration = newStingTime - lastStingTime; 
        lastStingTime = newStingTime; 
        let longestDuration = Number(duration.innerHTML); 
        if (longestDuration === 0) { 
            longestDuration = thisDuration; 
        } else { 
            if (longestDuration < thisDuration) longestDuration = thisDuration; 
        } 
        document.getElementById("duration").innerHTML = longestDuration;
    } 
}
function overlap(element1, element2) { 
    //consider the two rectangles wrapping the two elements 
    //rectangle of the first element
    left1 = element1.htmlElement.offsetLeft; 
    top1 = element1.htmlElement.offsetTop; 
    right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth; 
    bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight; 
    //rectangle of the second element 
    left2 = element2.htmlElement.offsetLeft; //e2x 
    top2 = element2.htmlElement.offsetTop; //e2y 
    right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth; 
    bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight; 
    //calculate the intersection of the two rectangles 
    x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2)); 
    y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2)); 
    intersectArea = x_intersect * y_intersect; 
    //if intersection is nil no hit 
    if (intersectArea == 0 || isNaN(intersectArea)) { 
        return false; 
    } 
    return true; 
}