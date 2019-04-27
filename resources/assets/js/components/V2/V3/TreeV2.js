class Tree {
    constructor(x, y, radius,addTree, maxAge = null, breedingAge = null, breedingFrequency = null, r = null, g = null, b = null, childCount = null, childCost = null) {
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



        this.age = 0;
        if (maxAge) {
            this.maxAge = Math.min(300, Math.max(0, maxAge + Math.floor(Math.random() * 15) - 7));
        } else {
            this.maxAge = 220 + Math.floor(Math.random() * 100) - 50;
        }
        const mutationAmount = 100;

        if (!r) {
            this.redColor = this.goodColor(Math.floor(Math.random() * 256));
            this.greenColor = this.goodColor(Math.floor(Math.random() * 256));
            this.blueColor = this.goodColor(Math.floor(Math.random() * 256));
        }

        if (r) {
            const change = (Math.random() * 100) > 99;
            if (change) {
                this.redColor = this.goodColor(r + Math.random() * mutationAmount * 2 - mutationAmount)
            } else {
                this.redColor = r;
            }
        }

        if (g) {
            const change = (Math.random() * 100) > 99;
            if (change) {
                this.greenColor = this.goodColor(g + Math.random() * mutationAmount * 2 - mutationAmount)
            } else {
                this.greenColor = g;
            }
        }

        if (b) {
            const change = (Math.random() * 100) > 99;
            if (change) {
                this.blueColor = this.goodColor(b + Math.random() * mutationAmount * 2 - mutationAmount)
            } else {
                this.blueColor = b;
            }
        }

        if (breedingFrequency) {
            this.breedingFrequency = Math.max(20, Math.max(5, breedingFrequency + Math.floor(Math.random() * 9 - 4)));
        } else {
            this.breedingFrequency = 70 + Math.floor(Math.random() * 20) - 10;
        }

        if (childCount) {
            const change = (Math.random() * 100) > 98;
            if (change) {
                this.childCount = Math.min(childCount + Math.floor(Math.random() * 3) - 1, 3);
            } else {
                this.childCount = childCount;
            }

        } else {
            this.childCount = Math.floor(Math.random() * 3) + 1
        }

        if (childCost) {
            const change = (Math.random() * 100) > 90;
            if (change) {
                this.childCost = Math.max(100, childCost + Math.floor(Math.random() * 10) - 5);
            } else {
                this.childCost = childCost;
            }

        } else {
            this.childCost = 200 + Math.floor(Math.random() * 30) -15
        }

        if (breedingAge) {
            const change = (Math.random() * 100) > 95;
            if (change) {
                this.breedingAge = Math.min(150, Math.max(0, breedingAge + Math.floor(Math.random() * 2) - 1));
            } else {
                this.breedingAge = breedingAge;
            }

        } else {
            this.breedingAge = 75 + Math.floor(Math.random() * 20) - 10;
        }

        this.addTree = addTree;
        this.dead = false;
    }

    goodColor = (color) => {
        return Math.min(256, Math.max(10, color));
    }

    avg(a, b) {
        return Math.floor((a + b) / 2);
    }

    red = (ctx, framesElapsed) => {
        return this.redColor;
        /*
        return Math.max(
            30,
            0//this.goodColor(Math.floor(Math.sin(framesElapsed / 7) * 128 + 80))
        );
        */
    }

    green(ctx, framesElapsed) {
        return this.greenColor;
    }

    blue(ctx, framesElapsed) {
        return this.blueColor;
    }

    draw(ctx, framesElapsed) {
        if (this.dead) {
            return;
        }
        let red = this.red(ctx, framesElapsed);

        //let green = this.goodColor(this.height);
        let green = this.green(ctx, framesElapsed);

        let blue = this.blue(ctx, framesElapsed);

        ctx.fillStyle = `rgb(${red},${green},${blue})`;
        ctx.fillRect(this.x, this.y, 3, 3);/*
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.height, this.startAngle, this.endAngle, this.anticlockwise);
        ctx.fill();*/




        this.age++;

        if (this.age > this.breedingAge && this.age % this.breedingFrequency === 0) {

            for (let a=0; a < this.childCount; a++) {
                this.addTree(this.x, this.y, this.maxAge, this.breedingAge, this.breedingFrequency, this.redColor, this.greenColor, this.blueColor, this.childCount, this.childCost);
                this.age += this.childCost;
                if (this.age > this.maxAge) {
                    this.dead = true;
                    return;
                }
            }

        }

        if (this.age > this.maxAge) {
            this.dead = true;
        }
    }
}

export default Tree;
