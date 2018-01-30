import TwoDimensionalStateMachine from "./TwoDimensionalStateMachine";

class StateMachineAnimation {

    constructor (height, width, initialStateGenerator, stateTransition, colorGenerator, title) {
        this.framesElapsed = 0;
        this.stateTransition = stateTransition;
        this.colorGenerator = colorGenerator;
        this.stateMachine = new TwoDimensionalStateMachine(height, width, initialStateGenerator, stateTransition);
        this.title = title;
    }

    generateColor(i, j) {
        return this.colorGenerator(this.getCellState(i, j), this.framesElapsed);
    }

    moveToNextFrame() {
        this.framesElapsed++;
        this.stateMachine.performStateTransition();
    }

    getCellState(i, j) {
       return this.stateMachine.state[i][j];
    }
}

export default StateMachineAnimation;