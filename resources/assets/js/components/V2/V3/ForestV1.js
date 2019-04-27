import Tree from "./TreeV1";
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
        const scatterDistance = 50;
        const halfScatter = scatterDistance / 2;

        const randomX = this.clampWidth(Math.floor(Math.random() * scatterDistance * 2) - scatterDistance + parentX);
        const randomY = this.clampHeight(Math.floor(Math.random() * scatterDistance * 2) - scatterDistance + parentY);

        const collidingTree = this.polygons.find((polygon) => {
            return polygon.x === randomX && polygon.y === randomY && !polygon.dead;
        });

        if (collidingTree) {
            return;
        }

        const breedFailureChance = Math.random() * 100 > 0;
        if (breedFailureChance) {
            const veryCloseTrees = this.polygons.filter((polygon) => {
                return !polygon.dead && Math.sqrt(Math.pow(polygon.x - parentX, 2) +  Math.pow(polygon.y - parentY, 2)) < 3;
            });

            if (veryCloseTrees.length > 5) {
                return;
            }

            const closeTrees = this.polygons.filter((polygon) => {
                return !polygon.dead && Math.sqrt(Math.pow(polygon.x - parentX, 2) +  Math.pow(polygon.y - parentY, 2)) < 6;
            });

            if (closeTrees > 10) {
                return;
            }
        }

        const chance = Math.random() * 100 > 99.5;
        if (chance) { //breed
            const anotherTree = this.polygons.find((polygon) => {
                return !polygon.dead && polygon.x > parentX - 5 && polygon.x < parentX + 5 &&
                    polygon.y > parentY - 5 && polygon.y < parentY + 5;
            });

            this.polygons.push(
                new Tree(
                    randomX,
                    randomY,
                    1,
                    this.addTree,
                    MathLib.avg(maxAge, anotherTree.maxAge),
                    MathLib.avg(breedingAge, anotherTree.breedingAge),
                    MathLib.avg(breedingFrequency, anotherTree.breedingFrequency),
                    MathLib.avg(r, anotherTree.r),
                    MathLib.avg(g, anotherTree.g),
                    MathLib.avg(b, anotherTree.b),
                    childCount,
                    MathLib.avg(childCost, anotherTree.childCost)
                )
            );
        } else { //clone
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


    }

    moveToNextFrame() {
        this.framesElapsed++;
        if (this.framesElapsed % 500 === 0) {
            this.polygons = this.polygons.filter(polygon => {
                return !polygon.dead;
            });
        }
    }
}

export default SoundCircle;
