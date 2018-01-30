import StateMachineAnimation from "../Engine/StateMachineAnimation";

// TODO: cleanup and comment
class SymmetricalBTGameOfLifeAnimation extends StateMachineAnimation {

    constructor (height, width) {

        //TODO: refactor this with SymmetricalBTGameOfLifeAnimation to just pass in different initial states
        const initialStateGenerator = (i, j) => {

            // Structured start
            let alive = i > Math.floor(height / 2) - 6 && i < Math.floor(height / 2) + 6 && j == Math.floor(width / 2);
            return {
                alive: alive,
                age: alive ? 1 : 0,
                blooming: 0,
                fade: 0
            };
        };

        const bloomTimeFactor = 1;
        const maxNeighborAgeToBloom = 500 * bloomTimeFactor;
        const totalNeighborAgeToBloom = 1950 * bloomTimeFactor;

        const stateTransition = (i, j) => {
            let state = this.stateMachine.getState();
            let nextState = this.stateMachine.getNextState();
            let cellState = state[i][j];
            let nextCellState = nextState[i][j];

            let neighborCount = 0;
            let neighborAgeTotal = 0;
            let maxNeighborAge = 0;
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
                        maxNeighborAge = Math.max(maxNeighborAge, state[i2][j2].age)
                    }
                }
            }

            if (cellState.alive) {
                if (neighborCount < 2 || neighborCount > 3) {
                    nextCellState.alive = 0;
                    nextCellState.age = 0;
                    nextCellState.fade = 128;
                } else {
                    nextCellState.alive = 1;
                    nextCellState.age = cellState.age + 1;
                    nextCellState.fade = 0;
                }
            } else {
                if (neighborCount === 3) {
                    //console.log(neighborAgeTotal);
                    nextCellState.alive = 1;
                    nextCellState.age = 1;
                    nextCellState.blooming = 0;
                    nextCellState.fade = 0;
                } else {

                    if (maxNeighborAge > maxNeighborAgeToBloom || neighborAgeTotal > totalNeighborAgeToBloom) {
                        nextCellState.alive = 1;
                        nextCellState.age = 1;
                        nextCellState.blooming = 0;
                        nextCellState.fade = 0;
                    } else if (maxNeighborAge > (maxNeighborAgeToBloom - 255) || neighborAgeTotal > (totalNeighborAgeToBloom - 255)) {
                        nextCellState.blooming = neighborAgeTotal - (maxNeighborAgeToBloom - 255);
                        nextCellState.alive = 0;
                        nextCellState.age = 0;
                        nextCellState.fade = 0;
                    } else {
                        if (!neighborCount) {
                            nextCellState.blooming = 0;
                        }
                        nextCellState.blooming = 0;
                        nextCellState.alive = 0;
                        nextCellState.age = 0;
                        nextCellState.fade = Math.max(0, cellState.fade - 1);
                    }

                }
            }

        };


        const colorGenerator = (cellState, framesElapsed) => {
            return {
                red: cellState.alive ? Math.min(cellState.age, 255) : (cellState.blooming * 7) % 256,
                green: cellState.alive
                    ? Math.max(255 - cellState.age, 0)
                    : cellState.blooming ?
                        (cellState.blooming * 11) % 256 :
                        cellState.fade / 2,
                blue: cellState.alive ?
                    0 :
                    cellState.blooming ?
                        (cellState.blooming) % 256 :
                        cellState.fade,

                /*
                red: (cellState.iter + framesElapsed * 3) % 256,
                green: (cellState.iter + framesElapsed * 13) % 256,
                blue: (cellState.iter + framesElapsed * 29) % 256,
                */
                alpha: 255
            };
        };

        super(height, width, initialStateGenerator, stateTransition, colorGenerator, "Game of Life - Bloom Mod w/Trails - Symmetrical Seed" );
    }

}

export default SymmetricalBTGameOfLifeAnimation;