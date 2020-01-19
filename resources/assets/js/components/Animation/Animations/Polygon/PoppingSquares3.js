import SoundResponsiveFunctionGenerator from "../../Engine/SoundResponsiveFunctionGenerator";
import Circle from "../../Engine/Polygons/Circle";
import Circle2 from "../../Engine/Polygons/Circle2";
import Square from "../../Engine/Polygons/Square";
import PoppinSquare from "../../Engine/Polygons/PoppinSquare";
import PoppinSquare2 from "../../Engine/Polygons/PoppinSquare2";
import PoppinSquare3 from "../../Engine/Polygons/PoppinSquare3";

class PoppingSquares3 {
    constructor(height, width, title = "Polygon Sound Visualizer - Popping Squares 3") {
        this.title = title;
        this.framesElapsed = 0;

        this.height = height;
        this.width = width;

        this.soundGenerator = new SoundResponsiveFunctionGenerator(
            (note, frequencyData) => this.soundEventCallback(note, frequencyData, this),
            0.0001
        );

        this.note = 0;
        this.frequencyData = [];

        this.soundEventCallback = this.soundEventCallback.bind(this);

        this.soundGenerator.toggleLiveInput();

        this.polygons = [];

        this.shapeIdx = 0;

        this.sortable = "idx";
        this.sortOrder = 1;

        for (let a = 0; a < 1024; a++) {
            let x = Math.random() * 1684;
            let y = Math.random() * 1684;

            let square = new PoppinSquare3(x, y, 1, a);
            square.sortOrder = this.sortOrder;
            square.sortable = this.sortable;
            this.polygons.push(square);
        }

        this.returningHome = false;
    }

    soundEventCallback(note, frequencyData) {
        this.note = note;
        this.frequencyData = frequencyData;

        //console.log(note);
        for (let a = 0; a < frequencyData.length; a++) {
            this.polygons[a].width = Math.max(1, Math.floor(frequencyData[a] + 110) * 2);
            this.polygons[a].strength = Math.max(1, Math.floor(frequencyData[a] + 110) * 3);
            //this.polygons[a].radius = Math.max(0, Math.floor(frequencyData[a] + 110) * 3);
        }
    }

    avg(a, b) {
        return Math.floor((a + b) / 2);
    }

    moveToNextFrame() {
        this.framesElapsed++;

        let driftSpeed;

        let maxRepelDistance = 200;
        for (let a = 0; a < this.polygons.length; a++) {
            driftSpeed = Math.floor(this.polygons[a].strength / 8);

            this.polygons[a].aggregateDistanceX = 0;
            this.polygons[a].aggregateDistanceY = 0;
            for (let b = 0; b < this.polygons.length; b++) {
                if (a === b) {
                    continue;
                }

                let distanceX = this.polygons[a].x - this.polygons[b].x;

                let distanceY = this.polygons[a].y - this.polygons[b].y;

                let repulsionX = Math.sign(distanceX) * Math.max(0, maxRepelDistance - Math.abs(distanceX));
                let repulsionY = Math.sign(distanceY) * Math.max(0, maxRepelDistance - Math.abs(distanceY));

                repulsionX = 120 * (repulsionX / maxRepelDistance) * (repulsionX / maxRepelDistance);

                this.polygons[a].aggregateDistanceX -= repulsionX;
                this.polygons[a].aggregateDistanceY -= repulsionY;
                /*
                if (Math.abs(distanceX) < maxRepelDistance) {
                    this.polygons[a].aggregateDistanceX -= (maxRepelDistance - distanceX) / 5;
                } else {
                    //aggregateDistanceX += (distanceX);
                }
                */

                //this.polygons[a].aggregateDistanceX -=  M(500 - Math.abs(distanceX)) / 5;
                //this.polygons[a].aggregateDistanceY -= (500 - Math.abs(distanceY)) / 5;

                if (Math.abs(distanceY) < maxRepelDistance) {
                    this.polygons[a].aggregateDistanceY -= (maxRepelDistance - distanceY) / maxRepelDistance;
                } else {
                    //aggregateDistanceY += (distanceY);
                }
            }

            /*
            // Brownian motion Drift
            this.polygons[a].x = (
                this.polygons[a].x + (
                    Math.floor(Math.random() * driftSpeed * 2- driftSpeed + 0.5)
                )
            ) % this.width;

            if (this.polygons[a].x < 0) {
                this.polygons[a].x += this.width;
            }

            this.polygons[a].y = (
                this.polygons[a].y + (
                    Math.floor(Math.random() * driftSpeed * 2- driftSpeed + 0.5)
                )
            ) % this.height;

            if (this.polygons[a].y < 0) {
                this.polygons[a].y += this.height;
            }
            */
        }

        for (let a = 0; a < this.polygons.length; a++) {
            this.polygons[a].x = this.polygons[a].x - this.polygons[a].aggregateDistanceX / 15000;
            this.polygons[a].y = this.polygons[a].y - this.polygons[a].aggregateDistanceY / 15000;

            if (this.polygons[a].x < 0) {
                this.polygons[a].x = 0;
            }

            if (this.polygons[a].x >= this.width) {
                this.polygons[a].x = this.width;
            }

            if (this.polygons[a].y < 0) {
                this.polygons[a].y = 0;
            }

            if (this.polygons[a].y >= this.height) {
                this.polygons[a].y = this.height;
            }
        }
    }
}

export default PoppingSquares3;
