
const tetrisColors = [
    [255, 255, 0],
    [0, 0, 255],
    [0, 255, 255],
    [138,43,226]
];

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




        this.tetrisShape = Math.floor(Math.random() * 4);
        this.startingRed = tetrisColors[this.tetrisShape][0];
        this.startingGreen = tetrisColors[this.tetrisShape][1];
        this.startingBlue = tetrisColors[this.tetrisShape][2];
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
        if (this.age < 160) {
            color = this.startingRed;
        } else {
            color = Math.floor(256 * (Math.sin(framesElapsed * 7) + 1) / 2);
        }


        return this.goodColor(
            color
        );
    }

    blue(ctx, framesElapsed) {

        let color;
        if (this.age < 160) {
            color = this.startingBlue;
        } else {
            color = Math.floor(256 * (Math.sin(framesElapsed * 5) + 1) / 2);
        }

        return this.goodColor(
            color
        );
    }

    green (ctx, framesElapsed) {

        let color;
        if (this.age < 160) {
            color = this.startingGreen;
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

        ctx.beginPath();
        ctx.strokeStyle="#FFFFFF";
        ctx.lineWidth=1;

        switch (this.tetrisShape) {
            case 0:
                // Square
                ctx.moveTo(this.x - this.width/3, this.y);
                ctx.lineTo(this.x + this.width/3, this.y);
                ctx.lineTo(this.x + this.width/3, this.y + this.height * 0.67);
                ctx.lineTo(this.x - this.width/3, this.y + this.height * 0.67);
                ctx.lineTo(this.x - this.width/3, this.y);
                break;
            case 1:
                //L
                ctx.moveTo(this.x - this.width/4, this.y);
                ctx.lineTo(this.x, this.y);
                ctx.lineTo(this.x, this.y + this.height * 0.66);
                ctx.lineTo(this.x + this.width/4, this.y + this.height * 0.66);
                ctx.lineTo(this.x + this.width/4, this.y + this.height);
                ctx.lineTo(this.x - this.width/4, this.y + this.height);
                ctx.lineTo(this.x - this.width/4, this.y);
                break;
            case 2:
                //Bar
                ctx.moveTo(this.x - this.width/4, this.y);
                ctx.lineTo(this.x + this.width/4, this.y);
                ctx.lineTo(this.x + this.width/4, this.y + this.height * 2);
                ctx.lineTo(this.x - this.width/4, this.y + this.height * 2);
                ctx.lineTo(this.x - this.width/4, this.y);
                break;
            case 3:
                // T
                ctx.moveTo(this.x - this.width/6, this.y + this.height * 0.3);
                ctx.lineTo(this.x + this.width/6, this.y + this.height * 0.3);
                ctx.lineTo(this.x + this.width/6, this.y + this.height * 0.7);
                ctx.lineTo(this.x + this.width/2, this.y + this.height * 0.7);
                ctx.lineTo(this.x + this.width/2, this.y + this.height);
                ctx.lineTo(this.x - this.width/2, this.y + this.height);

                ctx.lineTo(this.x - this.width/2, this.y + this.height * 0.7);
                ctx.lineTo(this.x - this.width/6, this.y + this.height * 0.7);
                ctx.lineTo(this.x - this.width/6, this.y + this.height * 0.3);


        }
        // square
        /*

        */

        // L
        /*

        */

        // Bar


        //ctx.rect(this.x - this.width/2, this.y, this.width, this.height);
        ctx.fill();
        if(this.age < 160) {
            ctx.stroke();
        }


        ctx.translate(this.x +  Math.round(this.width/2), this.y +  Math.round(this.height/2));
        ctx.rotate(-(this.randomRotation * this.age) * Math.PI / 180);
        ctx.translate(-this.x -  Math.round(this.width/2), -this.y -  Math.round(this.height/2));

    }

}

export default EqSpark;