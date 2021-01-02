var dog,happyDog;
var dogImg, happyDogImg;
var database;
var foodS,foodStock;
var lastFed;
var foodObj;
var fedTime;
var addFood;
var feed

function preload(){
   dogImg=loadImage("dog.png");
   happyDogImg=loadImage("happyDog.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(500,500);
  
  database=firebase.database();

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodObj = new Food(); 

  feed=createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });
}

// function to display UI
function draw() {
  background("green");
  fill("blue")
  textFont("Bold")
  textSize(21);
  if(lastFed>=12){
    text("Last Feed :"+ lastFed%12+"PM",350,30);
  
  }else if(lastFed==0){
    text("Last Feed : 12AM", 350,30)
  }else{
    text("Last Feed :" +lastFed + "AM", 350,30);
  }

  foodObj.display();
 
  

  drawSprites();
  fill("blue");
  stroke("black");
  text("Food remaining : "+foodS,170,380);
  textSize(13);
  text("Note: Press the Buttons to Feed the Dog",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//Function to write values in DB
//function writeStock(x){
  //if(x<=0){
   /// x=0;
 // }else{
    //x=x-1;
  //} 
  //database.ref('/').update({
    //Food:x
  //})
//}
function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    //FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}