class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.prevX = x;
        this.originalX = x;
        this.returningHome = false;
        this.y = y;
        this.prevY = y;
        this.originalY = y;
        this.height = radius;
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.anticlockwise = false;

        this.red = this.red.bind(this);
    }

    goodColor(color) {
        return Math.min(256, Math.max(10, color));
    }

    avg(a, b) {
        return Math.floor((a + b) / 2);
    }

    red(ctx, framesElapsed) {
        return this.goodColor((16 - this.height) * 16);
        /*
        return Math.max(
            30,
            0//this.goodColor(Math.floor(Math.sin(framesElapsed / 7) * 128 + 80))
        );
        */
    }

    green(ctx, framesElapsed) {
        return Math.max(
            30,
            this.goodColor(
                Math.floor(
                    Math.sin(((framesElapsed + 500) / (Math.sin((this.height * this.avg(this.x, this.y)) / 100) + 19)) * 3) * 128 + 10
                )
            )
        );
    }

    blue(ctx, framesElapsed) {
        return this.goodColor(this.height * 10);
    }

    draw(ctx, framesElapsed) {
        let red = this.red(ctx, framesElapsed);

        //let green = this.goodColor(this.height);
        let green = this.green(ctx, framesElapsed);

        let blue = this.blue(ctx, framesElapsed);

        ctx.fillStyle = `rgb(${red},${green},${blue})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.height, this.startAngle, this.endAngle, this.anticlockwise);
        ctx.fill();
    }
}

export default Circle;
