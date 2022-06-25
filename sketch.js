var bg;
var bgimage;
var canvas;

var blueFireBall = 70;
var bluefireBallImg;

var spaceShip,spaceShipImg;
var astronaut,astronautImg;

var spaceShipGroup;
var blueFireBallGroup;

var score = 0

var destructionsound
var firesound
var gameoversound

var gameState = "play"


function preload(){
 bgimage=loadImage("background.jpg");

  bluefireBallImg=loadImage("bluefireball.gif");

  spaceShipImg=loadImage("ufo.gif")

  astronautImg=loadImage("astronaut.gif")

  destructionsound=loadSound("destruction.mp3")

  firesound=loadSound("fire.mp3")

  gameoversound=loadSound("gameover.mp3")
}

function setup(){
  canvas=createCanvas(windowWidth,windowHeight)
  //createcanvas(600,800);
  bg=createSprite(windowWidth/2,windowHeight/2,20,20)
  bg.addImage("back",bgimage)
  bg.scale = 2.5 ;

  astronaut=createSprite( displayWidth-220,displayHeight-500.20,20);
  astronaut.addImage("astronaut",astronautImg);
  astronaut.scale=0.5

  spaceShipGroup= new Group()  
  blueFireBallGroup=new Group()


}

function spawnspaceShip(){
  if(frameCount %100 === 0){
    spaceShip=createSprite(random(50,300),random(50,500),40,40);
      spaceShip.addImage("spaceship",spaceShipImg);
        spaceShip.velocityX=(score/20 +3);
          spaceShip.scale=0.5;
          spaceShip.lifeTime=400;
          spaceShipGroup.add(spaceShip);
  }
}


function draw(){
  background(0);

  console.log(score)
 
  if(gameState === "play"){

  

  if(keyDown("UP")){
    astronaut.y=astronaut.y-10
  }

  if(keyDown("DOWN")){
    astronaut.y=astronaut.y+10
  }

  if(keyDown("SPACE")){
    blueFireBall=createSprite(displayWidth-200,astronaut.y,20,20)
    blueFireBall.addImage("fireball",bluefireBallImg)
    blueFireBall.scale=0.1
    blueFireBall.velocityX=-5;   
    blueFireBallGroup.add(blueFireBall)
   
    firesound.play()
    blueFireBall = blueFireBall-1
  }

  if(spaceShipGroup.isTouching(blueFireBallGroup)){
    for(var i=0;i<spaceShipGroup.length;i++){     
      
      if(spaceShipGroup[i].isTouching(blueFireBallGroup)){
          score =score+1
        
           spaceShipGroup[i].destroy()
           blueFireBallGroup.destroyEach()
          destructionsound.play()
           } 
     
     }
  }

    


  spawnspaceShip()    

  if(spaceShipGroup.isTouching(astronaut)){
    gameState = "end"
    gameoversound.play()
  }
}

  drawSprites();

  if(gameState === "end"){
    bg.destroy()
    astronaut.destroy()
    spaceShipGroup.destroyEach()
      textSize(50)
    fill("red")
    text("Your Planet Was Invaded:  "  ,displayWidth/2-200,displayHeight/2)  
  }

  textSize(20)
  fill("red")
  text("score:  " +  score,100,100)

  textSize(20)
  fill("red")
  text("fireballs:   " + blueFireBall,100,150)

}
