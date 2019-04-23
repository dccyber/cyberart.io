import BloomTrailGameOfLifeAnimation from "./BloomTrailGameOfLifeAnimation";

/**
 * Copyright Aaron Boyarsky, 2018
 */
class SymmetricalBTGameOfLifeAnimationC extends BloomTrailGameOfLifeAnimation {
    constructor(
        width,
        height,
        title = "Game of Life - Bloom/Trails - Central Cross Seed"
    ) {
        super(width, height, title);
    }

    seedIsAlive(i, j) {
        return (
            // i == this.width/2 || j == this.height/2 || i == j || this.width - i == j || i == j/2 || this.width - i == j/2
            //i == Math.floor(this.width/2)  || j == Math.floor(this.height/2) || i == j || this.width - i == j
            (i === Math.floor(this.width / 2) ||
                j === Math.floor(this.height / 2) ||
                i === j ||
                this.width - i === j) &&
            i > this.width / 4 &&
            i < (3 * this.width) / 4 &&
            j > this.height / 4 &&
            j < (3 * this.height) / 4
        );
    }
}

export default SymmetricalBTGameOfLifeAnimationC;
