import BloomTrailGameOfLifeAnimation from "./BloomTrailGameOfLifeAnimation";

/**
 * Copyright Aaron Boyarsky, 2018
 */
class SymmetricalBTGameOfLifeAnimationB extends BloomTrailGameOfLifeAnimation {

    constructor (width, height, title = "Game of Life - Bloom Mod w/Trails - Diag. Sym. Seed") {
        super(width, height, title);
    }

    seedIsAlive (i, j) {
        return (
            i > j - 6 && i < j + 6 &&
            (
                (i+j) % 8 === 0 ||
                (i+j) % 7 === 0 ||
                (i+j) % 6 === 0
            )
        );
    }
}

export default SymmetricalBTGameOfLifeAnimationB;