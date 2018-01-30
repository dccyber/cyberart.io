import StateMachineAnimation from "../Engine/StateMachineAnimation";

class ModularArithmeticAnimation extends StateMachineAnimation {

    constructor (height, width) {

        const initialStateGenerator = (i, j) => {
            return {a: (i+j)%(Math.abs(i-j)), b: i+(j+75), c: i+j*2};
        };

        const stateTransition = (i, j) => {
            const state = this.getCellState(i, j);
            state.a = state.a + 0.5;
            state.b = state.b - 2;
            state.c = state.c + 7;
        };

        const colorGenerator = (cellState) => {
            return {
                red: 3 + cellState.a % 252,
                green: 7 + Math.abs(cellState.b) % 248,
                blue: 11 + cellState.c % 244,
                alpha: 255
            };
        };

        super(height, width, initialStateGenerator, stateTransition, colorGenerator, 'Modular Arithmetic Sample #1');
    }

}

export default ModularArithmeticAnimation;