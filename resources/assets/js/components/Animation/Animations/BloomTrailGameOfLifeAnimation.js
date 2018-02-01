import BloomingGameOfLifeAnimation from "./BloomingGameOfLifeAnimation";

// TODO: cleanup and comment
class BloomTrailGameOfLifeAnimation extends BloomingGameOfLifeAnimation {
    constructor (height, width, title = "Game of Life - Bloom Mod w/Trails - Random Seed") {
        super(height, width, title );
    }


    handleLivingCellTransition (cellState, nextCellState, neighborInfo) {
        if (neighborInfo.count < 2 || neighborInfo.count > 3) {
            nextCellState.alive = 0;
            nextCellState.age = 0;
            nextCellState.fade = 128;
        } else {
            nextCellState.alive = 1;
            nextCellState.age = cellState.age + 1;
            nextCellState.fade = 0;
        }
    }

    createNewCell (nextCellState) {
        super.createNewCell(nextCellState);
        nextCellState.fade = 0;
    }

    createDeadCell (nextCellState, cellState) {
        nextCellState.blooming = 0;
        super.createDeadCell(nextCellState, cellState);
        nextCellState.fade = Math.max(0, cellState.fade - 1);
    }

    handleDeadCellTransition (cellState, nextCellState, neighborInfo) {
        const bloomTimeFactor = 1;
        const maxNeighborAgeToBloom = 500 * bloomTimeFactor;
        const totalNeighborAgeToBloom = 1950 * bloomTimeFactor;

        if (neighborInfo.count === 3) {
            this.createNewCell(nextCellState);
        } else {

            if (neighborInfo.maxAge > maxNeighborAgeToBloom || neighborInfo.ageTotal > totalNeighborAgeToBloom) {
                this.createNewCell(nextCellState);
            } else if (neighborInfo.maxAge > (maxNeighborAgeToBloom - 255) || neighborInfo.ageTotal > (totalNeighborAgeToBloom - 255)) {
                nextCellState.blooming = neighborInfo.ageTotal - (maxNeighborAgeToBloom - 255);
                nextCellState.alive = 0;
                nextCellState.age = 0;
                nextCellState.fade = 0;
            } else {
                this.createDeadCell(nextCellState, cellState);
            }

        }
    }


    getEmptyNeighborInfo () {
        return {
            count: 0,
            ageTotal: 0,
            maxAge: 0
        };
    }

    updateNeighborInfo(neighborInfo, cellState) {
        neighborInfo.count += cellState.alive;
        neighborInfo.ageTotal += cellState.age;
        neighborInfo.maxAge = neighborInfo.maxAge - cellState.age > 0 ? neighborInfo.maxAge : cellState.age
    }


    generateGreen (cellState) {
        return cellState.alive
            ? Math.max(255 - cellState.age, 0)
            : cellState.blooming
                ? (cellState.blooming * 11) % 256
                : cellState.fade / 2;
    }

    generateBlue (cellState) {
        return cellState.alive
            ? 0
            : cellState.blooming
                ? (cellState.blooming) % 256
                : cellState.fade;
    }
}

export default BloomTrailGameOfLifeAnimation;