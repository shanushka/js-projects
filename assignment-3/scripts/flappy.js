function Flappy(cont){
  var element=document.getElementsByClassName(cont)[0];
  element.style.width='500px';
  var scoreCard=document.createElement('div')
  var num=document.createElement('span');
  scoreCard.setAttribute('class','scoreCard')
  scoreCard.innerHTML="Score"
  scoreCard.appendChild(num)
  num.innerHTML="0"
  var min=100;
  var max=300;
  const GAP=100;
  var start = document.createElement('div');
  element.appendChild(start);
  start.style.backgroundImage = "url('./images/message.png') " ;
  start.setAttribute('class','start')
  var isStarted=false;
  var isResumed=false;
  var bir;
  getRandomHeight=function(){
    return min+ Math.floor(Math.random()*(max-min));
  }

  pipe=function(){
    this.height1=getRandomHeight();
    this.height2=500-(this.height1+GAP);
    this.elem2=document.createElement('div');
    this.elem=document.createElement('div');
    this.pipeTop=document.createElement('div');
    this.pipeTop2=document.createElement('div');
    this.pipeTop.setAttribute('class','pipeTop');
    this.pipeTop2.setAttribute('class','pipeTop2');
    
    
    //  console.log(this.height1,this.height2);
    this.draw=function(){
    
        element.appendChild(this.elem);
        element.appendChild(this.elem2);
        this.elem.setAttribute('class','pipe')
        this.elem2.setAttribute('class','pipe-bottom')
        this.elem.style.height=this.height1+'px';
        this.elem2.style.height=this.height2+'px';
        this.elem.style.width='48px'
        this.elem2.style.width='48px'
        this.elem.style.left=element.style.width;
        this.elem2.style.left=element.style.width;
        element.appendChild(this.pipeTop);
        element.appendChild(this.pipeTop2);

        this.pipeTop.style.top=this.height1-24 +'px';
        this.pipeTop2.style.top=this.height1+GAP +'px';
        this.pipeTop.style.left=parseInt(element.style.width)-2+'px';
        this.pipeTop2.style.left=parseInt(element.style.width)-2+'px';
    }

    this.move=function(){
      this.elem.style.left=parseInt(this.elem.style.left)-1+'px';
      this.pipeTop.style.left=parseInt(this.pipeTop.style.left) -1+'px';
      this.pipeTop2.style.left=parseInt(this.pipeTop2.style.left) -1+'px';
      this.elem2.style.left=parseInt(this.elem.style.left)-1+'px';
      console.log('moved');
    }
  } 

  var bird=function(){
    this.gravity=0;
    this.birdel=document.createElement('div');
    this.birdel.setAttribute('class','bird')
    this.birdel.style.left='200px';
    this.birdel.style.top='200px';
    this.birdel.style.width='34px';
    this.birdel.style.backgroundPositionY='0px';
    this.draw=function(){
      element.appendChild(this.birdel);
    }

    this.move=function(){
      this.gravity+=0.05;
        if(isKeyUpPressed) {
          this.gravity=-1;
      }
      this.birdel.style.top= (this.gravity + parseInt(this.birdel.style.top)) +'px';
      if(this.previousTop-parseInt(this.birdel.style.top)>30 ) isKeyUpPressed = false;
    }
    this.saveCurrentTop=function(){
      this.previousTop=parseInt(this.birdel.style.top);
    }
  }
  var isKeyUpPressed=false;

  this.init=function(){
    document.addEventListener('keyup',()=>{
    
      if(!isStarted)
      {
        isStarted=true;
        element.removeChild(start);
        element.appendChild(scoreCard);
        this.game();
      }

      console.log(isResumed)
        if(isResumed)
        {
         isResumed=false;
         element.innerHTML="";
         num.innerHTML='0'
         element.appendChild(scoreCard);
         this.game();
        }
     
    })
  }

  this.game=function(){
    var that=this;
    var counter=0;
    var array=[]
    var score=0;
    bir=new bird()
    bir.draw();
    this.gameOver=document.createElement('div');
    this.pressed=document.createElement('div');
    this.pressed.setAttribute('class','pressed');
    this.pressed.innerHTML='PRESS TO CONTINUE';
    this.gameOver.style.backgroundImage="url('./images/gameover.png') " ;
    this.gameOver.setAttribute('class','gameOver')
    interval=setInterval(function(){
      counter++;
      bir.birdel.style.backgroundPositionY= parseInt(bir.birdel.style.backgroundPositionY)-24+'px';
      bir.move();
      that.checkWallCollision()
      if(counter % 200==0){
        var p = new pipe();
        array.push(p)
        p.draw();
      }
      array.forEach(function(index){
        index.move();
        that.collision(index)
        if(parseInt(index.elem.style.left )== -80) {
          index.elem.remove();
          index.elem2.remove();
          array.shift(index);
        }
        if((parseInt(bir.birdel.style.left)) == parseInt(index.elem.style.left)+parseInt(index.elem.style.width)+2){
          score++;
        }
        num.innerHTML = score;
      });

      document.addEventListener('keydown',function(){
        isKeyUpPressed=true;
        bir.saveCurrentTop();
      })

      document.addEventListener('keyup',function(){
        isKeyUpPressed=false;
        bir.saveCurrentTop();
      })
    },10);
    
    this.checkWallCollision=function(){
        if(parseInt(bir.birdel.style.top) + 24 > 500 || parseInt(bir.birdel.style.top)  < 0){
          clearInterval(interval)
          isResumed=true;
          element.appendChild(this.pressed);
          element.appendChild(this.gameOver);
        }
      }

    this.collision =function(i){
      var bx=parseInt(bir.birdel.style.left)
      var bw=parseInt(bir.birdel.style.width)
      var bh=parseInt(bir.birdel.style.height)
      var by=parseInt(bir.birdel.style.top)

      if(bx + bw > parseInt (i.elem.style.left) && bx+bw <(parseInt(i.elem.style.left)+parseInt(i.elem.style.width)+30))
      { 
        if(parseInt(i.elem.style.height)>=by || parseInt(i.elem.style.height) + GAP+10 <= (by+bw)){
          element.appendChild(this.gameOver);
          element.appendChild(this.pressed);
          isResumed=true;
          clearInterval(interval)
                
        }
      }
    }

   
    }
 }

