function Carousel(elementClass,container){

  slider = document.getElementsByClassName(elementClass)[0];
  container=document.getElementsByClassName(container)[0];
  buttonLeft=document.createElement('button');
  buttonRight=document.createElement('button');
  buttonLeft.setAttribute('id','btn-left');
  buttonLeft.setAttribute('class','btn-left');
  buttonRight.setAttribute('id','btn-right');
  buttonRight.setAttribute('class','btn-right');
  bottomButton=document.createElement('div');
  bottomButton.setAttribute('class','bottom');
  bubbles=[];
  container.appendChild(buttonLeft);
  container.appendChild(buttonRight);
  container.appendChild(bottomButton);
  prev=document.getElementById('btn-left');
  next=document.getElementById('btn-right');
  var allImages =  slider.children;
  
  for(var i=0 ; i < allImages.length; i++)
  { 
      spanB=document.createElement('span');
      spanB.classList.add('bubble');
      bottomButton.appendChild(spanB);
      bubbles.push(spanB)
   
  }
  
  var x = 0;
  var dx = 1;
  var speed=10;
  var sliderInterval;
  var sliderHold;
  var width=720;
  var currentImage=0;

  this.init =function(){
    sliders();
    buttonEvent();
  }

   sliders=function() {
    sliderHold = setTimeout(function() {
     sliderInterval = setInterval(animate, speed);
    }, 2000);
   }

  function animate() {
    var secondLast = allImages.length - 1
    slider.style.left = '-' + x + 'px';
    if (x >= width * secondLast) {
     dx = -1;
    } else if (x <= 0) {
     dx = 1;
    }
    if (x % width === 0) {
     currentImage = x/width;
     clearInterval(sliderInterval);
     sliderHold = setTimeout(function() {
      sliderInterval = setInterval(animate, speed);
     }, 2000);
    }
    x = x + (speed * dx);
   checkActive();
  
   }

   //check active state

   function checkActive(){
    bubbles.forEach(function(bubble,index){
      if(index === currentImage){
        bubble.classList.add('active');
      } else {
        bubble.classList.remove('active');
      }

      
    })
   }

  function buttonEvent(){
    prev.addEventListener('click',function(e){
      if( x >= width){
        console.log(x)
        buttonClicked();
          dx=-1; 
        }
    })

    next.addEventListener('click',function(e){
        if( x <= (allImages.length-2)*width){
          dx=1;
          buttonClicked();
        }
    })
  } 

  function buttonClicked(){
    clearInterval(sliderInterval);
    clearTimeout(sliderHold);
    sliderInterval = setInterval(animate, speed);
  }
}

