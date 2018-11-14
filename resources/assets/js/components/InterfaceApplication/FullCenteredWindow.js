
import Button from "./Button";
import Window from "./Window";

export default class FullCenteredWindow extends Window {

    constructor (containerPosition) {

        const {top, left, height, width} = containerPosition;

        super(
            left + width * 0.1,
            top + height * 0.1,
            width * 0.8,
            height * 0.8
        );

        this.containerPosition = containerPosition;
        this.centeredPosition = {
            left: left + width * 0.1,
            top: top + height * 0.1,
            width: width * 0.8,
            height: height * 0.8
        };
        this.mode = 'centered';

        this.buildButtons();
    }

    buildButtons () {

        const marginWidth = 5;

        let buttonWidth = 40;
        let buttonHeight = 40;

        let buttonLeft = this.position.left + this.position.width - buttonWidth - marginWidth;
        let buttonTop = this.position.top + marginWidth;

        const button1 = new Button(
            buttonLeft,
            buttonTop,
            buttonWidth,
            buttonHeight
        );

        buttonLeft = buttonLeft - buttonWidth - marginWidth;

        const button2 = new Button(
            buttonLeft,
            buttonTop,
            buttonWidth,
            buttonHeight
        );

        button2.addClickBehavior(() => {

            let {top, left, height, width} =
                this.mode === 'centered' ?
                    this.centeredPosition :
                    this.containerPosition;

            this.mode =
                this.mode === 'centered' ?
                    'full' :
                    'centered';

            //TODO: need to actually move the window
            this.position.left = left;
            this.position.top = top;
            this.position.height = height;
            this.position.width = width;

            this.buildButtons();
        });

        buttonLeft = buttonLeft - buttonWidth - marginWidth;

        const button3 = new Button(
            buttonLeft,
            buttonTop,
            buttonWidth,
            buttonHeight
        );

        this.buttons = [
            button1,
            button2,
            button3
        ];
    }
    
    draw (ctx) {
        super.draw(ctx);

        this.buttons.forEach(button => {
           button.draw(ctx);
        });
    }

    isClicked (x, y) {
        const {left, top, width, height} = this.position;

        return (
            x >= left && x <= left + width &&
            y >= top && y <= top + height
        );
    }

    handleMouseDown (x, y) {
        if (this.isClicked(x, y)) {

            // actions that always handle on a window click go here

            // actions delegated to children called here
            let buttonClicked = false;
            this.buttons.forEach(button => {
                buttonClicked = button.handleMouseDown(x, y) || buttonClicked;
            });
            if (!buttonClicked) {
                // actions exclusive to the window click (no buttons) go here
                console.log("you started to click the window!");
            }
            return true;
        }

        return false;
    }

    handleMouseClick (x, y) {
        if (this.isClicked(x, y)) {

            // actions that always handle on a window click go here

            // actions delegated to children called here
            let buttonClicked = false;
            this.buttons.forEach(button => {
                buttonClicked = button.handleMouseClick(x, y) || buttonClicked;
            });
            if (!buttonClicked) {
                // actions exclusive to the window click (no buttons) go here
                console.log("you finished clicking the window the window!");
            }
            return true;
        }

        return false;
    }
}