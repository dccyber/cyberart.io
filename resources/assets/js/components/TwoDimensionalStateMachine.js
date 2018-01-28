import StateBuffer from './StateBuffer';

class TwoDimensionalStateMachine {

    constructor (initialState, stateTransition, colorGenerator) {

        this.stateBuffer = new StateBuffer(initialState);

        this.state = this.stateBuffer.current();
        this.nextState = this.stateBuffer.next();

        this.stateTransition = stateTransition; //TODO: support multiple state transitions
        this.colorGenerator = colorGenerator;
    }

    getState () {
        return this.stateBuffer.current();
    }

    performStateTransition () {
        for ( let i = 0; i < this.state.length; i++ ) {
            for ( let j = 0; j < this.state[i].length; j++ ) {
                // Calculate next state
                this.performCellStateTransition(i, j);
            }
        }

        this.stateBuffer.tick();
        this.state = this.stateBuffer.current();
        this.nextState = this.stateBuffer.next();
    }

    /*
    // N-dimensional version
    getCellState (...coords) {
        let state = this.state;
        for(let i=0; i<coords.length; i++) {
            state = state[coords[i]];
        }
        return state;
    }
    */

    getCellState (i, j) {
        return this.state[i][j];
    }

    //TODO: support specifying a state transition
    getNextCellState (...coords) {
        this.stateTransition(this.getCellState(...coords));
    }

    performCellStateTransition(i, j) {
        this.getNextCellState(i, j);
    }

    generateColor(...coords) {
        return this.colorGenerator(this.getCellState(...coords));
    }
}

export default TwoDimensionalStateMachine;