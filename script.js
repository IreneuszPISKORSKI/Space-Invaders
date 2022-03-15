let playerX = 650;
let shotX = playerX;
let shotY = 726;
let shoot = false;
let eShoot = [];
let eShotX = [];
let eShotY = [];
let adversariesArrayX1 = [];
let adversariesArrayY1 = 50;
let adversariesArrayX2 = [];
let adversariesArrayY2 = 100;
let enemyDirectionX1 = 1;
let enemyDirectionX2 = 1;
let hitTry = [];
let hit = [];
let enemyNumber = 12;
let distance = [];
// let death = false;
let playerHit = false;


function setup(){
    createCanvas(1280,800);
    rectMode(CENTER);
    for (i=0; i<enemyNumber; i++){
        eShoot[i] = false;
        hit[i] = false;    
    }
    for (i=0; i<enemyNumber/2; i++){
        adversariesArrayX1[i] = i*50 + 50;
        adversariesArrayX2[i] = i*50 + 50;
    }

}

function draw(){
    background(150);
    player();
    shot();
    adversaries();
    lostLife();
    circle(playerX, 750,60);
}

function player(){
    if (keyIsDown(LEFT_ARROW)){
        playerX=playerX-10;
    }
    if (keyIsDown(RIGHT_ARROW)){
        playerX=playerX+10;
    }
    if (playerX<30){
        playerX=30;
    }
    if (playerX>1250){
        playerX=1250;
    }
    
}

function shot(){
    if (shoot){
        shotY = shotY -10;
        push();
        noStroke();
        fill(255,0,0);
        circle(shotX,shotY,8);
        pop();
    } else{
        shotX = playerX;
        shotY = 727;
        push();
        noStroke();
        noFill();
        circle(shotX,shotY,8);
        pop();
    }

    if (keyIsDown(32)&&(shoot!=true)){
        shoot = true;
    }

    if (shotY<0){
        shoot = false;
    }
}

function adversaries(){
    for (i=0; i<adversariesArrayX1.length; i++){
        if (adversariesArrayX1[i]<15){
            enemyDirectionX1 *= -1;
            adversariesArrayY1 = adversariesArrayY1 +15;
        }
        if (adversariesArrayX2[i]<15){
            enemyDirectionX2 *= -1;
            adversariesArrayY2 = adversariesArrayY2 +15;
        }

        adversariesArrayX1[i] = adversariesArrayX1[i] + 5 * enemyDirectionX1;
        adversariesArrayX2[i] = adversariesArrayX2[i] + 5 * enemyDirectionX2;
        
        if (adversariesArrayX1[i]>1265){
            enemyDirectionX1 *= -1;
            adversariesArrayY1 = adversariesArrayY1 +15;
        }
        if (adversariesArrayX2[i]>1265){
            enemyDirectionX2 *= -1;
            adversariesArrayY2 = adversariesArrayY2 +15;
        }

        hitTry[i] = dist(shotX,shotY,adversariesArrayX1[i],adversariesArrayY1);
        hitTry[i+6] = dist(shotX,shotY,adversariesArrayX2[i],adversariesArrayY2);

        if ((hitTry[i]<19)&&(hit[i]==false)){
            hit[i] = true;
            shoot = false; 
        } 
        if ((hitTry[i+6]<19)&&(hit[i+6]==false)){
            hit[i+6] = true;
            shoot = false; 
        }

        if (hit[i]){
            push();
            noFill();
            circle(adversariesArrayX1[i], adversariesArrayY1, 30);
            pop();
        }else{
            push();
            fill(0,255,0);
            circle(adversariesArrayX1[i], adversariesArrayY1, 30);
            pop();
        }
        if (hit[i+6]){
            push();
            noFill();
            circle(adversariesArrayX2[i], adversariesArrayY2, 30);
            pop();
        }else{
            push();
            fill(0,255,0);
            circle(adversariesArrayX2[i], adversariesArrayY2, 30);
            pop();
        }
        
        if ((frameCount % 60 == 0)&&(random(0,10)>9)&&(hit[i]==false)){
            eShoot[i] = true;
        }

        if (eShoot[i]){
            eShotY[i] = eShotY[i] + 10;
            push();
            noStroke();
            fill(255,0,0);
            circle(eShotX[i],eShotY[i],8);
            pop();
        } else{
            eShotX[i] = adversariesArrayX1[i];
            eShotY[i] = adversariesArrayY1 + 19;
            push();
            noStroke();
            noFill();
            circle(eShotX[i],eShotY[i],8);
            pop();
        }

        if (eShotY[i]>800){
            eShoot[i] = false;
        }
    }
}

function lostLife(){
    for (i=0; i<enemyNumber; i++){
        distance[i] = dist(eShotX[i],eShotY[i],playerX,750);
        if ((distance[i])<34){
            playerHit = true;
            print("game over");
        }
    }
}