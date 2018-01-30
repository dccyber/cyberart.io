import TwoDimensionalStateMachine from "./TwoDimensionalStateMachine";

class StateMachineAnimation {

    constructor (height, width, initialStateGenerator, stateTransition, colorGenerator) {
        this.framesElapsed = 0;
        this.stateTransition = stateTransition;
        this.colorGenerator = colorGenerator;
        this.stateMachine = new TwoDimensionalStateMachine(height, width, initialStateGenerator, stateTransition);
    }

    generateColor(...coords) {
        return this.colorGenerator(this.stateMachine.getCellState(...coords), this.framesElapsed);
    }

    moveToNextFrame() {
        this.framesElapsed++;
        this.stateMachine.performStateTransition();
    }
}

export default StateMachineAnimation;