
import MathLib from "./MathLib.js";
import GalaxyFresh from "./GalaxyFresh";
import GalaxyThing, {THING_STATES} from "./GalaxyThing";

class GalaxyZ1 {
    constructor(height, width, title = "GalaxyZ Visualizer") {
        this.title = title;
        this.framesElapsed = 0;
        this.waitingFramesElapsed = 0;
        this.waiting = true;

        this.height = height;
        this.width = width;

        this.polygons = [];
        // const centerX = Math.floor(width/2);
        // const centerY = Math.floor(height/2);

        this.things = [];
        for (let x=0; x<100; x++) {
            for (let y=0; y<100; y++) {

                // Some condition for a thing
                const isThing = Math.random() * 100 > 99.8;

                if (isThing) {
                    this.things.push(
                        new GalaxyThing(
                            Math.floor(Math.random() * 100), Math.floor(Math.random() * 100),
                            5,
                            this.addTree
                        )
                    );
                }


                    this.polygons.push(
                        new GalaxyFresh(
                            x,y,
                            5,
                            this.addTree
                        )
                    );


            }
        }

        this.polygons = this.polygons.concat(this.things);


        /*
        const treeCount = 500;

        for (let a = 0; a < treeCount; a++) {
            const randomX = Math.floor(Math.random() * width + 1);
            const randomY = Math.floor(Math.random() * height + 1);

            this.polygons.push(
                new GalaxyThing(
                    randomX,
                    randomY,
                    1,
                    this.addTree
                )
            );
        }

         */
    }

    /*
    killTreeAt = (index) => {
        this.polygons.splice(index, 1);
    };
     */


    clampWidth = (w) => {
        return Math.min(Math.max(0, w), this.width);
    };

    clampHeight = (h) => {
        return Math.min(Math.max(0, h), this.height);
    };

    addTree = (parentX, parentY, maxAge, breedingAge, breedingFrequency, r, g, b, childCount, childCost) => {


        //clone
        /*
            this.polygons.push(

            );

         */


    };

    moveToNextFrame() {
        this.framesElapsed++;


        this.things.map(thing => {
            this.polygons.filter(polygon => {
                return polygon.boardX === thing.boardX && polygon.boardY === thing.boardY && polygon.thingState === THING_STATES.fresh;
            }).forEach(polygon => {
                polygon.growth = 1;
                polygon.thingType = thing.thingType;
            });
        })


        if (this.framesElapsed % 25 === 0) {
            this.polygons = this.polygons.filter(polygon => {
                return !polygon.dead;
            });
        }
    }
}

export default GalaxyZ1;
