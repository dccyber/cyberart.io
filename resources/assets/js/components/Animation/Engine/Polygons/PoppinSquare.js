

class PoppinSquare {
    constructor (x, y, width, idx) {
        this.x = x;
        this.prevX = x;
        this.y = y;
        this.prevY = y;
        this.rotation = 0;
        this.width = width;
        this.idx = idx;
        this.strength = 0;
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
            Math.floor(256 * Math.sin((Math.PI * this.idx / 1024)) * ((Math.sin(framesElapsed / 40) + 1)/2))
        ));
    }

    blue(ctx, framesElapsed) {
        return (this.goodColor(
            (
               Math.floor(this.strength * 1.5)
            ))
        );
    }

    green (ctx, framesElapsed) {
        return this.goodColor(
            //Math.pow(((1024 - this.idx) / 1024), 2) * 256
            Math.floor(256 * Math.sin((Math.PI * this.idx * (framesElapsed / (140 - this.strength)) / 256)))
        );
    }

    draw (ctx, framesElapsed) {
        let red = this.red(ctx, framesElapsed);

        //let green = this.goodColor(this.height);
        let green =this.green(ctx, framesElapsed);

        let blue = this.blue(ctx, framesElapsed);

        ctx.fillStyle=`rgb(${red},${green},${blue})`;
        ctx.beginPath();
        /*
        ctx.rotate((this.idx / 128) * Math.PI / 180);
        ctx.translate(-842, -842);
        ctx.rect(this.x - this.width/2, this.y - this.width/2, this.width, this.width);
        */


        ctx.translate(this.x, this.y);
        ctx.rotate((this.idx * (framesElapsed + this.strength) / 256) * Math.PI / 180);
        ctx.translate(-this.x, -this.y);

        ctx.rect(this.x - this.width/2, this.y - this.width/2, this.width, this.width);
        ctx.fill();

        ctx.translate(this.x, this.y);
        ctx.rotate(-(this.idx * (framesElapsed + this.strength) / 256) * Math.PI / 180);
        ctx.translate(-this.x, -this.y);
    }

}

export default PoppinSquare;