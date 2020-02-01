import {THING_STATES} from "./GalaxyThing";

class GalaxyFresh {
    public boardX: number;
    public boardY: number;

    public thingType: number;
    public thingState: number;

    public growth: number;
    public dead: boolean;
    public redraw: boolean;

    private x: number;
    private y: number;

    private height: number;
    private prevGrowth: number;
    private redColor: number;
    private greenColor: number;
    private blueColor: number;
    private fillStyle: string;


    private myFramesElapsed: number;


    constructor(boardX: number, boardY: number, radius: number) {
        this.boardX = boardX;
        this.boardY = boardY;

        this.x = 10 + boardX * 5;
        this.y = 10 + boardY * 5;

        this.height = radius;

        this.thingType = 0;
        this.thingState = THING_STATES.fresh;

        this.growth = 1;
        this.prevGrowth = 1;

        this.redColor = 0;
        this.greenColor = 0;
        this.blueColor = 0;
        this.fillStyle = `rgb(${this.redColor},${this.greenColor},${this.blueColor})`;

        this.redraw = true;
        this.myFramesElapsed = 0;
        this.dead = false;
    }

    public goodColor = (color: number): number => {
        return Math.min(256, Math.max(10, color));
    };

    public avg(a: number, b: number): number {
        return Math.floor((a + b) / 2);
    }

    /**
     *
     * r g b
     * 0 0 1 - 1
     * 0 1 0
     * 0 1 1
     * 1 0 0
     * 1 0 1
     * 1 1 0
     * 1 1 1 - 7
     * @param {number} framesElapsed
     * @returns {number}
     */

    public red = () => {
        return [4, 5, 6, 7].indexOf(this.thingType) !== -1 ? this.goodColor(10 * this.growth) : 0;
        /*
        return Math.max(
            30,
            0//this.goodColor(Math.floor(Math.sin(framesElapsed / 7) * 128 + 80))
        );
        */
    };

    public green() {
        return [2, 3, 6, 7].indexOf(this.thingType) !== -1 ? this.goodColor(10 * this.growth) : 0;
    }

    public blue() {
        return [1, 3, 5, 7].indexOf(this.thingType) !== -1 ? this.goodColor(10 * this.growth) : 0;
    }

    public draw(ctx: any) {
        if (this.prevGrowth !== this.growth && this.thingType !== 0) {
            this.redColor = this.red();
            this.greenColor = this.green();
            this.blueColor = this.blue();

            this.x = 10 + this.boardX * 5;
            this.y = 10 + this.boardY * 5;

            this.prevGrowth = this.growth;
            this.fillStyle = `rgb(${this.redColor},${this.greenColor},${this.blueColor})`;

            this.redraw = true;
        }

        this.myFramesElapsed++;

        if (this.redraw && !this.dead) {
            ctx.fillStyle = this.fillStyle;
            ctx.fillRect(this.x, this.y, this.height, this.height);

            ctx.beginPath();
            ctx.rect(this.x, this.y, this.height, this.height);
            ctx.stroke();

            this.redraw = false;
            this.myFramesElapsed = 1;
        }

        if (this.myFramesElapsed % 200 === 0) {
            this.prevGrowth = this.growth;
            this.growth = Math.min(this.growth + 1, 25);
        }

        if (this.myFramesElapsed > 500 && this.thingType !== 0) {
            ctx.fillStyle = `rgb(0,0,0)`;
            ctx.fillRect(this.x, this.y, this.height, this.height);

            ctx.beginPath();
            ctx.rect(this.x, this.y, this.height, this.height);
            ctx.stroke();
            this.dead = true;
        }
    }
}

export default GalaxyFresh;
