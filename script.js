let player2X = 300;
let playerX = 900;
let shotX = playerX;
let shot2X = player2X;
let shotY = 726;
let shot2Y = 726;
let shoot = false;
let shoot2 = false;
let eShoot = [];
let eShotX = [];
let eShotY = [];
let eShoot2 = [];
let eShotX2 = [];
let eShotY2 = [];
let adversariesArrayX1 = [];
let adversariesArrayY1 = 50;
let adversariesArrayX2 = [];
let adversariesArrayY2 = 100;
let enemyDirectionX1 = 1;
let enemyDirectionX2 = 1;
let hitTry = [];
let hit = [];
let hitTry2 = [];
let hit2 = [];
let enemyNumber = 12;
let distance = [];
let distance2 = [];
// let death = false;
let playerHit = false;
let player2Hit = false;


function setup(){
    createCanvas(1280,800);
    rectMode(CENTER);
    for (i=0; i<enemyNumber; i++){
        eShoot[i] = false;
        eShoot2[i] = false;
        hit[i] = false;    
        hit2[i] = false;    
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

    if (keyIsDown(81)||keyIsDown(81)){
        player2X=player2X-10;
    }
    if (keyIsDown(68)){
        player2X=player2X+10;
    }
    if (player2X<30){
        player2X=30;
    }
    if (player2X>1250){
        player2X=1250;
    }
    
    push();
    fill(255,0,0);
    circle(playerX, 750,60);
    pop();

    push();
    fill(0,0,255); 
    circle(player2X, 750,60);
    pop();
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

    if (shoot2){
        shot2Y = shot2Y -10;
        push();
        noStroke();
        fill(0,0,255);
        circle(shot2X,shot2Y,8);
        pop();
    } else{
        shot2X = player2X;
        shot2Y = 727;
        push();
        noStroke();
        noFill();
        circle(shot2X,shot2Y,8);
        pop();
    }

    if (keyIsDown(32)&&(shoot!=true)){          //Space
        shoot = true;
    }
    if (shotY<0){
        shoot = false;
    }

    if (keyIsDown(84)&&(shoot2!=true)){          // T
        shoot2 = true;
    }
    if (shot2Y<0){
        shoot2 = false;
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

        hitTry2[i] = dist(shot2X,shot2Y,adversariesArrayX1[i],adversariesArrayY1);
        hitTry2[i+6] = dist(shot2X,shot2Y,adversariesArrayX2[i],adversariesArrayY2);

        if ((hitTry[i]<19)&&(hit[i]==false)){
            hit[i] = true;
            hit2[i] = false;
            shoot = false; 
        } 
        if ((hitTry[i+6]<19)&&(hit[i+6]==false)){
            hit[i+6] = true;
            hit2[i+6] = false;

            shoot = false; 
        }

        if ((hitTry2[i]<19)&&(hit2[i]==false)){
            hit2[i] = true;
            hit[i] = false;
            shoot2 = false; 
        } 
        if ((hitTry2[i+6]<19)&&(hit2[i+6]==false)){
            hit2[i+6] = true;
            hit[i+6] = false;
            shoot2 = false; 
        }

        push();
        fill(0,255,0);
        circle(adversariesArrayX1[i], adversariesArrayY1, 30);
        circle(adversariesArrayX2[i], adversariesArrayY2, 30);
        pop();

        if (hit[i]){
            push();
            fill(255,0,0);
            circle(adversariesArrayX1[i], adversariesArrayY1, 30);
            pop();
        }
        if (hit[i+6]){
            push();
            fill(255,0,0);
            circle(adversariesArrayX2[i], adversariesArrayY2, 30);
            pop();
        }
        
        if (hit2[i]){
            push();
            fill(0,0,255);
            circle(adversariesArrayX1[i], adversariesArrayY1, 30);
            pop();
        }
        if (hit2[i+6]){
            push();
            fill(0,0,255);
            circle(adversariesArrayX2[i], adversariesArrayY2, 30);
            pop();
        }

        if ((frameCount % 60 == 0)&&(random(0,10)>9)&&(hit[i]==false)){
            eShoot[i] = true;
        }

        if ((frameCount % 60 == 0)&&(random(0,10)>9)&&(hit2[i]==false)){
            eShoot2[i] = true;
        }

        if (eShoot[i]){
            eShotY[i] = eShotY[i] + 10;
            push();
            noStroke();
            fill(255);
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

        if (eShoot2[i]){
            eShotY2[i] = eShotY2[i] + 10;
            push();
            noStroke();
            fill(255);
            circle(eShotX2[i],eShotY2[i],8);
            pop();
        } else{
            eShotX2[i] = adversariesArrayX2[i];
            eShotY2[i] = adversariesArrayY2 + 19;
            push();
            noStroke();
            noFill();
            circle(eShotX2[i],eShotY2[i],8);
            pop();
        }

        if (eShotY[i]>800){
            eShoot[i] = false;
        }

        if (eShotY2[i]>800){
            eShoot2[i] = false;
        }
    }
}

function lostLife(){
    for (i=0; i<enemyNumber; i++){
        distance[i] = dist(eShotX[i],eShotY[i],playerX,750);
        if ((distance[i]<34)&&(hit[i]!=true)){
            playerHit = true;
            print("game over");
        }
    }
}