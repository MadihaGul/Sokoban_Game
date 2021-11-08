
document.onkeydown=arrowKeys;
let spaceToMove=Tiles.Space;
let noOfGoals=0;
let gameOver=false;

function drawMap(tileMap)
{   let gameBoard= document.getElementById('mapContainerId');


    for(let x = 0; x < tileMap.height; x++)
    {
        for(let y = 0; y < tileMap.width; y ++)
        {
            let tileGrid=document.createElement('div');
            tileGrid.id='x'+y+'y'+x;

            if(tileMap.mapGrid[x][y][0]==" ")
            {
                tileGrid.className=Tiles.Space;            
            }
            if(tileMap.mapGrid[x][y][0]=="W")
              {
                tileGrid.className=Tiles.Wall;  
              }
            
            if(tileMap.mapGrid[x][y][0]=="B")
            {
                tileGrid.className=Entities.Block;
            }
            if(tileMap.mapGrid[x][y][0]=="G")
            {
                tileGrid.className=Tiles.Goal;  
                noOfGoals++;
            }
             if(tileMap.mapGrid[x][y][0]=="P")
            {
                tileGrid.className=Entities.Character;
            }
            gameBoard.appendChild(tileGrid);

        }
    }
}


function arrowKeys(e)
{
    
   if(e.repeat || gameOver)
    {
        return;
    }

    switch(e.keyCode)
    {
        
        case 37: e.preventDefault(); movePlayer(-1,0);break;//Left arrow key
        case 38:e.preventDefault(); movePlayer(0,-1);break;//Up arrow key
        case 39: e.preventDefault();movePlayer(1,0);break;//Right arrow key
        case 40:e.preventDefault(); movePlayer(0,1);break;//Down arrow key
    }
 
};
function movePlayer(x,y)
{
   let playerCurrentPosition= document.getElementsByClassName(Entities.Character)[0];

   let playerPosition= getNewPositionId(playerCurrentPosition.id);

   let playerNextPosition= getPlayerCoordinates(playerPosition[0]+x, playerPosition[1]+y);
   
   if (playerNextPosition.className===Tiles.Wall)
   {
       return;
   }
   let isMoving = true;
   if(playerNextPosition.className===Entities.Block || playerNextPosition.className===Entities.BlockDone )
   {
       isMoving= moveBlock(playerPosition[0]+x, playerPosition[1]+y, x,y);
   }
   if(isMoving){
       playerCurrentPosition.className=spaceToMove;
       spaceToMove=playerNextPosition.className;
       playerNextPosition.className=Entities.Character;
   }

   win();
   /*if (gameOver)
   {alert("Congratulation! You Win");}*/
}
function win()
{
    let chkBlockDone=document.getElementsByClassName(Entities.BlockDone) ;
    chkBlockDone=chkBlockDone.length;

    if(chkBlockDone===noOfGoals)
    {
        gameOver=true;
        
    }
    

    
}

function moveBlock(nextPos_x,nextPos_y,pos_x,pos_y){
let moveTileDirection=getPlayerCoordinates(nextPos_x+pos_x,nextPos_y+pos_y);
let moveBlockDir=getPlayerCoordinates(nextPos_x,nextPos_y);
if (moveTileDirection.className === Tiles.Wall || moveTileDirection.className === Entities.Block
    ||moveTileDirection.className ===Entities.BlockDone)
{
 return false;
}

if (moveTileDirection.className ===Tiles.Goal)
{
    moveTileDirection.className=Entities.BlockDone;
}
else{
    moveTileDirection.className=Entities.Block;
}

if(moveBlockDir.className===Entities.BlockDone){
    moveBlockDir.className=Tiles.Goal;
}
else{
    moveBlockDir.className=Tiles.Space;
}

return true;
}

function getPlayerCoordinates(pos_x,pos_y )
{

    let playerNextId='x'+pos_x+'y'+pos_y;
    return document.getElementById(playerNextId);
}

function getNewPositionId(playerId)
{
playerId=playerId.slice(1,playerId.length);
let getPlayerId=playerId.split('y');
getPlayerId[0]=parseInt(getPlayerId[0]);
getPlayerId[1]=parseInt(getPlayerId[1]);
return getPlayerId;
}