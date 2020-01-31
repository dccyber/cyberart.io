import FullCenteredWindow from './FullCenteredWindow';

export default class MainMenu {
    constructor(width, height) {
        this.framesElapsed = 0;

        this.position = {
            top: 0,
            left: 0,
            height,
            width
        };

        this.activeWindow = new FullCenteredWindow(this.position);
    }

    moveToNextFrame(ctx) {
        this.framesElapsed++;

        this.activeWindow.draw(ctx);
    }

    isClicked(x, y) {
        const { left, top, width, height } = this.position;

        return x >= left && x <= left + width && y >= top && y <= top + height;
    }

    handleMouseDown(x, y) {
        if (this.isClicked(x, y)) {
            // Delegate to the active window
            const windowClicked = this.activeWindow.handleMouseDown(x, y);
            if (!windowClicked) {
                console.log('Background click was started');
            }
        }
    }

    handleMouseClick(x, y) {
        if (this.isClicked(x, y)) {
            // Delegate to the active window
            const windowClicked = this.activeWindow.handleMouseClick(x, y);
            if (!windowClicked) {
                console.log('Background click was finished');
            }
        }
    }
}
