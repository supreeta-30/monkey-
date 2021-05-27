
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup

var bananaCollected = 0;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600)
 
  //creating monkey sprite
  monkey = createSprite(100,500,20,20);
  monkey.addAnimation("moving" ,monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(100,570,900,20);
  ground.x = ground.width/2;
 

 obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  bananaCollected = 0;
}


function draw() {
background("green");
  
  if(ground.x<0){
    ground.x = ground.width/2
  }
  
  spawnBanana();
  spawnObstacles();       
  
  if(keyDown("space")&& monkey.y >=300){
    monkey.velocityY = -12;
     }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    bananaCollected = bananaCollected+1;
    
  }
 monkey.velocityY = monkey.velocityY + 0.8;
  
monkey.collide(ground);
  
  drawSprites();  
  
  fill("white")
  text("bananaCollected:"+bananaCollected,450,50);
  
  fill("black")
  textSize(20)
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survivalTime:"+survivalTime,100,50 )
}



function spawnBanana(){
  //creating spawn the clouds
  if(frameCount% 160===0){
  banana =createSprite (600,100,40,10);
    banana.y = Math.round(random(200,200));
    banana.addImage(bananaImage);
    banana.scale=0.2;
    banana.velocityX = -3;
    
    //assign lifeTime to the variable
    monkey.lifeTime = 500;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding bannana to the group
    bananaGroup.add(banana);
  }
}
function spawnObstacles(){
  //creating spawn the obstacles
  if(frameCount %300===0){
    var obstacle = createSprite(500,530,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    
    //generate random obstacles
    var rand =Math.round(random(1));
    switch(rand){
      case 1 : obstacle.addImage(obstacleImage);
               break;
        default : break;
    }
    
    //assign scale and lifetime to the obstacle
    obstacle.scale = 0.25;
    obstacle.lifeTime = 500;
    
    //add each obstacl to the group
    obstacleGroup.add(obstacle);
  }
}