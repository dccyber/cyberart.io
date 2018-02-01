

// TODO: cleanup and comment
import BloomTrailGameOfLifeAnimation from "./BloomTrailGameOfLifeAnimation";

class SymmetricalBTGameOfLifeAnimation extends BloomTrailGameOfLifeAnimation {

    constructor (height, width, title = "Game of Life - Bloom Mod w/Trails - Small Symmetrical Seed") {
        super(height, width, title );
    }

    seedIsAlive (i, j) {
        return (
            i > Math.floor(this.height / 2) - 6 &&
            i < Math.floor(this.height / 2) + 6 &&
            j === Math.floor(this.width / 2)
        );
    }
}

export default SymmetricalBTGameOfLifeAnimation;