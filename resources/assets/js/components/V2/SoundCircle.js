import Circle from "./Circle";
import MathLib from "./util/MathLib.js";

class SoundCircle {
    constructor(height, width, title = "Sin Waves with Brownian Motion based on Size") {
        this.title = title;
        this.framesElapsed = 0;
        this.waitingFramesElapsed = 0;
        this.waiting = true;

        this.height = height;
        this.width = width;

        this.polygons = [];
        for (let x = 0; x < width; x += 4) {
            this.polygons.push(
                new Circle(
                    x,
                    Math.round(height / 2) + Math.round(Math.sin(x / 100) * 200),
                    Math.round((Math.sin(x / 50) + 1) * 7) + 2
                )
            );
        }

        for (let x = 0; x < height; x += 4) {
            this.polygons.push(
                new Circle(
                    x + Math.round(width / 3) + Math.round(Math.sin(x / 75) * 200),
                    x,
                    Math.round((Math.sin(x / 50) + 1) * 7) + 2
                )
            );
        }

        for (let x = 0; x < height; x += 4) {
            this.polygons.push(
                new Circle(
                    x + Math.round(Math.sin(x / 75) * 200),
                    x,
                    Math.round((Math.sin(x / 50) + 1) * 7) + 2
                )
            );
        }

        for (let x = 0; x < height; x += 4) {
            this.polygons.push(
                new Circle(
                    x + Math.round(2 * width / 3) + Math.round(Math.sin(x / 75) * 200),
                    x,
                    Math.round((Math.sin(x / 50) + 1) * 7) + 2
                )
            );
        }

        this.returningHome = false;
        this.sortable = "radius";
        this.sortOrder = 1;
    }

    moveToNextFrame() {
        this.framesElapsed++;

        if (this.framesElapsed % 5000 === 0 && this.framesElapsed > 0) {
            this.returningHome = true;
            this.returningHomeFramesElapsed = 0;
        }

        if (this.waiting) {
            if (this.waitingFramesElapsed > 99) {
                this.waiting = false;
            } else {
                this.waitingFramesElapsed++;
                return;
            }

        }

        // TODO: ramp movement speed up after each return home

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



        this.stillReturningHome = false;
        for (let a = 0; a < this.polygons.length; a++) {
            // Remember
            this.polygons[a].prevX = this.polygons[a].x;
            this.polygons[a].prevY = this.polygons[a].y;

            // small circles drift faster (get more momentum from collisions)
            const driftSpeed = Math.ceil((20 - this.polygons[a].height) / 2);
            const returnHomeSpeed = 2;//driftSpeed / 5;

            // Deflate
            //this.polygons[a].height = Math.max(1, this.polygons[a].height - 1);

            if (this.returningHome) {
                let xDiff = this.polygons[a].originalX - this.polygons[a].x;
                let yDiff = this.polygons[a].originalY - this.polygons[a].y;

                // Allow circles to find their way home across the edge of the screen
                if (xDiff < -this.width / 2) {
                    xDiff += this.width;
                } else if (xDiff > this.width / 2) {
                    xDiff -= this.width;
                }

                if (yDiff < -this.height / 2) {
                    yDiff += this.height;
                } else if (yDiff > this.height / 2) {
                    yDiff -= this.height;
                }

                // ensure x and y distance take approximately the same time
                // case xDiff = 500, yDiff = 100
                // y travel finishes 5 times faster. ReturnHomeSpeed should be divided by 5 for y, and ceilinged

                // Math.max(xDiff, yDiff) = 500
                // Math.min(xDiff, yDiff) = 100

                // multiplierX: xDiff / max = 1
                // multiplierY: yDiff / max = 1/5

                let xDiffSgn = Math.sign(xDiff);
                let yDiffSgn = Math.sign(yDiff);

                // Ensure that the circle travels in a straight line, not manhattan-style
                let maxDiff = Math.max(Math.abs(xDiff), Math.abs(yDiff));
                let xReturnMultiplier = maxDiff ? Math.abs(xDiff / maxDiff) : 1;
                let yReturnMultiplier = maxDiff ? Math.abs(yDiff / maxDiff) : 1;

                this.polygons[a].x =
                    (this.polygons[a].x +
                        xDiffSgn * Math.min(Math.abs(xDiff), Math.ceil(returnHomeSpeed * xReturnMultiplier))) %
                    this.width;
                this.polygons[a].y =
                    (this.polygons[a].y +
                        yDiffSgn * Math.min(Math.abs(yDiff), Math.ceil(returnHomeSpeed * yReturnMultiplier))) %
                    this.height;

                if (this.returningHomeFramesElapsed < 200) {
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


                // If any x or y differences exist for any polygon, you aren't home yet
                this.stillReturningHome = this.stillReturningHome || xDiffSgn !== 0 || yDiffSgn !== 0;

                //this.polygons[a].x = MathLib.avg(this.polygons[a].x, this.polygons[a].originalX);
                //this.polygons[a].y = MathLib.avg(this.polygons[a].y, this.polygons[a].originalY);
            } else {
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

        if (this.returningHome) {
            this.returningHomeFramesElapsed++;

            if (!this.stillReturningHome) {
                this.waitingFramesElapsed = 0;
                this.waiting = true;
            }
        }

        // If you finish returning home, you're not returning home anymore.
        this.returningHome = this.stillReturningHome;
    }
}

export default SoundCircle;
