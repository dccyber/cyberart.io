const THING_STATES = {
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
        b: 0
    }
};

class GalaxyFresh {

    constructor(boardX, boardY, radius, addTree, maxAge = null, breedingAge = null, breedingFrequency = null, r = null, g = null, b = null, childCount = null, childCost = null) {
        this.boardX = boardX;
        this.boardY = boardY;

        this.x = 10 + boardX * ( 5 );
        this.y = 10 + boardY * ( 5 );

        this.prevX = this.x;
        this.originalX = this.x;
        this.returningHome = false;
        this.prevY = this.y;
        this.originalY = this.y;
        this.height = radius;
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.anticlockwise = false;

        this.thingState = THING_STATES.fresh;
        this.thingType = 0;
        this.thingColors = THING_COLORS[this.thingState];

        this.growth = 1;
        this.prevGrowth = 1;

        this.redColor = this.goodColor(this.thingColors.r);
        this.greenColor = this.goodColor(20 * this.growth);
        this.blueColor = this.goodColor(this.thingColors.b);

    }

    goodColor = (color) => {
        return Math.min(256, Math.max(10, color));
    }

    avg(a, b) {
        return Math.floor((a + b) / 2);
    }

    red = (ctx, framesElapsed) => {
        return this.thingType === 1 ? this.goodColor(10 * this.growth) : 0;
        /*
        return Math.max(
            30,
            0//this.goodColor(Math.floor(Math.sin(framesElapsed / 7) * 128 + 80))
        );
        */
    }

    green(ctx, framesElapsed) {
        return this.thingType === 0 ? this.goodColor(10 * this.growth) : 0;
    }

    blue(ctx, framesElapsed) {
        return this.thingType === 2 ? this.goodColor(10 * this.growth) : 0;
    }

    draw(ctx, framesElapsed) {
        if (this.dead) {
            return;
        }

        if (this.prevGowth !== this.growth) {
            let red = this.red(ctx, framesElapsed);

            //let green = this.goodColor(this.height);
            let green = this.green(ctx, framesElapsed);

            let blue = this.blue(ctx, framesElapsed);

            ctx.fillStyle = `rgb(${red},${green},${blue})`;
            this.x = 10 + this.boardX * (5);
            this.y = 10 + this.boardY * (5);
            ctx.fillRect(this.x, this.y, this.height, this.height);

            ctx.beginPath();
            ctx.rect(this.x, this.y, this.height, this.height);
            ctx.stroke();

        }

        if (framesElapsed % 50 === 0) {
            this.prevGrowth = this.growth;
            this.growth = Math.min(this.growth + 1, 25);
        }
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

export default GalaxyFresh;
