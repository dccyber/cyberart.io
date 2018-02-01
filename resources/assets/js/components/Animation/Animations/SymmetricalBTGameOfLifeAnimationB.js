import BloomTrailGameOfLifeAnimation from "./BloomTrailGameOfLifeAnimation";


class SymmetricalBTGameOfLifeAnimationB extends BloomTrailGameOfLifeAnimation {

    constructor (height, width, title = "Game of Life - Bloom Mod w/Trails - Diagonal Symmetrical Seed") {
        super(height, width, title);
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