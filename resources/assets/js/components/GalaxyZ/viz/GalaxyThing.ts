export const THING_STATES = {
    fresh: 0,
    thing: 1
};

const THING_COLORS = {
    [THING_STATES.fresh]: {
        r: 0,
        g: 255,
        b: 0
    },
    [THING_STATES.thing]: {
        r: 255,
        g: 255,
        b: 255
    }
};

class GalaxyThing {
    constructor(
        boardX,
        boardY,
        radius,
        addTree,
        maxAge = null,
        breedingAge = null,
        breedingFrequency = null,
        r = null,
        g = null,
        b = null,
        childCount = null,
        childCost = null
    ) {
        this.boardX = boardX;
        this.boardY = boardY;
        this.prevBoardX = boardX;
        this.prevBoardY = boardY;

        this.x = 10 + boardX * 5;
        this.y = 10 + boardY * 5;

        this.prevX = this.x;
        this.originalX = this.x;
        this.returningHome = false;
        this.prevY = this.y;
        this.originalY = this.y;
        this.height = radius;
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.anticlockwise = false;

        this.thingState = THING_STATES.thing;
        this.thingType = 1 + Math.floor(Math.random() * 6); // TODO: change to 7 for white
        this.thingColors = THING_COLORS[this.thingState];

        this.redColor = this.goodColor(this.thingColors.r);
        this.greenColor = this.goodColor(this.thingColors.g);
        this.blueColor = this.goodColor(this.thingColors.b);
    }

    public goodColor = color => {
        return Math.min(256, Math.max(10, color));
    };

    public avg(a, b) {
        return Math.floor((a + b) / 2);
    }

    public red = (ctx, framesElapsed) => {
        return this.redColor;
        /*
        return Math.max(
            30,
            0//this.goodColor(Math.floor(Math.sin(framesElapsed / 7) * 128 + 80))
        );
        */
    };

    public green(ctx, framesElapsed) {
        return this.greenColor;
    }

    public blue(ctx, framesElapsed) {
        return this.blueColor;
    }

    public draw(ctx, framesElapsed) {
        if (this.dead) {
            return;
        }
        const red = this.red(ctx, framesElapsed);

        // let green = this.goodColor(this.height);
        const green = this.green(ctx, framesElapsed);

        const blue = this.blue(ctx, framesElapsed);

        ctx.fillStyle = `rgb(${red},${green},${blue})`;
        this.x = 10 + this.boardX * 5;
        this.y = 10 + this.boardY * 5;
        ctx.fillRect(this.x, this.y, this.height, this.height);

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.height, this.height);
        ctx.stroke();

        this.prevBoardX = this.boardX;
        this.prevBoardY = this.boardY;

        this.boardY = this.boardY + Math.floor(Math.random() * 3) - 1;
        this.boardX = this.boardX + Math.floor(Math.random() * 3) - 1;

        this.boardX = Math.min(299, Math.max(0, this.boardX));
        this.boardY = Math.min(299, Math.max(0, this.boardY));
        /*
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.height, this.startAngle, this.endAngle, this.anticlockwise);
        ctx.fill();
*/

        /*
                this.age++;

                if (this.age > this.breedingAge && this.age % this.breedingFrequency === 0) {

                    for (let a=0; a < this.childCount; a++) {
                        this.addTree(this.x, this.y, this.maxAge, this.breedingAge, this.breedingFrequency, this.redColor, this.greenColor, this.blueColor, this.childCount, this.childCost);
                        this.age += this.childCost;
                        if (this.age > this.maxAge) {
                            this.dead = true;
                            return;
                        }
                    }

                }

                if (this.age > this.maxAge) {
                    this.dead = true;
                }

         */
    }
}

export default GalaxyThing;
