import FullCenteredWindow from "./FullCenteredWindow";
import MainMenu from "./MainMenu";

class InterfaceAnimation {
    constructor(width, height, title = "Interface Simulation") {
        this.title = title;
        this.framesElapsed = 0;

        this.height = height;
        this.width = width;

        this.applicationState = new MainMenu(width, height);

        this.backgroundImage = new Image();
        this.backgroundImage.src = "/img/coolpic.jpg";
    }

    moveToNextFrame(ctx) {
        this.framesElapsed++;

        ctx.drawImage(this.backgroundImage, 0, 0, this.width, this.height);

        this.applicationState.moveToNextFrame(ctx);
    }

    handleMouseDown(x, y) {
        this.applicationState.handleMouseDown(x, y);
    }

    handleMouseClick(x, y) {
        // delegate the mouse click to the current application
        this.applicationState.handleMouseClick(x, y);
    }
}

export default InterfaceAnimation;
