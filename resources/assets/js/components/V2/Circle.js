

class Circle {
    constructor (x, y, radius) {
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
        return Math.max(30,this.goodColor(
            Math.floor((Math.sin(framesElapsed / 67) * 128) + 80)
        ));
    }

    green(ctx, framesElapsed) {
        return (this.goodColor(
            (
                Math.floor(
                    this.avg(
                        this.avg(this.x,this.prevX),
                        this.avg(this.y,this.prevY)
                    ) * 0.3
                )
            ))
        );
    }

    blue (ctx, framesElapsed) {
        return this.goodColor(
            this.avg(
                Math.floor(((Math.sin(framesElapsed / 37) * 128) * this.height)),
                Math.floor(
                    (Math.sin(
                        this.avg(this.originalX, this.originalY) / 19
                    ) * 128) * this.height
                )
            )
        );
    }

    draw (ctx, framesElapsed) {
        let red = this.red(ctx, framesElapsed);

        //let green = this.goodColor(this.height);
        let green =this.green(ctx, framesElapsed);

        let blue = this.blue(ctx, framesElapsed);

        ctx.fillStyle=`rgb(${red},${green},${blue})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.height, this.startAngle, this.endAngle, this.anticlockwise);
        ctx.fill();
    }

}

export default Circle;