import TwoDimensionalStateMachine from "./TwoDimensionalStateMachine";

class StateMachineAnimation {

    constructor (height, width, initialStateGenerator, stateTransition, colorGenerator) {
        this.initialStateGenerator = initialStateGenerator;
        this.stateTransition = stateTransition;
        this.colorGenerator = colorGenerator;
        this.stateMachine = new TwoDimensionalStateMachine(height, width, initialStateGenerator, stateTransition);
    }

    generateColor(...coords) {
        return this.colorGenerator(this.stateMachine.getCellState(...coords));
    }

    moveToNextFrame() {
        this.stateMachine.performStateTransition();
    }
}

export default StateMachineAnimation;