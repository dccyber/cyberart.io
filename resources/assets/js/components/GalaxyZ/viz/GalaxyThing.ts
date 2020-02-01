import GalaxyFresh from "./GalaxyFresh";

export const THING_STATES = {
    fresh: 0,
    thing: 1
};

interface IColor {
    r: number;
    g: number;
    b: number;
}

const THING_COLORS = {
    [THING_STATES.fresh]: {
        b: 0,
        g: 255,
        r: 0,
    },
    [THING_STATES.thing]: {
        b: 255,
        g: 255,
        r: 255,
    }
};

class GalaxyThing {
    public dead: boolean = false;
    public thingType: number;
    public currentSpot: GalaxyFresh | null = null;
    public boardX: number;
    public boardY: number;
    public thingState: number;

    private x: number;
    private y: number;
    private height: number;
    private thingColors: IColor;
    private redColor: number;
    private greenColor: number;
    private blueColor: number;



    constructor(boardX: number, boardY: number, radius: number) {
        this.boardX = boardX;
        this.boardY = boardY;

        this.x = 10 + boardX * 5;
        this.y = 10 + boardY * 5;

        this.height = radius;

        this.thingState = THING_STATES.thing;
        this.thingType = 1 + Math.floor(Math.random() * 6); // TODO: change to 7 for white
        this.thingColors = THING_COLORS[this.thingState];

        this.redColor = this.goodColor(this.thingColors.r);
        this.greenColor = this.goodColor(this.thingColors.g);
        this.blueColor = this.goodColor(this.thingColors.b);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.dead) {
            return;
        }

        const r = this.redColor;
        const g = this.greenColor;
        const b = this.blueColor;

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        this.x = 10 + this.boardX * 5;
        this.y = 10 + this.boardY * 5;
        ctx.fillRect(this.x, this.y, this.height, this.height);

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.height, this.height);
        ctx.stroke();

        this.boardY = this.boardY + Math.floor(Math.random() * 3) - 1;
        this.boardX = this.boardX + Math.floor(Math.random() * 3) - 1;

        this.boardX = Math.min(299, Math.max(0, this.boardX));
        this.boardY = Math.min(299, Math.max(0, this.boardY));
    }

    private goodColor = (color: number): number => {
        return Math.min(256, Math.max(10, color));
    };
}

export default GalaxyThing;
