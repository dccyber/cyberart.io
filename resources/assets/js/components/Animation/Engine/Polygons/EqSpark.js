

class EqSpark {
    constructor (x, y, width, height, idx, parentIdx) {
        this.x = x;
        this.prevX = x;
        this.y = y;
        this.prevY = y;
        this.rotation = 0;
        this.width = width;
        this.height = height;
        this.idx = idx;
        this.parentIdx = parentIdx;
        this.strength = 0;
        this.age = 0;
        this.randomRotation = ((Math.random() * 2) - 1) * 3;
    }

    goodColor(color) {
        return Math.min(
            256,
            Math.max(
                10,
                color
            )
        );
    }

    avg (a, b) {
        return Math.floor((a+b)/2);
    }

    red(ctx, framesElapsed) {

        let color;
        if (this.age < 40) {
            color = Math.floor(256 * (Math.sin(this.idx / 16) + 1) / 2);
        } else {
            color = Math.floor(256 * (Math.sin(framesElapsed * 7) + 1) / 2);
        }


        return this.goodColor(
            color
        );
    }

    blue(ctx, framesElapsed) {

        let color;
        if (this.age < 40) {
            color = Math.floor(256 * (Math.sin(this.idx / 128) + 1) / 2);
        } else {
            color = Math.floor(256 * (Math.sin(framesElapsed * 5) + 1) / 2);
        }

        return this.goodColor(
            color
        );
    }

    green (ctx, framesElapsed) {

        let color;
        if (this.age < 40) {
            color = Math.floor(256 * (Math.sin(this.idx / 32) + 1) / 2);
        } else {
            color = Math.floor(256 * (Math.sin(framesElapsed * 3) + 1) / 2);
        }

        return this.goodColor(
            color
        );
    }

    draw (ctx, framesElapsed) {
        let red = this.red(ctx, framesElapsed);

        //let green = this.goodColor(this.radius);
        let green =this.green(ctx, framesElapsed);

        let blue = this.blue(ctx, framesElapsed);

        ctx.fillStyle=`rgb(${red},${green},${blue})`;
        ctx.beginPath();


        ctx.translate(this.x + Math.round(this.width/2), this.y +  Math.round(this.height/2));
        ctx.rotate((this.randomRotation * this.age ) * Math.PI / 180);
        ctx.translate(-this.x -  Math.round(this.width/2), -this.y -  Math.round(this.height/2));

        ctx.rect(this.x - this.width/2, this.y, this.width, this.height);
        ctx.fill();

        ctx.translate(this.x +  Math.round(this.width/2), this.y +  Math.round(this.height/2));
        ctx.rotate(-(this.randomRotation * this.age) * Math.PI / 180);
        ctx.translate(-this.x -  Math.round(this.width/2), -this.y -  Math.round(this.height/2));

    }

}

export default EqSpark;