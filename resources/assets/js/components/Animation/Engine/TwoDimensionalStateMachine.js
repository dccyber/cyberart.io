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

    getNextState () {
        return this.stateBuffer.next();
    }

    performStateTransition () {
        for ( let i = 0; i < this.state.length; i++ ) {
            for ( let j = 0; j < this.state[i].length; j++ ) {
                // Calculate next state
                this.stateTransition(i, j);
            }
        }

        // TODO: explain or rename this method
        this.stateBuffer.tick();
    }
}

export default TwoDimensionalStateMachine;