import StateMachineAnimation from "../../../../Engine/StateMachineAnimation";
import GameOfLifeAnimation from "./GameOfLifeAnimation";

// TODO: cleanup and comment
/**
 * Copyright Aaron Boyarsky, 2018
 */
class BloomingGameOfLifeAnimation extends GameOfLifeAnimation {
    constructor(width, height, title = "Game of Life - Bloom Mod") {
        super(width, height, title);
    }

    initialStateGenerator(i, j) {
        let alive = this.seedIsAlive(i, j);

        return {
            alive: alive,
            age: alive ? 1 : 0,
            blooming: 0,
            fade: 0
        };
    }

    seedIsAlive(i, j) {
        return Math.floor(Math.random() + 0.5) === 1;
    }

    createNewCell(nextCellState) {
        nextCellState.alive = 1;
        nextCellState.age = 1;
        nextCellState.blooming = 0;
    }

    handleLivingCellTransition(cellState, nextCellState, neighborInfo) {
        if (neighborInfo.count < 2 || neighborInfo.count > 3) {
            super.createDeadCell(nextCellState, cellState);
        } else {
            nextCellState.alive = 1;
            nextCellState.age = cellState.age + 1;
        }
    }

    handleDeadCellTransition(cellState, nextCellState, neighborInfo) {
        const bloomTimeFactor = 1;
        const totalNeighborAgeToBloom = 1950 * bloomTimeFactor;

        if (neighborInfo.count === 3) {
            this.createNewCell(nextCellState);
        } else {
            if (neighborInfo.ageTotal > totalNeighborAgeToBloom) {
                this.createNewCell(nextCellState, cellState);
            } else if (neighborInfo.ageTotal > totalNeighborAgeToBloom - 255) {
                nextCellState.blooming =
                    neighborInfo.ageTotal - (totalNeighborAgeToBloom - 255);
                this.createDeadCell(nextCellState);
            } else {
                if (!neighborInfo.count) {
                    nextCellState.blooming = 0;
                }
                this.createDeadCell(nextCellState, cellState);
            }
        }
    }

    updateNeighborInfo(neighborInfo, cellState) {
        neighborInfo.count += cellState.alive;
        neighborInfo.ageTotal += cellState.age;
    }

    generateRed(cellState) {
        return cellState.alive
            ? Math.min(cellState.age, 255)
            : (cellState.blooming * 7) % 256;
    }

    generateGreen(cellState) {
        return cellState.alive
            ? Math.max(255 - cellState.age, 0)
            : (cellState.blooming * 11) % 256;
    }

    colorGenerator(cellState, framesElapsed) {
        return {
            red: this.generateRed(cellState),
            green: this.generateGreen(cellState),
            blue: this.generateBlue(cellState),
            alpha: 255
        };
    }
}

export default BloomingGameOfLifeAnimation;
