import StateMachineAnimation from "../../../../Engine/StateMachineAnimation";

// TODO: cleanup and comment
/**
 * Copyright Aaron Boyarsky, 2018
 */
class GameOfLifeAnimation extends StateMachineAnimation {
  constructor(width, height, title = "Game of Life") {
    super(width, height, title);
  }

  initialStateGenerator(i, j) {
    let alive = Math.floor(Math.random() + 0.5) === 1;
    return {
      alive: alive,
      age: alive ? 1 : 0
    };
  }

  createNewCell(nextCellState) {
    nextCellState.alive = 1;
    nextCellState.age = 1;
  }

  createDeadCell(nextCellState, cellState) {
    nextCellState.alive = 0;
    nextCellState.age = 0;
  }

  ageCell(nextCellState, cellState) {
    nextCellState.alive = 1;
    nextCellState.age = cellState.age + 1;
  }

  handleLivingCellTransition(cellState, nextCellState, neighborInfo) {
    if (neighborInfo.count < 2 || neighborInfo.count > 3) {
      this.createDeadCell(nextCellState, cellState);
    } else {
      this.ageCell(nextCellState, cellState);
    }
  }

  handleDeadCellTransition(cellState, nextCellState, neighborInfo) {
    if (neighborInfo.count === 3) {
      this.createNewCell(nextCellState);
    } else {
      this.createDeadCell(nextCellState, cellState);
    }
  }

  stateTransition(i, j, width, height, state, nextState) {
    let cellState = state[i][j];
    let nextCellState = nextState[i][j];

    let neighborInfo = this.getEmptyNeighborInfo();

    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        if (x || y) {
          let i2 = i + x;
          let j2 = j + y;
          if (i2 < 0) {
            i2 += width;
          }
          if (i2 >= width) {
            i2 -= width;
          }
          if (j2 < 0) {
            j2 += height;
          }
          if (j2 >= height) {
            j2 -= height;
          }

          this.updateNeighborInfo(neighborInfo, state[i2][j2]);
        }
      }
    }

    if (cellState.alive) {
      this.handleLivingCellTransition(cellState, nextCellState, neighborInfo);
    } else {
      this.handleDeadCellTransition(cellState, nextCellState, neighborInfo);
    }
  }

  getEmptyNeighborInfo() {
    return {
      count: 0,
      ageTotal: 0
    };
  }

  updateNeighborInfo(neighborInfo, cellState) {
    neighborInfo.count += cellState.alive;
  }

  generateRed(cellState) {
    return cellState.alive ? Math.min(cellState.age, 255) : 0;
  }

  generateGreen(cellState) {
    return cellState.alive ? Math.min(255 - cellState.age, 255) : 0;
  }

  generateBlue(cellState) {
    return cellState.alive ? 0 : cellState.blooming % 256;
  }

  colorGenerator(cellState, framesElapsed) {
    return {
      red: this.generateRed(cellState),
      green: this.generateGreen(cellState),
      blue: this.generateBlue(cellState), //cellState.alive ? Math.min(cellState.age, 255) : 0,

      /*
            red: (cellState.iter + framesElapsed * 3) % 256,
            green: (cellState.iter + framesElapsed * 13) % 256,
            blue: (cellState.iter + framesElapsed * 29) % 256,
            */
      alpha: 255
    };
  }
}

export default GameOfLifeAnimation;
