class InterfaceAnimation {
    constructor(width, height, title = "Interface Simulation") {
        this.title = title;
        this.framesElapsed = 0;

        this.height = height;
        this.width = width;

        this.polygons = [];
        this.grid = [];

        this.shapeIdx = 0;

        this.sortable = "idx";
        this.sortOrder = 1;

        this.returningHome = false;

        this.windowList = [
            {
                left: width * 0.1,
                top: height * 0.1,
                width: width * 0.8,
                height: height * 0.8
            }
        ];
    }

    avg(a, b) {
        return Math.floor((a + b) / 2);
    }

    drawWindows(ctx) {
        this.windowList.forEach(aWindow => {
            ctx.fillStyle = "#BBBBBB";
            ctx.fillRect(
                aWindow.left,
                1 * aWindow.top,
                aWindow.width,
                aWindow.height
            );

            //now a button
            ctx.fillStyle = "#FF0000";
            const buttonWidth = 100;
            const buttonHeight = 40;

            const buttonLeft = aWindow.left + 20;
            const buttonTop = aWindow.top + 20;

            ctx.fillRect(buttonLeft, buttonTop, buttonWidth, buttonHeight);
        });
    }

    moveToNextFrame(ctx) {
        this.framesElapsed++;

        if (this.framesElapsed % 100 === 0) {
            console.log("frame " + this.framesElapsed);
        }

        this.drawWindows(ctx);
    }
}

export default InterfaceAnimation;
