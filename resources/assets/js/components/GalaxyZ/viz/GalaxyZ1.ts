import GalaxyFresh from './GalaxyFresh';
import GalaxyThing from './GalaxyThing';

class GalaxyZ1 {
    public title: string;
    public framesElapsed: number = 0;
    public waitingFramesElapsed: number = 0;
    public width: number;
    public height: number;

    public cells: Array<GalaxyFresh | GalaxyThing> = [];
    private things: GalaxyThing[] = [];

    constructor(height: number, width: number, title = 'GalaxyZ Visualizer') {
        this.title = title;
        this.framesElapsed = 0;
        this.waitingFramesElapsed = 0;
        this.height = height;
        this.width = width;
        this.cells = [];
        this.things = [];

        const maxSize = 300;
        for (let x = 0; x < maxSize; x++) {
            for (let y = 0; y < maxSize; y++) {
                // Some condition for a thing
                const isThing = Math.random() * 100 > 99.9;

                if (isThing) {
                    this.things.push(
                        new GalaxyThing(Math.floor(Math.random() * maxSize), Math.floor(Math.random() * maxSize), 5)
                    );
                }

                this.cells.push(new GalaxyFresh(x, y, 5));
            }
        }

        this.cells = this.cells.concat(this.things);
    }

    public moveToNextFrame() {
        this.framesElapsed++;

        // O(n)
        this.things.forEach(thing => {
            // TODO: this is O(n^2)
            this.cells
                .filter(cell => {
                    return this.determineIfFresh(cell) && thing.atCell(cell);
                })
                .forEach(cell => {
                    // Refresh the board square to a starting state with the color of the thing
                    if (thing.currentSpot) {
                        thing.currentSpot.redraw = true;
                    }

                    if (this.determineIfFresh(cell)) {
                        thing.paintCell(cell);
                    }
                });
        });

        if (this.framesElapsed % 25 === 0) {
            this.cells = this.cells.map(polygon => {
                return !polygon.dead ? polygon : new GalaxyFresh(polygon.boardX, polygon.boardY, 5);
            });
        }
    }

    private determineIfFresh(toBeDetermined: GalaxyFresh | GalaxyThing): toBeDetermined is GalaxyFresh {
        if ((toBeDetermined as GalaxyFresh).growth) {
            return true;
        }

        return false;
    }
}

export default GalaxyZ1;
