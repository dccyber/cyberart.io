

class Triangle {
    constructor (x, y, height) {
        this.x = x;
        this.y = y;
        this.height = height;

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
        return this.goodColor(
            framesElapsed * 4 % 256
        );
    }

    blue (ctx, framesElapsed) {
        return this.goodColor(
            this.height * 4
        );
    }

    draw (ctx, framesElapsed) {
        let red = this.red(ctx, framesElapsed);

        //let green = this.goodColor(this.height);
        let green =this.green(ctx, framesElapsed);

        let blue = this.blue(ctx, framesElapsed);

        ctx.fillStyle=`rgb(${red},${green},${blue})`;

        const sideLength = Math.sqrt((this.height * this.height) + (this.height/2)*(this.height/2));

        ctx.translate(this.x, this.y);
        ctx.rotate(((this.height + framesElapsed)) * Math.PI / 180);
        ctx.translate(-this.x, -this.y);

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + sideLength / 2,this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x - sideLength / 2, this.y);
        ctx.closePath();
        ctx.fill();

        ctx.translate(this.x, this.y);
        ctx.rotate(-(((this.height + framesElapsed)) * Math.PI / 180));
        ctx.translate(-this.x, -this.y);
    }

}

export default Triangle;