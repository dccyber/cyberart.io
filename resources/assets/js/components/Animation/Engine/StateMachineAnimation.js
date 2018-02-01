import TwoDimensionalStateMachine from "./TwoDimensionalStateMachine";

// TODO Combine with state machine
class StateMachineAnimation {

    constructor (height, width, title = 'Untitled Animation') {
        this.framesElapsed = 0;
        this.title = title;
        this.height = height;
        this.width = width;



        this.stateMachine = new TwoDimensionalStateMachine(this);
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

    initialStateGenerator (i, j) {
        return { i, j };
    };

    stateTransition (i, j) {

    }

    colorGenerator (cellState, framesElapsed) {
        return {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 255
        };
    }


}

export default StateMachineAnimation;