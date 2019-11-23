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

randomCells();
drawGrid();

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
	console.log(gameGrid.join('\n'));
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