var element=document.getElementsByClassName('container')[0];
var minHeight;
var maxHeight;
var boxes=[];

function getRandomNo(minHeight,maxHeight)
{ 
  ys=minHeight+Math.floor(Math.random() * (maxHeight-minHeight));  
  return ys;

}
function getRandomDirection(){
  d=[1,-1,0]
  return d[Math.floor(Math.random()*3)];
}

function getRandomColor()
{
  return "#" +  Math.floor(Math.random()*0xFFFFFF).toString(16);
}

function Box(x,y,radius,color,xdir,ydir)
{ 
  var that=this;
  this.x=x;
  this.y=y;
  this.xdir=xdir;
  this.ydir=ydir;
  this.radius=radius;

  if(this.xdir==0 && this.ydir==0){
    this.xdir= 1;
  }
  this.elem =document.createElement('div');

  this.draw=function(){   
      this.elem.setAttribute('id',i);
      element.appendChild(this.elem);
      this.elem.style.borderRadius=50+'%';
      this.elem.style.width=this.radius*2+'px';
      this.elem.style.height=this.radius*2+'px';
      this.elem.style.position='absolute';
      this.elem.style.backgroundColor=color;
      this.elem.style.top=this.y+'px';
      this.elem.style.left=this.x+'px';
  }

  this.move=function(){
    //boundary conditions
    if(parseInt(this.elem.style.top)<=0||(parseInt(this.elem.style.top)+parseInt(this.elem.style.height))>600){
      this.xdir=-1*this.xdir;
    }
    if((parseInt(this.elem.style.left)+parseInt(this.elem.style.width))>500||parseInt(this.elem.style.left)<=0)
    {        
      this.ydir=-1*this.ydir;
    }
    this.elem.style.top=parseInt(this.elem.style.top)+this.xdir+'px';
    this.x=this.elem.style.top;
    this.elem.style.left=parseInt(this.elem.style.left)+this.ydir+'px';
    this.y=this.elem.style.left;
  }

  this.remove=function(){
    element.removeChild(this.elem);
  }

  this.moveAll=function(){
      that.move(); 
      that.checkCollision();
  }

  this.checkCollision=function(){
    for (var i = 0; i < boxes.length; i++) {
      var firstBall = this;
      var secondBall = boxes[i];
      if (i != boxes.indexOf(firstBall)) {
        var dx = parseInt(firstBall.x)+parseInt(firstBall.radius) - (parseInt(secondBall.x)+parseInt(secondBall.radius));
        var dy = parseInt(firstBall.y)+parseInt(firstBall.radius) - (parseInt(secondBall.y)+parseInt(secondBall.radius));
        var distance = Math.sqrt(dx * dx + dy * dy);
        var radiusdistance=firstBall.radius+secondBall.radius;
        if (distance <= radiusdistance) {
          //swap directions
          var temp={};
          temp.x = firstBall.xdir;
          temp.y = firstBall.ydir;

          firstBall.xdir = secondBall.xdir;
          firstBall.ydir = secondBall.ydir;

          secondBall.xdir = temp.x;
          secondBall.ydir = temp.y;
          return true;
        }
      }
    }
    return false;
  }
}

function Game(){
    this.init=function(){
      for(i = 0 ; i < 15 ; i++){
        do
        {
          if(boxes.length>i){
            boxes[i].remove();
          }
          var ranX=getRandomNo(0,430);
          var ranY=getRandomNo(0,530);
          var ranRadius=getRandomNo(10,35);
          var color=getRandomColor();
          var xDirec=getRandomDirection();
          var yDirec=getRandomDirection();
          var box=new Box(ranX,ranY,ranRadius,color,xDirec,yDirec);
          boxes[i] = box;
          boxes[i].draw();
         }while(boxes[i].checkCollision());
        interval=setInterval(boxes[i].moveAll,5)
      }
    }
  }








