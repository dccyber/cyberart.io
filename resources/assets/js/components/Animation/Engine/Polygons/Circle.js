

class Circle {
    constructor (x, y, radius) {
        this.x = x;
        this.prevX = x;
        this.originalX = x;
        this.returningHome = false;
        this.y = y;
        this.prevY = y;
        this.originalY = y;
        this.radius = radius;
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.anticlockwise = false;
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

    draw (ctx, framesElapsed) {
        let red =  Math.max(30,this.goodColor(
            Math.floor((Math.sin(framesElapsed / 67) * 128) + 80)
        ));

        //let green = this.goodColor(this.radius);
        let green =
            this.goodColor(
            (
                Math.floor(
                    this.avg(
                        this.avg(this.x,this.prevX),
                        this.avg(this.y,this.prevY)
                    ) * 0.3
                )
            )
        );

        let blue = this.goodColor(
            this.avg(
                Math.floor(((Math.sin(framesElapsed / 37) * 128) * this.radius)),
                Math.floor(
                    (Math.sin(
                        this.avg(this.originalX, this.originalY) / 19
                    ) * 128) * this.radius
                )
            )
        );

        ctx.fillStyle=`rgb(${red},${green},${blue})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
        ctx.fill();
    }

}

export default Circle;