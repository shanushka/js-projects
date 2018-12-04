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

  var allImages =  slider.children;

  for(i=0;i<allImages.length;i++)
  { 
     spanB=document.createElement('span');
     spanB.classList.add('bubble');
     bottomButton.appendChild(spanB);
     bubbles.push(spanB)
  }

  slider.style.marginLeft=0+'px';    
  var current = 0;
  var flag=1;
  var speed=50;
  var hold;
  var prev,next=0;
  prev=document.getElementById('btn-left');
  next=document.getElementById('btn-right');
  var margin,secondLast;

  this.init =function(){
    animate(5);   
    buttonEvent();
  }
  currentImage=0;

  function animate(speed) {
  secondLast= (allImages.length-1 )* 720;   
    interval=setInterval(function(){
      clearTimeout(hold)
      margin=parseInt(slider.style.marginLeft);
      slider.style.marginLeft=(margin-1*flag+'px');
      if (margin<=-secondLast){
        flag =-1;
      }
      else if(margin>0)
      {
        flag=1;
      }

      //Hold the Image 
      if((margin)%720==0){
        console.log(margin); 
        clearInterval(interval);
        currentImage++;

        console.log('currentImage',currentImage);
        hold= setTimeout( 
          function()
          { animate(speed);
        },2000)
      } 
    },speed);
    
    currentImage%=allImages.length

    //check active state
    bubbles.forEach(function(bubble,index){
      if(index === currentImage){
        bubble.classList.add('active')
      } else {
        bubble.classList.remove('active')
      }
    })

  }
  function buttonEvent(){
    prev.addEventListener('click',function(e){
        position=slider.style.marginLeft;
        // prev.disabled=true;
        if(margin<=-720){
            clearInterval(interval);
            // prev.disabled=false;
          flag=-1; 
          animate(5);
        }
            
    })

    next.addEventListener('click',function(e){
        if(margin>=-(allImages.length-2)*720){
        
          clearInterval(interval)
          flag=1;
          animate(5);
        }
    })
    } 
}

