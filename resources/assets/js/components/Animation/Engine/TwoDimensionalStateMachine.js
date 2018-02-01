import StateBuffer from './StateBuffer';

//TODO: combine this class into StateMachineAnimation
class TwoDimensionalStateMachine {

    constructor (animationContainer) {

        this.animationContainer = animationContainer;
        this.height = animationContainer.height;
        this.width = animationContainer.width;


        // Set starting conditions
        let initialState = [];
        for ( let i = 0; i < this.height; i++ ) {
            initialState[i] = [];
            for ( let j = 0; j < this.width; j++ ) {
                initialState[i][j] = animationContainer.initialStateGenerator(i, j);
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
                this.animationContainer.stateTransition(i, j, this.height, this.width, this.getState(), this.getNextState());
            }
        }

        // TODO: explain or rename this method
        this.stateBuffer.tick();
    }
}

export default TwoDimensionalStateMachine;