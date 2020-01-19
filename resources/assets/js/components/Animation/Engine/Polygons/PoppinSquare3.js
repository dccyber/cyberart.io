class PoppinSquare3 {
    constructor(x, y, width, idx) {
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
        return Math.min(256, Math.max(10, color));
    }

    avg(a, b) {
        return Math.floor((a + b) / 2);
    }

    red(ctx, framesElapsed) {
        let color;
        switch (Math.ceil(this.idx / 256)) {
            case 1:
                color = Math.floor(
                    64 * Math.sin((Math.PI * this.idx) / 1024) * ((Math.sin(framesElapsed / 40) + 1) / 2)
                );
                break;
            case 2:
                color = Math.floor(
                    128 * Math.sin((Math.PI * this.idx) / 1024) * ((Math.sin(framesElapsed / 40) + 1) / 2)
                );
                break;
            case 3:
                color = Math.floor(
                    192 * Math.sin((Math.PI * this.idx) / 1024) * ((Math.sin(framesElapsed / 40) + 1) / 2)
                );
                break;
            case 4:
                color = Math.floor(
                    256 * Math.sin((Math.PI * this.idx) / 1024) * ((Math.sin(framesElapsed / 40) + 1) / 2)
                );
                break;
        }

        return this.goodColor(color);
    }

    blue(ctx, framesElapsed) {
        let color;
        switch (Math.ceil(this.idx / 256)) {
            case 1:
                color = Math.floor(this.strength * 2);
                break;
            case 2:
                color = Math.floor(this.strength * 1.5);
                break;
            case 3:
                color = Math.floor(this.strength);
                break;
            case 4:
                color = Math.floor(this.strength * 0.5);
                break;
        }

        return this.goodColor(color);
    }

    green(ctx, framesElapsed) {
        let color;
        switch (Math.ceil(this.idx / 256)) {
            case 1:
                color = Math.floor(
                    256 * Math.sin((Math.PI * this.idx * (framesElapsed / (140 - this.strength))) / 256)
                );
                break;
            case 2:
                color = Math.floor(
                    256 * Math.sin((Math.PI * this.idx * (framesElapsed / (180 - this.strength))) / 256)
                );
                break;
            case 3:
                color = Math.floor(
                    256 * Math.sin((Math.PI * this.idx * (framesElapsed / (220 - this.strength))) / 256)
                );
                break;
            case 4:
                color = Math.floor(
                    256 * Math.sin((Math.PI * this.idx * (framesElapsed / (260 - this.strength))) / 256)
                );
                break;
        }

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

        ctx.translate(this.x, this.y);
        ctx.rotate((((this.idx * (framesElapsed + this.strength)) / 256) * Math.PI) / 180);
        ctx.translate(-this.x, -this.y);

        ctx.rect(this.x - this.width / 2, this.y - this.width / 2, this.width, this.width);
        ctx.fill();

        ctx.translate(this.x, this.y);
        ctx.rotate((-((this.idx * (framesElapsed + this.strength)) / 256) * Math.PI) / 180);
        ctx.translate(-this.x, -this.y);
    }
}

export default PoppinSquare3;
