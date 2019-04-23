import SoundResponsiveFunctionGenerator from "../../Engine/SoundResponsiveFunctionGenerator";
import Circle from "../../Engine/Polygons/Circle";
import Triangle from "../../Engine/Polygons/Triangle";

class SoundTriangle {
    constructor(height, width, title = "Polygon Sound Visualizer - Triangle") {
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
        for (let x = 0; x < 1024; x++) {
            const radians = Math.abs((2 * Math.PI * x) / 256);
            const radius = (125 * radians) / (Math.PI * 2);

            let xMod = Math.cos(radians) * radius;
            let yMod = 100 + Math.sin(radians) * radius;

            this.polygons.push(new Triangle(842 + xMod, 842 + yMod, 5));
        }

        this.returningHome = false;
        this.sortable = "radius";
        this.sortOrder = 1;
    }

    soundEventCallback(note, frequencyData) {
        this.note = note;
        this.frequencyData = frequencyData;

        //console.log(note);
        for (let a = 0; a < frequencyData.length; a++) {
            this.polygons[a].height = Math.max(1, Math.floor(frequencyData[a] + 110) * 2.5);
        }
    }

    avg(a, b) {
        return Math.floor((a + b) / 2);
    }

    moveToNextFrame() {
        this.framesElapsed++;

        if (this.framesElapsed % 2000 === 0 && this.framesElapsed > 0) {
            this.returningHome = true;
        }

        /*
        // sort so smaller circles in front
        this.polygons.sort(function (a, b) {
            if (a.height < b.height) {
                return -1;
            }

            if (a.height > b.height) {
                return 1;
            }

            return 0;
        });
        */

        const driftSpeed = 0;
        const returnHomeSpeed = 3;

        this.stillReturningHome = false;
        for (let a = 0; a < this.polygons.length; a++) {
            // Remember
            this.polygons[a].prevX = this.polygons[a].x;
            this.polygons[a].prevY = this.polygons[a].y;

            // Deflate
            this.polygons[a].height = Math.max(5, this.polygons[a].height - 2);

            if (this.returningHome) {
                let xDiff = this.polygons[a].originalX - this.polygons[a].x;
                let yDiff = this.polygons[a].originalY - this.polygons[a].y;
                let xDiffSgn = Math.sign(xDiff);
                let yDiffSgn = Math.sign(yDiff);

                this.polygons[a].x += xDiffSgn * Math.min(Math.abs(xDiff), returnHomeSpeed);
                this.polygons[a].y += yDiffSgn * Math.min(Math.abs(yDiff), returnHomeSpeed);

                // If any x or y differences exist for any polygon, you aren't home yet
                this.stillReturningHome = this.stillReturningHome || xDiffSgn !== 0 || yDiffSgn !== 0;

                //this.polygons[a].x = this.avg(this.polygons[a].x, this.polygons[a].originalX);
                //this.polygons[a].y = this.avg(this.polygons[a].y, this.polygons[a].originalY);
            } else {
                const radians = Math.abs((2 * Math.PI * (a + Math.sin(this.framesElapsed / 20) * 500)) / 256);
                const radius = (125 * radians) / (Math.PI * 2);

                let xMod = Math.cos(radians) * radius + Math.cos(radius * 1.2) * 10;
                let yMod = Math.sin(radians) * radius + Math.sin(radius * 1.2) * 10;
                this.polygons[a].x = 842 + xMod;
                this.polygons[a].y = 842 + yMod;

                // Brownian motion Drift
                this.polygons[a].x =
                    (this.polygons[a].x + Math.floor(Math.random() * driftSpeed * 2 - driftSpeed + 0.5)) % this.width;

                if (this.polygons[a].x < 0) {
                    this.polygons[a].x += this.width;
                }

                this.polygons[a].y =
                    (this.polygons[a].y + Math.floor(Math.random() * driftSpeed * 2 - driftSpeed + 0.5)) % this.height;

                if (this.polygons[a].y < 0) {
                    this.polygons[a].y += this.height;
                }
            }
        }

        // If you finish returning home, you're not returning home anymore.
        this.returningHome = this.stillReturningHome;
    }
}

export default SoundTriangle;
