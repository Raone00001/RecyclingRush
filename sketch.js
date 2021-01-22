var player, playerIMG;

var trash, trashGroup;
var trash1, trash2, trash3, trash4, trash5, trash6, trash7;

var emoji, emojiIMG;

var bgIMG;

var score = 0;
var goal = 10000;

var canvas;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {

    playerIMG = loadImage("Images/Bin.png");
    
    trash1 = loadImage("Images/Trash1.png");
    trash2 = loadImage("Images/Trash2.png");
    trash3 = loadImage("Images/Trash3.png");
    trash4 = loadImage("Images/Trash4.png");
    trash5 = loadImage("Images/Trash5.png");
    trash6 = loadImage("Images/Trash6.png");
    trash7 = loadImage("Images/Trash7.png");
    
    bgIMG = loadImage("Images/Background.jpg");

    emojiIMG = loadImage("Images/Talking Emoji.png");

}

function setup(){
    canvas = createCanvas(1200,500);

    player = createSprite(600, 450, 10, 10);
    player.addImage("player", playerIMG);
    player.scale = 0.3;

    emoji = createSprite(20, 480, 10, 10);
    emoji.addImage("Talking Emoji", emojiIMG);
    emoji.scale = 0.3;

    trashGroup = new Group();

}

function draw(){
    background(bgIMG);

    fill("White");
    textSize(25);
    textFont("Cinzel");
    text("Score: " + score, 5,20);
    text("Goal: " + goal, 1070, 490);

    fill(random(0,255),random(0,255), random(0,255));
    textSize(15);
    text("Did you know that littering caused 80% of the marine pollution? So, remember to not litter! :)", 50, 480);

    if (gameState === PLAY){

        spawnTrash();

        if (keyDown(LEFT_ARROW)){

            player.x = player.x-20;

        } else if (keyDown(RIGHT_ARROW)){

            player.x = player.x+20;

        }

        if (trashGroup.isTouching(player)){

            score = score+200;
            trashGroup.destroyEach();

        } 

        if (score >= 10000){

            gameState = END;

        } 


    } else if (gameState === END){

        score = 0;
        goal = 0;
        //player.destroy();
        trashGroup.destroyEach();

        fill("Yellow");
        textSize(30);
        textFont("Cinzel");
        text("YAY, You Win! You helped reduce littering! :)", 330, 250);

    }

    drawSprites();

}

function spawnTrash(){

    if(frameCount % 10 === 0) {

        trash = createSprite(600,0,10,10);
        trash.x = Math.round(random(0,1200));
        //obstacle.debug = true;
        trash.velocityY = (7 + 1*score/400);
        
        //generate random obstacles
        var rand = Math.round(random(1,7));
        switch(rand) {
          case 1: trash.addImage(trash1);
                  break;
          case 2: trash.addImage(trash2);
                  break;
          case 3: trash.addImage(trash3);
                  break;
          case 4: trash.addImage(trash4);
                  break;
          case 5: trash.addImage(trash5);
                  break;
          case 6: trash.addImage(trash6);
                  break;
          case 7: trash.addImage(trash7);
                  break;
          default: break;
        }
        
        //assign scale and lifetime to the obstacle           
        trash.scale = 0.1;
        //trash.lifetime = 30;
        //add each obstacle to the group
        trashGroup.add(trash);
        
    }

}