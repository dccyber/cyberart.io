import Tree from "./TreeV2";
import MathLib from "../util/MathLib.js";

class SoundCircle {
    constructor(height, width, title = "Forest Visualizer") {
        this.title = title;
        this.framesElapsed = 0;
        this.waitingFramesElapsed = 0;
        this.waiting = true;

        this.height = height;
        this.width = width;

        this.polygons = [];
        const centerX = Math.floor(width/2);
        const centerY = Math.floor(height/2);

        const treeCount = 500;

        for (let a = 0; a < treeCount; a++) {
            const randomX = Math.floor(Math.random() * width + 1);
            const randomY = Math.floor(Math.random() * height + 1);

            this.polygons.push(
                new Tree(
                    randomX,
                    randomY,
                    1,
                    this.addTree
                )
            );
        }


    }

    killTreeAt = (index) => {
        this.polygons.splice(index, 1);
    };


    clampWidth = (w) => {
        return Math.min(Math.max(0, w), this.width);
    };

    clampHeight = (h) => {
        return Math.min(Math.max(0, h), this.height);
    };

    addTree = (parentX, parentY, maxAge, breedingAge, breedingFrequency, r, g, b, childCount, childCost) => {

        if (this.polygons.length > 100000) {
            return;
        }

        // distant scatter chance
        const distantScatterChance = Math.random() * 100 > 99.8;
        let scatterDistance = 16;
        if (distantScatterChance) {
            scatterDistance = 500;
        }

        const randomX = this.clampWidth(Math.floor(Math.random() * scatterDistance * 2) - scatterDistance + parentX);
        const randomY = this.clampHeight(Math.floor(Math.random() * scatterDistance * 2) - scatterDistance + parentY);

        const collidingTree = this.polygons.find((polygon) => {
            return polygon.x === randomX && polygon.y === randomY && !polygon.dead;
        });

        if (collidingTree) {
            return;
        }
            const veryLargeTrees = this.polygons.filter((polygon) => {
                return !(polygon.x === parentX && polygon.y === parentY) && !polygon.dead && Math.sqrt(Math.pow(polygon.x - parentX, 2) +  Math.pow(polygon.y - parentY, 2)) < 243;
            });

            if (veryLargeTrees.length > 300) { //100 g00d
                return;
            }

            const largeTrees = veryLargeTrees.filter((polygon) => {
                return !(polygon.x === parentX && polygon.y === parentY) && !polygon.dead && Math.sqrt(Math.pow(polygon.x - parentX, 2) +  Math.pow(polygon.y - parentY, 2)) < 81;
            });

            if (largeTrees.length > 40) { //220
                return;
            }

            const moderateTrees = largeTrees.filter((polygon) => {
                return !(polygon.x === parentX && polygon.y === parentY) && !polygon.dead && Math.sqrt(Math.pow(polygon.x - parentX, 2) +  Math.pow(polygon.y - parentY, 2)) < 27;
            });

            if (moderateTrees.length > 25) { //100 g00d
                return;
            }

            const closeTrees = moderateTrees.filter((polygon) => {
                return !(polygon.x === parentX && polygon.y === parentY) && !polygon.dead && Math.sqrt(Math.pow(polygon.x - parentX, 2) +  Math.pow(polygon.y - parentY, 2)) < 9;
            });

            if (closeTrees.length > 12) { //300 max
                return;
            }

            const veryCloseTrees = closeTrees.filter((polygon) => {
                return !(polygon.x === parentX && polygon.y === parentY) && !polygon.dead && Math.sqrt(Math.pow(polygon.x - parentX, 2) +  Math.pow(polygon.y - parentY, 2)) < 3;
            });

            if (veryCloseTrees.length > 9) { //27 max
                return;
            }

            // Quasicrystalline
            /*
             const largeTrees = this.polygons.filter((polygon) => {
                return !(polygon.x === parentX && polygon.y === parentY) && !polygon.dead && Math.sqrt(Math.pow(polygon.x - parentX, 2) +  Math.pow(polygon.y - parentY, 2)) < 81;
            });

            if (largeTrees.length > 25) { //100 g00d
                return;
            }

            const moderateTrees = largeTrees.filter((polygon) => {
                return !(polygon.x === parentX && polygon.y === parentY) && !polygon.dead && Math.sqrt(Math.pow(polygon.x - parentX, 2) +  Math.pow(polygon.y - parentY, 2)) < 27;
            });

            if (moderateTrees.length > 25) { //100 g00d
                return;
            }

            const closeTrees = moderateTrees.filter((polygon) => {
                return !(polygon.x === parentX && polygon.y === parentY) && !polygon.dead && Math.sqrt(Math.pow(polygon.x - parentX, 2) +  Math.pow(polygon.y - parentY, 2)) < 9;
            });

            if (closeTrees.length > 12) { //300 max
                return;
            }

            const veryCloseTrees = closeTrees.filter((polygon) => {
                return !(polygon.x === parentX && polygon.y === parentY) && !polygon.dead && Math.sqrt(Math.pow(polygon.x - parentX, 2) +  Math.pow(polygon.y - parentY, 2)) < 3;
            });

            if (veryCloseTrees.length > 9) { //27 max
                return;
            }
             */



        //90 good
        const chance = Math.random() * 100 > 0;
        if (chance) { //breed
            const anotherTree = veryCloseTrees.find((polygon) => {
                return !polygon.dead && !(polygon.x === parentX && polygon.y === parentY) && polygon.x > parentX - 4 && polygon.x < parentX + 4 &&
                    polygon.y > parentY - 4 && polygon.y < parentY + 4;
            });

            if (anotherTree) {

                //console.log(MathLib.avg(r, anotherTree.redColor), r, anotherTree.redColor);
                this.polygons.push(
                    new Tree(
                        randomX,
                        randomY,
                        1,
                        this.addTree,
                        MathLib.avg(maxAge, anotherTree.maxAge),
                        MathLib.avg(breedingAge, anotherTree.breedingAge),
                        MathLib.avg(breedingFrequency, anotherTree.breedingFrequency),
                        MathLib.avg(r, anotherTree.redColor),
                        MathLib.avg(g, anotherTree.greenColor),
                        MathLib.avg(b, anotherTree.blueColor),
                        childCount,
                        MathLib.avg(childCost, anotherTree.childCost)
                    )
                );

                return;
            }


        }

        //clone
            this.polygons.push(
                new Tree(
                    randomX,
                    randomY,
                    1,
                    this.addTree,
                    maxAge,
                    breedingAge,
                    breedingFrequency, r, g, b, childCount, childCost
                )
            );


    }

    moveToNextFrame() {
        this.framesElapsed++;
        if (this.framesElapsed % 25 === 0) {
            this.polygons = this.polygons.filter(polygon => {
                return !polygon.dead;
            });
        }
    }
}

export default SoundCircle;
