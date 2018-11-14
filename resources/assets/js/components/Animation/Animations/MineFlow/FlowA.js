

import Cell from "./Items/Cell";

const BLOCK_WIDTH = 5;
const BLOCK_COUNT = 199;
const HALF_BLOCK = (BLOCK_COUNT-1)/2;

class FlowA {

    constructor (height, width, title = 'Mine River Flow') {
        this.title = title;
        this.framesElapsed = 0;

        this.height = height;
        this.width = width;

        this.polygons = [];
        this.grid = [];
        this.waterBlocks = [];
        this.grassBlocks = [];
        this.earthBlocks = [];

        this.shapeIdx = 0;

        this.sortable = 'idx';
        this.sortOrder = 1;



        for (let a=0; a < BLOCK_COUNT; a++) {
            this.grid[a] = [];
            for (let b=0; b < BLOCK_COUNT; b++) {

                let x = a * BLOCK_WIDTH;
                let y = b * BLOCK_WIDTH;

                let contents = (b===BLOCK_COUNT-1 && a===HALF_BLOCK) ? 'water' : 'earth';
                let depth = (b===BLOCK_COUNT-1 && a===HALF_BLOCK) ? 300 : 0;
                let square = new Cell(x, y, BLOCK_WIDTH - 1, a * BLOCK_COUNT + b, contents, depth);
                this.polygons.push(square);
                this.grid[a][b] = square;

                if (contents === 'water') {
                    this.waterBlocks.push(square);
                } else if (contents === 'earth') {
                    this.earthBlocks.push(square);
                }
            }
        }

        for (let a=0; a < BLOCK_COUNT; a++) {
            for (let b=0; b < BLOCK_COUNT; b++) {
                if (a > 0) {
                    this.grid[a][b].adjacent.push(this.grid[a-1][b]);
                }
                if (a < BLOCK_COUNT - 2) {
                    this.grid[a][b].adjacent.push(this.grid[a+1][b]);
                }
                if (b > 0) {
                    this.grid[a][b].adjacent.push(this.grid[a][b-1]);
                }
                if (b < BLOCK_COUNT - 2) {
                    this.grid[a][b].adjacent.push(this.grid[a][b+1]);
                }
            }
        }

        this.waterBlocks[0].adjacent.forEach(adjacent => {
            adjacent.contents = 'grass';
        });

        this.returningHome = false;


    }


    avg (a, b) {
        return Math.floor((a+b)/2);
    }

    getScore(){
        //0,100,0 -- lily pad

        let score = 0;
        for (let a=0; a < BLOCK_COUNT; a++) {
            for (let b=0; b < BLOCK_COUNT; b++) {
                switch(this.grid[a][b].contents) {
                    case 'water':
                        score += -5;
                        break;
                    case 'grass':
                        score += 1;
                        break;
                    default:
                        score -= 0;
                }
            }
        }
        return score;
    }

