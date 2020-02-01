import MathLib from './MathLib.js';
import GalaxyFresh from './GalaxyFresh';
import GalaxyThing, { THING_STATES } from './GalaxyThing';

class GalaxyZ1 {
    constructor(height, width, title = 'GalaxyZ Visualizer') {
        this.title = title;
        this.framesElapsed = 0;
        this.waitingFramesElapsed = 0;
        this.waiting = true;
        this.height = height;
        this.width = width;
        this.polygons = [];

        this.things = [];
        const maxSize = 300;
        for (let x = 0; x < maxSize; x++) {
            for (let y = 0; y < maxSize; y++) {
                // Some condition for a thing
                const isThing = Math.random() * 100 > 99.9;

                if (isThing) {
                    this.things.push(
                        new GalaxyThing(
                            Math.floor(Math.random() * maxSize),
                            Math.floor(Math.random() * maxSize),
                            5
                        )
                    );
                }

                this.polygons.push(new GalaxyFresh(x, y, 5));
            }
        }

        this.polygons = this.polygons.concat(this.things);
    }

    /*
    killTreeAt = (index) => {
        this.polygons.splice(index, 1);
    };
     */

    clampWidth = w => {
        return Math.min(Math.max(0, w), this.width);
    };

    clampHeight = h => {
        return Math.min(Math.max(0, h), this.height);
    };

    moveToNextFrame() {
        this.framesElapsed++;

        // O(n)
        this.things.forEach(thing => {
            // TODO: this is O(n^2)
            this.polygons
                .filter(polygon => {
                    //console.log(polygon.boardX);
                    return (
                        polygon.boardX === thing.boardX &&
                        polygon.boardY === thing.boardY &&
                        polygon.thingState === THING_STATES.fresh
                    );
                })
                .forEach(polygon => {
                    // Refresh the board square to a starting state with the color of the thing
                    if (thing.currentSpot) {
                        thing.currentSpot.redraw = true;
                    }

                    polygon.growth = 1;
                    polygon.thingType = thing.thingType;
                    thing.currentSpot = polygon;
                });
        });

        if (this.framesElapsed % 25 === 0) {
            this.polygons = this.polygons.map(polygon => {
                return !polygon.dead ? polygon : new GalaxyFresh(polygon.boardX, polygon.boardY, 5);
            });
        }
    }
}

export default GalaxyZ1;
