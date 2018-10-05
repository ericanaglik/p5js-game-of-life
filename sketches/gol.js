var grid;
var populationUpdateSpeed = 0;

function setup() {
  createCanvas(400, 400);
  grid = new Grid(20);
  //step 5 part 4
  grid.randomize();
}

function draw() {
  background(250);

  populationUpdateSpeed++;

  if (populationUpdateSpeed == 50) {
    grid.updateNeighborCounts();
    grid.updatePopulation();
    populationUpdateSpeed = 1;
  }


  grid.draw();


}




//step 3
class Cell {
  constructor(column, row, size) {
    this.column = column,
      this.row = row,
      this.cellSize = size;

    this.isAlive = false;

    //step 6 part 2
    this.liveNeighborCount = 0;



  } //end of cell constructor 
  //step 5
  setIsAlive(value) {


    if (value == true) {
      this.isAlive = true;
    } else {
      this.isAlive = false;
    }

  }


  //step 6 part 3 
  liveOrDie() {
    if (this.liveNeighborCount < 2 && this.isAlive === true) {
      this.isAlive = false;
    } else if (this.isAlive === true && (this.liveNeighborCount == 2 || this.liveNeighborCount == 3)) {
      this.isAlive = true;
    } else if (this.isAlive === true && this.liveNeighborCount > 3) {
      this.isAlive = false;
    } else if (this.isAlive === false && this.liveNeighborCount == 3) {
      this.isAlive = true;
    }
  }



  //step 4
  draw() {
    fill(240);
    noStroke();
    rect(this.column * this.cellSize + 1, this.row * this.cellSize + 1, this.cellSize - 1, this.cellSize - 1);
    //step 4 part 3
    if (this.isAlive === false) {
      fill(240);
    } else if (this.isAlive === true) {
      fill(200, 0, 200);
    }
    noStroke();
    rect(this.column * this.cellSize + 1, this.row * this.cellSize + 1, this.cellSize - 1, this.cellSize - 1);

  }
}

class Grid {
  constructor(cellSize, numberOfRows, numberOfColumns) {
    // update the contructor to take cellSize as a parameter
    // use cellSize to calculate and assign values for numberOfColumns and numberOfRows
    this.cellSize = cellSize,
      this.numberOfRows = height / cellSize,
      this.numberOfColumns = width / cellSize;

    //step 2
    this.cells = new Array(this.numberOfColumns);
    for (var i = 0; i < this.cells.length; i++) {
      this.cells[i] = new Array(this.numberOfRows);
    }
    //step 3 part 2

    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row] = new Cell(column, row, cellSize);
      }
    }

    print(this.cells);

    //step 5 part 3 
    print(random(2));
    print(floor(random(2)));
  } //end of grid constructor



  //step 7
  getNeighbors(currentCell) {
    var neighbors = [];

    // add logic to get neighbors and add them to the array
    for (var xOffset = -1; xOffset <= 1; xOffset++) {
      for (var yOffset = -1; yOffset <= 1; yOffset++) {
        var neighborColumn = currentCell.column + xOffset;
        var neighborRow = currentCell.row + yOffset;

        // use neighborColumn and neighborRow to get neighborCell from the grid

        //step 9 part 1
        if (grid.isValidPosition(neighborColumn, neighborRow) === true) {
          var neighborCell = this.cells[neighborColumn][neighborRow]; //feedback 4
          // if neighborCell is not the currentCell, add it to neighbors
          if (neighborCell != currentCell) {
            neighbors.push(neighborCell);
          }
        }

      }
    }

    return neighbors;

  }

  //step 8
  isValidPosition(column, row) {
    // add logic that checks if the column and row exist in the grid
    // return true if they are valid and false if they are not
    if ((column >= 0 && column <= grid.numberOfColumns - 1) && (row >= 0 && row <= grid.numberOfRows - 1)) {
      return true;
    } else {
      return false;
    }

  }

  //step 10
  updateNeighborCounts() {
    // for each cell in the grid
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var currentCell = this.cells[column][row];
        // reset it's neighbor count to 0
        currentCell.liveNeighborCount = 0;
        // get the cell's neighbors
        var neighbors = grid.getNeighbors(currentCell);
        for (var i = 0; i < neighbors.length; i++) {
          var neighborCell = neighbors[i];
          if (neighborCell.isAlive === true) {
            currentCell.liveNeighborCount++;
          }
        }
      }
    }
  }



  //step 6 part 4
  updatePopulation() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {

        setTimeout(this.cells[column][row].liveOrDie(), 1000);


      }
    }
  }

  //step 5 part 2
  randomize() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {

        this.cells[column][row].setIsAlive(floor(random(2)));
      }
    }

  }

  //step 4 part 2
  draw() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].draw();
      }
    }
  }
}
//step 6
function mousePressed() {
  //grid.updateNeighborCounts();
  //grid.updatePopulation();

  var randomColumn = floor(random(grid.numberOfColumns));
  var randomRow = floor(random(grid.numberOfRows));

  var randomCell = grid.cells[randomColumn][randomRow];
  var neighborCount = grid.getNeighbors(randomCell).length; //feedback 5

  // print("cell at " + randomCell.column + ", " + randomCell.row + " has " + neighborCount + " neighbors");

  //step 10 check

  print(grid.cells);

  // should return FALSE if isValidPosition works correctly
  print(grid.isValidPosition(grid.numberOfColumns, grid.numberOfRows));

  //step 8 
  //print(grid.isValidPosition(0, 0)); // should be true
  //print(grid.isValidPosition(-1, -1)); // should be false
  //print(grid.isValidPosition(30, 40)); // Add an example for all of the possible ways that it should return false

}
