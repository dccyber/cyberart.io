import TwoDimensionalStateMachine from './TwoDimensionalStateMachine';

// TODO Combine with state machine
/**
 * Copyright Aaron Boyarsky, 2018
 */
class StateMachineAnimation {
    constructor(width, height, title = 'Untitled Animation') {
        this.framesElapsed = 0;
        this.title = title;
        this.width = width;
        this.height = height;

        // TODO: instantiation with param this makes it hard to update machine dimensions
        this.stateMachine = new TwoDimensionalStateMachine(this);
    }

    generateColor(i, j) {
        return this.colorGenerator(this.stateMachine.state[i][j], this.framesElapsed);
    }

    moveToNextFrame() {
        this.framesElapsed++;
        this.stateMachine.performStateTransition();
    }

    initialStateGenerator(i, j) {
        return { i, j };
    }

    stateTransition(i, j, width, height, state, nextState) {}

    stateTransitionCleanup() {}

    colorGenerator(cellState, framesElapsed) {
        return {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 255
        };
    }
}

export default StateMachineAnimation;
