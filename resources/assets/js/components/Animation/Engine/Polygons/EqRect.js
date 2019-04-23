class EqRect {
    constructor(x, y, width, height, idx) {
        this.x = x;
        this.prevX = x;
        this.y = y;
        this.prevY = y;
        this.rotation = 0;
        this.width = width;
        this.height = height;
        this.heightStack = [];
        this.idx = idx;
        this.strength = 0;
        this.isDescending = false;
    }

    goodColor(color) {
        return Math.min(256, Math.max(10, color));
    }

    avg(a, b) {
        return Math.floor((a + b) / 2);
    }

    red(ctx, framesElapsed) {
        let color = Math.floor(
            (256 *
                (Math.sin((Math.sin(framesElapsed / 23) * this.idx) / 197) +
                    1)) /
                2
        );

        return this.goodColor(color);
    }

    blue(ctx, framesElapsed) {
        let color = Math.floor(
            (256 *
                (Math.sin((Math.sin(framesElapsed / 17) * this.idx) / 203) +
                    1)) /
                2
        );

        return this.goodColor(color);
    }

    green(ctx, framesElapsed) {
        let color = Math.floor(
            (256 *
                (Math.sin((Math.sin(framesElapsed / 29) * this.idx) / 397) +
                    1)) /
                2
        );

        return this.goodColor(color);
    }

    draw(ctx, framesElapsed) {
        let red = this.red(ctx, framesElapsed);

        //let green = this.goodColor(this.radius);
        let green = this.green(ctx, framesElapsed);

        let blue = this.blue(ctx, framesElapsed);

        ctx.fillStyle = `rgb(${red},${green},${blue})`;
        ctx.beginPath();
        /*
        ctx.rotate((this.idx / 128) * Math.PI / 180);
        ctx.translate(-842, -842);
        ctx.rect(this.x - this.width/2, this.y - this.width/2, this.width, this.width);
        */

        ctx.rect(this.x, this.y - this.height, this.width, this.height);
        ctx.fill();
    }
}

export default EqRect;
