/* Game of Life */
/* ### Initialization ### */

// declare game grid width
const gridWidth = 100;
const gridHeight = 100;
const gridScale = 5;
// create the grid
var gameGrid = createGrid(gridHeight, gridWidth);
// create a mirror grid for game loop
var mirrorGrid = createGrid(gridHeight, gridWidth);
// create javascript canvas to draw game on
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.scale(gridScale, gridScale);
ctx.fillStyle = "blue";
var fps = 2;
// initialize control buttons
setupControlButtons();


/* ### Functions ### */

/* Exercise 1 */
// create an array that contains another array for multi 2d array in js
// return an array with n elements and place an empty array in each of them in the for loop
function createGrid(rows, cols) {
	var array = [];
	for (var i = 0; i < rows; i++){
		array[i] = [];
		for (let j = 0; j < cols; j++){
			array[i][j] = 0;
		}
	}
	return array;
}

/* Exercise 2 */
// randomly populate the grid with 1 and 0, live and dead cells
function randomCells(){
	// iterate through rows
	for (var j = 25; j < gridHeight - 25; j++){
		// iterate through columns
		for (var k = 25; k < gridWidth - 25; k++){
			// get a random number then set cells to alive / dead depending on the value
			var randomNum = Math.random();
			if (randomNum <= 0.5) {
				gameGrid[j][k] = 1;
			}
			else {
				gameGrid[j][k] = 0;
			}
		}
	}
	// console.log(gameGrid.join('\n'));
}

/* Exercise 3 */
// draw the grid and its content on screen
function drawGrid(){
	// canvas.addEventListener("mousedown", getPosition, false);
	for (let i = 0; i < gridHeight; i++){
		for (let j = 0; j < gridWidth; j++){
			// check cell value and draw on grid if it's a living cell
			if (gameGrid[i][j] === 1) {
				ctx.fillRect(i, j, 1, 1);
			}
		}
	}
}

/* Exercise 4 */
// update the game grid every tick according to 'game of life' rules
function updateGrid(){
	for (var j = 1; j < gridHeight - 1; j++){
		for (var k = 1; k < gridWidth - 1; k++){
			// save total cells
			var totalCells = 0;
			// add up values for surrounding cells
			totalCells += gameGrid[j - 1][k - 1]; 	//top left
	        totalCells += gameGrid[j - 1][k]; 		//top center
	        totalCells += gameGrid[j - 1][k + 1]; 	//top right
			totalCells += gameGrid[j][k - 1]; 		//middle left
	        totalCells += gameGrid[j][k + 1]; 		//middle right
			totalCells += gameGrid[j + 1][k - 1]; 	//bottom left
			totalCells += gameGrid[j + 1][k]; 		//bottom center
			totalCells += gameGrid[j + 1][k + 1]; 	//bottom right
			
			// save game grid in mirror grid in order to apply game rules to it
			switch(totalCells){
				case 1:
					mirrorGrid[j][k] = 0; // kill cell due to underpopulation
	                break;
				case 2:
					mirrorGrid[j][k] = gameGrid[j][k]; // keep cell status
	                break;
				case 3:
					mirrorGrid[j][k] = 1; // if the cell has 3 neighbors, switch to alive
                    break;
				default:
					mirrorGrid[j][k] = 0; // dead cell
			}
		}
	}
	
	// mirror edges so organisms can wrap around the grid
	for (var l = 1; l < gridHeight - 1; l++) {
		//top and bottom
		mirrorGrid[l][0] = mirrorGrid[l][gridHeight - 3];
		mirrorGrid[l][gridHeight - 2] = mirrorGrid[l][1];
		//left and right
		mirrorGrid[0][l] = mirrorGrid[gridHeight - 3][l];
		mirrorGrid[gridHeight - 2][l] = mirrorGrid[1][l];
	}
	
	// after applying game rules to the mirrored grid save it in the initial grid
	var tempGrid = gameGrid;
	gameGrid = mirrorGrid;
	mirrorGrid = tempGrid;
}

/* Exercise 6 */
// setup control buttons 

function setupControlButtons() {
    // button to start
    var startButton = document.getElementById("start");
    startButton.onclick = startButtonHandler;
    
    // button to clear
    var clearButton = document.getElementById("clear");
    clearButton.onclick = clearButtonHandler;
    
    // button to set random initial state
    var randomButton = document.getElementById("random");
    randomButton.onclick = randomButtonHandler;
	
	// button to speed up time
	var fpsUp = document.getElementById("fps_up");
	fpsUp.onclick = fpsUpButtonHandler;
	
	// button to slpw down time
	var fpsDown = document.getElementById("fps_down");
	fpsDown.onclick = fpsDownButtonHandler;
}

function randomButtonHandler(){
	// call grid creation functions and game loop
	randomCells();
	drawGrid();
}

function fpsUpButtonHandler(){
	if (fps <= 60){
		fps += 10;
	}
	else
		fps = 60;
}

function fpsDownButtonHandler(){
	if (fps >= 10){
		fps -= 10;
	}
	else
		fps = 1;
}

/* Exercise 3 */
// update the grid to see living cells on initialization
function clearGrid(){
	location.reload();
}

function startButtonHandler(){
	console.time("loop");
	updateGrid();
	// empty canvas before redraw
	ctx.clearRect(0,0,gridHeight,gridWidth)
	drawGrid();
	// measure time it takes for one game tick to complete
	console.timeEnd("loop");
	// restrict update rate to set frames per second
	setTimeout(function() {
		requestAnimationFrame(startButtonHandler);
	}, 1000 / fps);	
}



function clearButtonHandler(){
	clearGrid();
}

function timeStepUp(){
	
}

function timeStepDown(){
	
}

function handleEvent(oEvent) {
    var canvas = document.getElementById("myCanvas");
	console.log(`mouse click on canvas screenY: ${oEvent.clientX} screenY: ${oEvent.clientY} `);
	var rect = canvas.getBoundingClientRect();
	console.log(`mouse click on rect top: ${rect.top} left: ${rect.left} `);
	let x = oEvent.clientX - rect.left;
	let y = oEvent.clientY - rect.top;
	console.log(`mouse click offsetX: ${x} offsetY: ${y} `);
	let cellX = Math.floor(x / gridScale);
	let cellY = Math.floor(y / gridScale);
	console.log(`mouse click cellX: ${cellX} cellY: ${cellY} `);
	if( cellX >= 0 && cellY >= 0 && cellX < gridWidth && cellY < gridHeight)
	{
		gameGrid[cellX][cellY] = 1;		
	}
}

/* Exercise 5 
// get mouse click position and create a living cell
function getPosition(event){
	var x = event.x;
	var y = event.y;
	
	var canvas = document.getElementById("myCanvas");
	
	x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
	
}
*/