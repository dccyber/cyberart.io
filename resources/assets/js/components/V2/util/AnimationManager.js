const FPS = 60;
const LIMIT_FRAMERATE = true;

export default class AnimationManager {
    constructor(animationList, changeAnimation) {
        this.animationList = animationList;
        this.chosenAnimationIdx = Math.floor(Math.random() * animationList.length);
        this.drawLoopInterval = Math.floor(1000 / FPS);
        this.changeAnimation = changeAnimation;
    }

    getCurrentAnimation = () => {
        return this.animationList[this.chosenAnimationIdx];
    };

    drawLoop = () => {
        // Redraw the canvas using the buffer
        this.redrawFunction();

        if (LIMIT_FRAMERATE) {
            setTimeout(this.animate, this.drawLoopInterval);
        } else {
            this.animate();
        }
    };

    animate = redrawFunction => {
        if (redrawFunction) {
            this.redrawFunction = redrawFunction;
        }

        this.animationId = requestAnimationFrame(this.drawLoop);
    };

    stopAnimation = () => {
        cancelAnimationFrame(this.animationId);
    };

    setRandomAnimation = () => {
        if (this.animationList.length > 1) {
            this.stopAnimation();

            const oldAnimationIdx = this.chosenAnimationIdx;

            // Ensure a different animation
            while (oldAnimationIdx === this.chosenAnimationIdx) {
                this.chosenAnimationIdx = Math.floor(Math.random() * this.animationList.length);
            }

            const ChosenAnimation = this.animationList[this.chosenAnimationIdx];
            this.changeAnimation(ChosenAnimation);

            this.animate();
        }
    };
}
