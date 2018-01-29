import StateBuffer from './StateBuffer';

class TwoDimensionalStateMachine {

    constructor (height, width, initialStateGenerator, stateTransition) {

        this.stateTransition = stateTransition; //TODO: support multiple state transitions

        // Set starting conditions
        let initialState = [];
        for ( let i = 0; i < height; i++ ) {
            initialState[i] = [];
            for ( let j = 0; j < width; j++ ) {
                initialState[i][j] = initialStateGenerator(i, j);
            }
        }

        this.stateBuffer = new StateBuffer(initialState);
        this.state = this.stateBuffer.current();
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

        // TODO: explain or rename this method
        this.stateBuffer.tick();
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
}

export default TwoDimensionalStateMachine;