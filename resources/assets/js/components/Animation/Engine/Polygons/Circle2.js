

class Circle2 {
    constructor (idx) {

        this.radius = 1;
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.anticlockwise = false;

        this.red = this.red.bind(this);

        this.idx = idx;
        this.bigCircleRadius = 600;

        this.setCenterForIdx = this.setCenterForIdx.bind(this);
        this.setCenterForIdx(idx);


        this.returningHome = false;

        this.radians = 0;
        this.originalRadians = 0;
        this.shapeIdx = 0;
    }

    setCenterForIdx (framesElapsed = 0, withLocation=true) {

        const rotationSpeed = 2;



        //let radius = Math.floor(this.bigCircleRadius * Math.sin(radians * 4) );

        let radius;
        switch (this.shapeIdx) {
            case 0:
                // atom
                radius = Math.floor(this.bigCircleRadius * Math.sin(this.radians * 4) );
                break;
            case 1:
                //heart
                radius = Math.floor(this.bigCircleRadius * (Math.sin(this.radians) + 1)/2);
                break;

            case 2:
                //sunflower
                radius = Math.floor(this.bigCircleRadius * (Math.sin(this.idx) + 1)/2);
                break;

            default:
                radius = Math.floor(this.bigCircleRadius * (1024 - this.idx) / 1024);
        }



        //spiral

        /*
        this.prevX = this.x;
        this.originalX = this.x;
        this.prevY = this.y;
        this.originalY = this.y;
        */
        const radians = Math.abs(2*Math.PI* ((this.idx - framesElapsed * rotationSpeed) % 1024)/1024);
        this.radians = radians;

        if(withLocation) {

            //inside: circles move appropriately, but color skips
            this.x = 842 + radius * Math.cos(radians);
            this.y = 842 + radius * Math.sin(radians);



        }

        //this.originalX = 842 + radius * Math.cos(this.originalRadians);
        //this.originalY = 842 + radius * Math.sin(this.originalRadians);





        //outside: circles are discont, but color moves approp


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
        return this.goodColor (
            Math.floor((this.idx + framesElapsed) % 256)
        );
    }

    green(ctx, framesElapsed) {
        return this.goodColor(
            Math.floor(this.idx / 4)
        );
    }

    blue (ctx, framesElapsed) {
        return this.goodColor(
            Math.floor(256 * this.radians / (2 * Math.PI))
        );
    }

    draw (ctx, framesElapsed) {
        let red = this.red(ctx, framesElapsed);

        //let green = this.goodColor(this.radius);
        let green =this.green(ctx, framesElapsed);

        let blue = this.blue(ctx, framesElapsed);

        ctx.fillStyle=`rgb(${red},${green},${blue})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
        ctx.fill();
    }

}

export default Circle2;