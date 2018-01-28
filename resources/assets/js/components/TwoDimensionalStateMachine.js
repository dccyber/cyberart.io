class TwoDimensionalStateMachine {

    constructor (initialState, stateTransition, colorGenerator) {

        this.stateBuffer = [
            initialState,
            initialState
        ];
        this.cbi = 0;

        this.state = this.stateBuffer[0];
        this.nextState = this.stateBuffer[1];

        this.stateTransition = stateTransition; //TODO: support multiple state transitions
        this.colorGenerator = colorGenerator;
    }

    getState () {
        return this.stateBuffer[this.cbi];
    }

    performStateTransition () {


        let useBuffer = true;
        if (useBuffer) {

            for ( let i = 0; i < this.state.length; i++ ) {
                for ( let j = 0; j < this.state[i].length; j++ ) {
                    // Calculate next state
                    this.nextState[i][j] = this.getNextCellState(i, j);
                }
            }

            this.cbi = (this.cbi + 1) % 2;
            this.state = this.stateBuffer[this.cbi];
            this.nextState = this.stateBuffer[(this.cbi + 1) % 2];

        } else {

            for ( let i = 0; i < this.state.length; i++ ) {
                for ( let j = 0; j < this.state[i].length; j++ ) {
                    // Calculate next state
                    this.performCellStateTransition(i, j);
                }
            }
        }
    }


    //TODO: support specifying a state transition
    getCellState (i, j) {
        return this.state[i][j];
    }

    getNextCellState (i, j) {
        return this.stateTransition(this.getCellState(i, j));
    }

    performCellStateTransition(i, j) {
        this.state[i][j] = this.getNextCellState(i, j);
    }

    generateColor(i, j) {
        return this.colorGenerator(this.getCellState(i, j));
    }
}

export default TwoDimensionalStateMachine;