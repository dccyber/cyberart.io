class ImageMorph {
    constructor(height, width, title = 'Mine River Flow') {
        this.title = title;
        this.framesElapsed = 0;

        this.height = height;
        this.width = width;

        this.polygons = [];
        this.grid = [];

        this.shapeIdx = 0;

        this.sortable = 'idx';
        this.sortOrder = 1;

        this.returningHome = false;
    }

    avg(a, b) {
        return Math.floor((a + b) / 2);
    }

    moveToNextFrame() {
        this.framesElapsed++;

        if (this.framesElapsed % 100 === 0) {
            console.log('frame ' + this.framesElapsed);
        }
    }
}

export default ImageMorph;
