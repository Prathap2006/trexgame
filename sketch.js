var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudimage, cloudsgroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstaclesgroup;
var score;
var gamestate = "play"
var gameover , restart , restartimage ,gameoverimage;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  cloudimage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameoverimage = loadImage("gameOver.png");
  restartimage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  score = 0;
  cloudsgroup = new Group();
  obstaclesgroup = new Group();
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.4;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  restart = createSprite(300,140);
  restart.addImage("restart",restartimage);
  restart.visible = false;
  restart.scale = 0.5;
  
  gameover = createSprite(300,100);
  gameover.addImage("gameover",gameoverimage);
  gameover.visible = false;
  gameover.scale = 0.5;
  
  trex.addAnimation("trex_collided",trex_collided);
}

function draw() {
    background(150);
 
  if(gamestate === "play"){
   if(keyDown("space") && trex.y >= 161) {
    trex.velocityY = -10;
  }
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    spawnClouds();
    spawnObstacles();
     
    if(obstaclesgroup.isTouching(trex)){
       gamestate = "end"
       }
    score = score + Math.round(getFrameRate()/60);
    ground.velocityx = -2; 
    
  }
  else if(gamestate === "end"){
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
   
      trex.changeAnimation("trex_collided",trex_collided);
    
    obstaclesgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    
    restart.visible = true;
    gameover.visible = true;
    
if(mousePressedOver(restart)){
  reset();
}
  }

  
 
  
  trex.collide(invisibleGround);
  
  
  drawSprites();

  text("score:" + score ,500,50);
  
}

function reset(){
  gamestate = "play";
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclesgroup.destroyEach();
  cloudsgroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}


function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsgroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
   switch(rand){
     case 1:
       obstacle.addImage(obstacle1);
    break;
    case 2:
       obstacle.addImage(obstacle2);
    break;
    case 3:
       obstacle.addImage(obstacle3);
    break;
    case 4:
       obstacle.addImage(obstacle4);
    break;
    case 5:
       obstacle.addImage(obstacle5);
    break;
    case 6:
       obstacle.addImage(obstacle6);
    break;
    default:
       break;
   }  
    
    obstacle.scale = 0.4;
    obstacle.lifetime = 120;
    obstaclesgroup.add(obstacle);
  }
}