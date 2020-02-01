const FPS = 60;
const LIMIT_FRAMERATE = false;

type RedrawFunction = () => void;

export default class AnimationManager {
    private animationList: any[];
    private chosenAnimationIdx: number;
    private drawLoopInterval: number;
    private changeAnimation: any;
    private animationId: any;

    constructor(animationList: any[], changeAnimation: any) {
        this.animationList = animationList;
        this.chosenAnimationIdx = Math.floor(Math.random() * animationList.length);
        this.drawLoopInterval = Math.floor(1000 / FPS);
        this.changeAnimation = changeAnimation;
    }

    public redrawFunction: RedrawFunction = () => undefined;

    public setRandomAnimation = () => {
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

    public refreshAnimation = () => {
        this.changeAnimation(this.getCurrentAnimation());
    };

    public animate = (redrawFunction?: RedrawFunction) => {
        if (redrawFunction) {
            this.redrawFunction = redrawFunction;
        }

        this.animationId = requestAnimationFrame(this.drawLoop);
    };

    private getCurrentAnimation = () => {
        return this.animationList[this.chosenAnimationIdx];
    };

    private drawLoop = () => {
        // Redraw the canvas using the buffer
        this.redrawFunction();

        if (LIMIT_FRAMERATE) {
            setTimeout(this.animate, this.drawLoopInterval);
        } else {
            this.animate();
        }
    };

    private stopAnimation = () => {
        cancelAnimationFrame(this.animationId);
    };
}
