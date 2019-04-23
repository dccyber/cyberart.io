import StateMachineAnimation from "../../../Engine/StateMachineAnimation";

/**
 * Copyright Aaron Boyarsky, 2018
 */
class ModularArithmeticAnimation extends StateMachineAnimation {
  constructor(width, height, title = "Modular Arithmetic Sample #1") {
    super(width, height, title);
  }

  initialStateGenerator(i, j) {
    return { a: (i + j) % Math.abs(i - j), b: i + (j + 75), c: i + j * 2 };
  }

  stateTransition(i, j, width, height, state, nextState) {
    const cellState = state[i][j];
    cellState.a = cellState.a + 0.5;
    cellState.b = cellState.b - 2;
    cellState.c = cellState.c + 7;
  }

  colorGenerator(cellState) {
    return {
      red: 3 + (cellState.a % 252),
      green: 7 + (Math.abs(cellState.b) % 248),
      blue: 11 + (cellState.c % 244),
      alpha: 255
    };
  }
}

export default ModularArithmeticAnimation;
