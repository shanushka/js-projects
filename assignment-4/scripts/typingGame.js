var element = document.getElementsByClassName("container")[0];
var input = document.getElementById("wordInput");
var writer = document.getElementsByClassName("writer")[0];
var scoreCard = document.getElementsByClassName("score")[0];

scoreCard.innerHTML = "Score :";
var num = document.createElement("span");
var gameEnd=document.createElement('div');
gameEnd.innerHTML='GAME OVER';
gameEnd.setAttribute('class','gameEnd');
num.innerHTML = "0";
scoreCard.append(num);
element.style.position = "relative";
element.style.width = "900px";
element.style.border = "1px solid black";
const wordArray = ['ACCOUNT','ACCURATE','ACRES','ACROSS','ACT','ACTION','ACTIVE','ACTIVITY','ACTUAL','ACTUALLY','ADD','ADDITION','ADDITIONAL','ADJECTIVE','ADULT','ADVENTURE',
'ADVICE','AFFECT','AFRAID','AFTER','AFTERNOON','AGAIN','AGAINST','AGE','AGO','AGREE','AHEAD','AID','AIR','AIRPLANE','ALIKE','ALIVE',
'ALSO','ALTHOUGH','AM','AMONG','AMOUNT','ANCIENT','ANGLE','ANGRY','ANIMAL','ANNOUNCED','ANOTHER','ANSWER','ANTS','ANY','ANYBODY','ANYONE',
'ANYTHING','ANYWAY','ANYWHERE','APART','APARTMENT','APPEARANCE','APPLE','APPLIED',
'APPROPRIATE','ARE','AREA','ARM','ARMY','AROUND','ARRANGE','ARRANGEMENT','ARRIVE','ARROW','ART','ARTICLE','AS','ASIDE','ASK','ASLEEP',
'AT','ATE','ATMOSPHERE','ATOM','ATOMIC','ATTACHED','ATTACK','ATTEMPT',
'ATTENTION','AUDIENCE','AUTHOR','AUTOMOBILE','AVAILABLE','AVERAGE','AVOID','AWARE','AWAY','BABY','BACK','BAD','BADLY','BAG','BALANCE','BALL',
'BALLOON','BAND','BANK','BAR','BARE','BARK','BARN','BASE','BASEBALL','BASIC','BASIS','BASKET','BAT','BATTLE','BE','BEAN',
'BEAR','BEAT','BEAUTIFUL','BEAUTY','BECAME','BECAUSE','BECOME','BECOMING','BEING','BELIEVED','BELL','BELONG','BELOW','BELT','BEND','BENEATH',
'BENT','BESIDE','BEST','BET','BETTER','BETWEEN','BEYOND','BICYCLE','BIGGER','BIGGEST','BILL','BIRDS','BIRTH','BIRTHDAY','BIT','BITE',
'BUILD','BUILDING','BUILT','BURIED','BURN','BURST','BUS','BUSH','RHYME','RHYTHM','RICE','RICH','RIDE','RIDING','RIGHT','RING',
'SALE','SALMON','SALT','SAME','SAND','SANG','SAT','SATELLITES','SATISFIED','SAVE','SAVED','SAW','SAY','SCALE','SCARED','SCENE',
'SCHOOL','SCIENCE','SCIENTIFIC','SCIENTIST','SCORE','SCREEN','SEA','SEARCH','SEASON','SEAT','SECOND','SECRET','SECTION','SEE','SEED','SEEING',
'SUGGEST','SUIT','SUM','SUMMER','SUN','SUNLIGHT','SUPPER','SUPPLY','SUPPORT','SUPPOSE','SURE','SURFACE','SURPRISE','SURROUNDED','SWAM','SWEET',
'SWEPT','SWIM','SWIMMING','SWING','SWUNG','SYLLABLE','SYMBOL','SYSTEM','TABLE','TAIL','TAKE','TAKEN','TALES','TALK','TALL','TANK',
'YOUR','YOURSELF','YOUTH','ZERO','ZOO'];

const maxHeight = 800;
const minHeight = 100;
gameOver = false;
inputList = [];

function Word() {
  this.x = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
  this.y = 0;
  var n;
  this.charArray = [];
  this.spanList = [];
  var word = wordArray[Math.floor(Math.random() * wordArray.length)].toLowerCase();
  this.wordElement = document.createElement("div");
  var len = word.length;
  this.draw = function() {
    for (var i = 0; i < word.length; i++) {
      var sElement = document.createElement("span");
      sElement.textContent = word[i];
      this.charArray.push(word[i]);
      this.spanList.push(sElement);
      this.wordElement.appendChild(this.spanList[i]);
    }

    element.append(this.wordElement);
    this.wordElement.style.position = "absolute";
    this.wordElement.setAttribute("class", "words");
    this.wordElement.style.top = this.y + "px";
    this.wordElement.style.left = this.x + "px";
    this.wordElement.classList.add(this.charArray.join(""));
  };

  this.move = function() {
    this.wordElement.style.top =
      parseInt(this.wordElement.style.top) + 1 + "px";
  };

  this.updateSpan = function(n = len) {
    console.log("consolr");
    for (var i = 0; i < len; i++) {
      this.spanList[i].style.background = i < n ? "green " : "";
      this.spanList[i].style.textDecoration = i < n ? "line-through" : "";
    }
  };
}



function Game() {
  var array = [];
  var score = 0;
  var mainInterval;
  this.clearInput=false;
  var counter = 0;

  this.init = function() {
    document.addEventListener("keydown",pressEvent);
    mainInterval = setInterval(generateWord, 50);
    };

  generateWord=function(){
    if(this.clearInput){
      input.value = "";
      this.clearInput=false;
    }
    counter++;

    if (counter % 100 == 0) {
      var words = new Word();
      array.push(words);
      words.draw();
    }

    array.forEach(function(index) {
      index.move();
      if (parseInt(index.wordElement.style.top) == 380) {
        index.wordElement.remove();
        array.shift(index);
        gameOver();

      }
    });
  }
  function gameOver()
  {
    clearInterval(mainInterval);
    element.appendChild(gameEnd);
    array.forEach(function(index){
    element.removeChild(index.wordElement);
    isResumed=true;
    })
  }

  function pressEvent(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      inputList.push(String.fromCharCode(event.keyCode).toLowerCase());
      checkMatch();
    }

    if (event.keyCode == 8) {
      if (inputList.length > 0) {
        inputList.pop();
        checkMatch();
      }
    }
  }

  function checkMatch() {
    inputlength = inputList.length;
    for (i = 0; i < array.length; i++) {
      console.log(array[i].charArray.slice(0, inputlength));
      if (array[i].charArray.slice(0, inputlength).join("") === inputList.join("")) 
      {
        array[i].updateSpan(inputlength);

        if (array[i].charArray.length == inputlength) {
          score++;
          this.inputList=[];
          this.clearInput=true;
          array[i].wordElement.remove();
          array.shift(array[i]);
        }
        num.innerHTML = score;
      }
    }
  }
}

var game = new Game();
game.init();