    moveToNextFrame() {
        this.framesElapsed++;

        if (this.framesElapsed % 1 === 0) {

            //TAKE SCORE

            let score;

            this.waterBlocks.forEach(waterBlock => {
                waterBlock.adjacent.sort(function(a, b){return 0.5 - Math.random()});
                waterBlock.adjacent.forEach(adjacentBlock => {

                    if (0.95 > Math.random()) {
                        score = this.getScore();
                        //TRY TO FLOW
                        if (adjacentBlock.contents !== 'water' && waterBlock.depth > 1) {
                            let previousContents = adjacentBlock.contents;
                            adjacentBlock.contents = 'water';
                            adjacentBlock.depth = waterBlock.depth - 1;
                            this.waterBlocks.push(adjacentBlock);

                            let changed = [];
                            for (let a = Math.max(adjacentBlock.x/BLOCK_WIDTH - 4, 0); a < Math.min(adjacentBlock.x/BLOCK_WIDTH + 5, BLOCK_COUNT); a++) {
                                for (let b = Math.max(adjacentBlock.y/BLOCK_WIDTH - 4, 0); b < Math.min(adjacentBlock.y/BLOCK_WIDTH + 5, BLOCK_COUNT); b++) {
                                    if (this.grid[a][b].contents === 'earth') {
                                        this.grid[a][b].contents = 'grass';
                                        changed.push([a,b]);
                                    }
                                }
                            }

                            let newScore = this.getScore();

                            if (newScore < score) {
                                console.log('reverting flow, score was less');
                                changed.forEach(change => {
                                    this.grid[change[0]][change[1]].contents = 'earth';
                                });
                                this.waterBlocks.pop();
                                adjacentBlock.contents = previousContents;
                                adjacentBlock.depth = 0;
                            }

                        }
                    }



                    //TAKE SCORE AGAIN

                    //COMPARE SCORES

                    //IF SCORE WORSE, ROLL BACK
                })
            });

            /*

            var self = this;
            let isWatered = function(block) {
                for (let a = Math.max(block.x/BLOCK_WIDTH - 4, 0); a < Math.min(block.x/BLOCK_WIDTH + 5, BLOCK_COUNT); a++) {
                    for (let b = Math.max(block.y/BLOCK_WIDTH - 4, 0); b < Math.min(block.y/BLOCK_WIDTH + 5, BLOCK_COUNT); b++) {
                        //console.log(Math.abs(a - block.x/BLOCK_WIDTH));
                        //console.log(Math.abs(b - block.x/BLOCK_WIDTH));
                        //if (Math.abs(a - block.x/BLOCK_WIDTH) + Math.abs(b - block.y/BLOCK_WIDTH) <= 4) {
                            if (self.grid[a][b].contents === 'water') {
                                return true;
                            }
                        //}
                    }
                }
                return false;
            };

            let isOnlySourceOfNeighbor = function(waterBlock) {

                let allNeighborsHaveOtherSource = true;
                waterBlock.adjacent.filter(a => a.contents === 'water').forEach(adj => {
                    let depth = adj.depth;
                    let hasOtherSource = adj.adjacent.filter(a => {
                        return a.contents === 'water' && a.depth > depth;
                    }).length > 1;
                    allNeighborsHaveOtherSource = allNeighborsHaveOtherSource && hasOtherSource;
                });
                return !allNeighborsHaveOtherSource;
            };

            this.waterBlocks.forEach(waterBlock => {
                if (waterBlock.depth < 90) {

                    //console.log(isOnlySourceOfNeighbor(waterBlock));
                    if (!isOnlySourceOfNeighbor(waterBlock)) {

                        score = this.getScore();

                        this.waterBlocks = this.waterBlocks.filter(item => item !== waterBlock);
                        waterBlock.contents = 'grass';
                        for (let a = Math.max(waterBlock.x/BLOCK_WIDTH - 4, 0); a < Math.min(waterBlock.x/BLOCK_WIDTH + 5, BLOCK_COUNT); a++) {
                            for (let b = Math.max(waterBlock.y/BLOCK_WIDTH - 4, 0); b < Math.min(waterBlock.y/BLOCK_WIDTH + 5, BLOCK_COUNT); b++) {
                                if (this.grid[a][b].contents === 'grass' && !isWatered(this.grid[a][b])) {
                                    this.grid[a][b].contents = 'earth';
                                }
                            }
                        }


                        let newScore = this.getScore();

                        if (newScore < score) {
                            waterBlock.contents = 'water';
                            this.waterBlocks.push(waterBlock);
                            for (let a = Math.max(waterBlock.x/BLOCK_WIDTH - 4, 0); a < Math.min(waterBlock.x/BLOCK_WIDTH + 5, BLOCK_COUNT); a++) {
                                for (let b = Math.max(waterBlock.y/BLOCK_WIDTH - 4, 0); b < Math.min(waterBlock.y/BLOCK_WIDTH + 5, BLOCK_COUNT); b++) {

                                    if (this.grid[a][b].contents === 'earth') {
                                        this.grid[a][b].contents = 'grass';
                                    }
                                }
                            }
                        }

                    } else {
                        //console.log('no remove');
                    }

                }
            });
*/

            /*
            for (let a=0; a < BLOCK_COUNT; a++) { //x
                for (let b = 0; b < BLOCK_COUNT; b++) { //y
                    if (a-1 > 0) {
                        console.log(this.grid[a-1][b].contents);
                        if (this.grid[a-1][b].contents == 'water') {
                            this.grid[a][b].contents = 'water';
                        }
                    }

                }
            }
            */
        }

    }
}

export default FlowA;