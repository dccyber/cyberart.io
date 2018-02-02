import StateBuffer from './StateBuffer';

//TODO: combine this class into StateMachineAnimation
class TwoDimensionalStateMachine {

    constructor (animationContainer) {

        this.animationContainer = animationContainer;
        this.width = animationContainer.width;
        this.height = animationContainer.height;



        // Set starting conditions
        let initialState = [];
        for ( let i = 0; i < this.width; i++ ) {
            initialState[i] = [];
            for ( let j = 0; j < this.height; j++ ) {
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
        for ( let i = 0; i < this.width; i++ ) {
            for ( let j = 0; j < this.height; j++ ) {
                // Calculate next state
                this.animationContainer.stateTransition(i, j, this.width, this.height, this.getState(), this.getNextState());
            }
        }

        this.animationContainer.stateTransitionCleanup();

        // TODO: explain or rename this method
        this.stateBuffer.tick();
    }
}

export default TwoDimensionalStateMachine;