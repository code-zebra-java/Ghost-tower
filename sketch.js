var tower, toweri;
var door,doorI;
var climberI;
var ghost,ghostI;
var climberGroup, doorGroup;
var gameState="play";
var invisibleblock, invisibleblockGroup;

function preload(){
 toweri=loadImage("tower.png");
  doorI=loadImage("door.png");
  climberI=loadImage("climber.png");
  ghostI=loadImage("ghost-standing.png")
}
function setup(){
  createCanvas(600,600);
  tower= createSprite(300,300);
  tower.addImage(toweri);
 
  
  climberGroup=new Group();
  doorGroup=new Group();
  invisibleblockGroup=new Group();
  
  ghost= createSprite(300,300);
  ghost.addImage(ghostI);
  ghost.scale=0.5;
}
function draw(){
  background("black");
  
  


  

  
  if(gameState==="play"){
    //make the tower move
      tower.velocityY=5;
    //make the end blank
    drawSprites();
    //move the tower non stop
      if (tower.y>600){
    tower.y=tower.width/2;
  }
    //make the doors
    spawndoor();
    //give key controls to the ghost
      if(keyDown("left")){
     ghost.x=ghost.x-5;
     }
  
  if(keyDown("right")){
     ghost.x=ghost.x+5;
     }
  
  if(keyDown("space")){
     ghost.velocityY=-5;
     }
    //give the ghost gravity
  ghost.velocityY=ghost.velocityY+0.5;
    //make the ghost stand on the climber
      if (climberGroup.isTouching(ghost)){
      ghost.velocityY=0;
      }
    if (invisibleblockGroup.isTouching(ghost)||ghost.y>600){
        gameState="end";
        }
    
     }
  else if (gameState==="end"){
    //stop the tower
    tower.velocityY=0;
    textSize(60);
    fill("salmon");
    strokeWeight(6);
    stroke("magenta");
    text("GAME OVER",100,300);
           }
}
function spawndoor(){
  if (frameCount%60===0){
    door=createSprite(100,0);
    door.velocityY=5;
    door.x=Math.round(random(100,500))
    door.addImage(doorI);
    door.lifetime=120;
    doorGroup.add(door);
    ghost.depth= door.depth;
    ghost.depth+=1;
    
    //creating the climbers
    climber=createSprite(100,60);
    climber.addImage(climberI);
    climber.velocityY=5;
    climber.x=door.x;
    climber.scale=0.8;
    climber.lifetime=120;
    climberGroup.add(climber);
    
    //creating invisible block
    invisibleblock=createSprite(100,65);
    invisibleblock.velocityY=5;
    invisibleblock.x=door.x;
    invisibleblock.visible=false;
    invisibleblock.width=climber.width;
    invisibleblock.lifetime=120;
    invisibleblockGroup.add(invisibleblock);
      }
}