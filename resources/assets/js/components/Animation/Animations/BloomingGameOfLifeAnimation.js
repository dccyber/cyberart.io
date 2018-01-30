import StateMachineAnimation from "../Engine/StateMachineAnimation";

// TODO: cleanup and comment
class BloomingGameOfLifeAnimation extends StateMachineAnimation {

    constructor (height, width) {


        const initialStateGenerator = (i, j) => {

            let alive = Math.floor(Math.random() + 0.5) === 1;
            return {
                alive: alive,
                age: alive ? 1 : 0,
                blooming: 0
            };
        };

        const totalNeighborAgeToBloom = 3000;

        const stateTransition = (i, j) => {
            let state = this.stateMachine.getState();
            let nextState = this.stateMachine.getNextState();
            let cellState = state[i][j];
            let nextCellState = nextState[i][j];

            let neighborCount = 0;
            let neighborAgeTotal = 0;
            for(let x=-1; x<2; x++) {
                for(let y=-1; y<2; y++) {
                    if(x||y){
                        let i2 = i+x;
                        let j2 = j+y;
                        if (i2 < 0) {
                            i2 += width;
                        }
                        if (i2 >= width) {
                            i2 -= width;
                        }
                        if (j2 < 0) {
                            j2 += height;
                        }
                        if (j2 >= height) {
                            j2 -= height;
                        }
                        neighborCount += state[i2][j2].alive;
                        neighborAgeTotal += state[i2][j2].age;
                    }
                }
            }

            if (cellState.alive) {
                if (neighborCount < 2 || neighborCount > 3) {
                    nextCellState.alive = 0;
                    nextCellState.age = 0;
                } else {
                    nextCellState.alive = 1;
                    nextCellState.age = cellState.age + 1;
                }
            } else {
                if (neighborCount === 3) {
                    //console.log(neighborAgeTotal);
                    nextCellState.alive = 1;
                    nextCellState.age = 1;
                    nextCellState.blooming = 0;
                } else {

                    if (neighborAgeTotal > totalNeighborAgeToBloom) {
                        nextCellState.alive = 1;
                        nextCellState.age = 1;
                        nextCellState.blooming = 0;
                    } else if (neighborAgeTotal > (totalNeighborAgeToBloom - 255)) {
                        nextCellState.blooming = neighborAgeTotal - (totalNeighborAgeToBloom - 255);
                        nextCellState.alive = 0;
                        nextCellState.age = 0;
                    } else {
                        if (!neighborCount) {
                            nextCellState.blooming = 0;
                        }
                        nextCellState.alive = 0;
                        nextCellState.age = 0;
                    }

                }
            }

        };


        const colorGenerator = (cellState, framesElapsed) => {
            return {
                red: cellState.alive ? Math.min(cellState.age, 255) : (cellState.blooming * 7) % 256,
                green: cellState.alive ? Math.max(255 - cellState.age, 0) : (cellState.blooming * 11) % 256,
                blue: cellState.alive ? 0 : (cellState.blooming) % 256,

                /*
                red: (cellState.iter + framesElapsed * 3) % 256,
                green: (cellState.iter + framesElapsed * 13) % 256,
                blue: (cellState.iter + framesElapsed * 29) % 256,
                */
                alpha: 255
            };
        };

        super(height, width, initialStateGenerator, stateTransition, colorGenerator, "Game of Life - Bloom Mod" );
    }

}

export default BloomingGameOfLifeAnimation;