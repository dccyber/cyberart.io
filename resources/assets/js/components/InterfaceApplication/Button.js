import RectangleArea from './RectangleArea';

export default class Button {
    constructor(left, top, width, height) {
        this.position = { left, top, width, height };
        this.color = '#FF0000';
        this.clickBehavior = [];
    }

    draw(ctx) {
        RectangleArea.draw(ctx, this.color, this.position);
    }

    isClicked(x, y) {
        const { left, top, width, height } = this.position;

        return x >= left && x <= left + width && y >= top && y <= top + height;
    }

    handleMouseDown(x, y) {
        if (this.isClicked(x, y)) {
            console.log('you started to click the red button!');
            this.color = '#00FF00';
            return true;
        }
        return false;
    }

    handleMouseClick(x, y) {
        if (this.isClicked(x, y)) {
            console.log('you released the red button!');
            this.color = '#FF0000';
            this.clickBehavior.forEach(fn => {
                fn();
            });
            return true;
        }
        return false;
    }

    addClickBehavior(fn) {
        this.clickBehavior.push(fn);
    }
}
