var gameState = "play";

var door,doorImg,doorG;
var climber,climberImg,climberG;
var ghost,ghostImg;
var tower,towerImg;
var invisible_Block_G,invisible_Block;

function preload(){
 doorImg = loadImage("door.png");
 climberImg = loadImage("climber.png");
 ghostImg = loadImage("ghost-standing.png");
 towerImg = loadImage("tower.png");
  
  }
function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300,300,300);
  tower.addImage("tower.png",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost-standing.png",ghostImg);
  ghost.scale = 0.3;
  
  doorG = new Group();
  climberG = new Group();
  invisible_Block_G = new Group();
  
}

function draw(){
  background(0);
  
  if(gameState === "play"){
    
  
  
  if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x - 3;
    
  }
  
  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(climberG.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisible_Block_G.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end";
    
  }
  
  spawnDoors();
  
drawSprites(); 
  } 
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER",230,250);
    
  }
}

function spawnDoors(){
  
  if(frameCount % 240 === 0){
    door = createSprite(200,-50);
    door.addImage("door.png",doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    door.lifetime = 800;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    doorG.add(door);
    
    climber = createSprite(200,10);
    climber.addImage("climber.png",climberImg);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 800;
    climber.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    climberG.add(climber);
    
    invisible_Block = createSprite(200,15);
    invisible_Block.debug = true;
    invisible_Block.velocityY =1;
    invisible_Block.width = climber.width;
    invisible_Block.x = climber.x;
    invisible_Block.height = 2;
    invisible_Block.lifetime = 800;
    invisible_Block_G.add(invisible_Block);
    
    console.log(invisible_Block.x);
    
    
    
  }
}