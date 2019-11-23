/* Game of Life */
/* ### Initialization ### */

// declare game grid width
const gridWidth = 100;
const gridHeight = 100;
const gridScale = 5;
// create the grid
var gameGrid = createGrid(gridHeight, gridWidth);
// create a mirror grid for game loop

// create javascript canvas to draw game on
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.scale(gridScale, gridScale);
ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
// set frames per second and timeout for main loop
var fps = 10;
var timeout = 1000;

var mirrorGrid = createGrid(gridHeight, gridWidth);

play();

function play() {
	randomCells();
	// empty canvas before redraw
	ctx.clearRect(0,0,gridHeight,gridWidth);
	updateGrid();
	drawGrid();	
	// restrict update rate to set frames per second
	setTimeout(function() {
		requestAnimationFrame(play);
	}, timeout / fps);
}





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
// Count nr. of neighbors next to a cell
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
	// console.log(totalCells);
	return totalCells;
	
}

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
	// apply changes from mirror grid to gameGrid
	gameGrid = mirrorGrid;
}