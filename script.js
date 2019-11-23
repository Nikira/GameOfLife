/* Game of Life */
/* ### Initialization ### */

// declare game grid width
const gridWidth = 100;
const gridHeight = 100;
const gridScale = 5;
// create the grid
var gameGrid = createGrid(gridHeight, gridWidth);
// create javascript canvas to draw game on
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.scale(gridScale, gridScale);
ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
var fps = 10;
var timeout = 1000;
var playing = false;
// initialize control buttons
setupControlButtons();
play();

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

function countNeighboursLoop( x, y)
{
	var totalNeighbours = 0;
	
	for(let i = x - 1; i <=	x + 1; i++){
		for(let j = y - 1; j <= y + 1; j++){
			// check if indexes don't go out of bounds
			if(i >= 0 && j >= 0 && i < gridHeight && j < gridWidth){
				//don't count the cell itself
				if(!(x == i && y == j)){	
					totalNeighbours += gameGrid[i][j];
				}
			}
		}
	}
	return totalNeighbours;
}

function countNeighbours( x, y )
{
	let totalCells = 0;
	let maxX = gridHeight - 1;
	let maxY = gridWidth - 1;
	
	// top
	if(x > 0){
		totalCells += (y > 0) 	? gameGrid[x - 1][y - 1] : 0; 	//top left
		totalCells += (y < maxY)? gameGrid[x - 1][y + 1] : 0; 	//top right
		totalCells += gameGrid[x - 1][y]; 						//top center
	}
	
	// bottom
	if(x < maxX){
		totalCells += (y > 0)	? gameGrid[x + 1][y - 1] : 0; 	//bottom left
		totalCells += (y < maxY)? gameGrid[x + 1][y + 1] : 0; 	//bottom right	
		totalCells += gameGrid[x + 1][y]; 						//bottom center
	}
	
	// middle
	totalCells += (y > 0) 		? gameGrid[x][y - 1] : 0; 			//middle left
	totalCells += (y < maxY) 	? gameGrid[x][y + 1]: 0; 			//middle right
	
	return totalCells;
}

function mirrorEdges(mirrorArray)
{
	// mirror edges so organisms can wrap around the grid
	for (let i = 0; i < gridHeight; i++) {
		//left and right
		mirrorArray[i][0] = mirrorArray[i][gridWidth - 2];
		mirrorArray[i][gridWidth - 1] = mirrorArray[i][1];
	}
	
	for (let i = 0; i < gridWidth; i++) {
		//top and bottom
		mirrorArray[0][i] = mirrorArray[gridHeight - 2][i];
		mirrorArray[gridHeight - 1][i] = mirrorArray[1][i];
	}
}

/* Exercise 4 */
// update the game grid every tick according to 'game of life' rules
function updateGrid(){
	
	// create a mirror grid to store changes from update.
	var mirrorGrid = createGrid(gridHeight, gridWidth);

	for (let i = 0; i < gridHeight; i++){
		for (let j = 0; j < gridWidth; j++){
			// save total cells
			var totalCells = countNeighbours(i, j);
			// save game grid in mirror grid in order to apply game rules to it
			switch(totalCells){
				case 1:
					mirrorGrid[i][j] = 0; // kill cell due to underpopulation
	                break;
				case 2:
					mirrorGrid[i][j] = gameGrid[i][j]; // keep cell status
	                break;
				case 3:
					mirrorGrid[i][j] = 1; // if the cell has 3 neighbors, switch to alive
                    break;
				default:
					mirrorGrid[i][j] = 0; // dead cell
			}
		}
	}
	
	mirrorEdges(mirrorGrid);
	// apply changes from mirror grid to gameGrid
	gameGrid = mirrorGrid;
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
	var fpsUpButton = document.getElementById("fps_up");
	fpsUpButton.onclick = fpsUpButtonHandler;
	
	// button to slpw down time
	var fpsDownButton = document.getElementById("fps_down");
	fpsDownButton.onclick = fpsDownButtonHandler;

	// button to call one step update
	var oneUpdateButton = document.getElementById("one_update");
	oneUpdateButton.onclick = oneUpdateButtonHandler;
}

function randomButtonHandler(){
	// call grid creation functions and game loop
	randomCells();
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
	if (playing) {
        console.log("Pause the game");
        playing = false;
        this.innerHTML = "Continue";
    } else {
        console.log("Continue the game");
        playing = true;
        this.innerHTML = "Pause";
    }
}

function clearButtonHandler(){
	clearGrid();
}

function oneUpdateButtonHandler()
{
	updateGrid();
}

/* Exercise 5 */
// Main function with game step logic
function play() {
	if(playing)
	{
		updateGrid();
	}
	
	// empty canvas before redraw
	ctx.clearRect(0,0,gridHeight,gridWidth);
	drawGrid();
	// measure time it takes for one game tick to complete
	// restrict update rate to set frames per second
	setTimeout(function() {
		requestAnimationFrame(play);
	}, timeout / fps);
}


/* Exercise 7 */
// add draw function and pause button
function handleEvent(oEvent) {
    var canvas = document.getElementById("myCanvas");
	console.log(`mouse click on canvas screenY: ${oEvent.screenX} screenY: ${oEvent.screenY} `);
	var rect = canvas.getBoundingClientRect();
	console.log(`mouse click on rect top: ${rect.top} left: ${rect.left} `);
	let x = oEvent.clientX - rect.left;
	let y = oEvent.clientY - rect.top;
	console.log(`mouse click offsetX: ${x} offsetY: ${y} `);
	let cellX = Math.floor(x / gridScale);
	let cellY = Math.floor(y / gridScale);
	console.log(`mouse click cellX: ${cellX} cellY: ${cellY} `);
	if( cellX >= 0 && cellY >= 0 && cellX < gridHeight && cellY < gridWidth)
	{
		if(gameGrid[cellX][cellY] == 0){
			gameGrid[cellX][cellY] = 1;		
		}
		else{
			gameGrid[cellX][cellY] = 0;
		}
	}
}