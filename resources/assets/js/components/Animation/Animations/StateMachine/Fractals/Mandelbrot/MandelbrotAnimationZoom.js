// TODO: cleanup and comment
import MandelbrotAnimation from "./MandelbrotAnimation";

/**
 * Copyright Aaron Boyarsky, 2018
 */
class MandelbrotAnimationZoom extends MandelbrotAnimation {
    constructor(
        width,
        height,
        title = "Mandelbrot Set - Zoom with 2 color phases"
    ) {
        super(width, height, title);
    }

    generateParams() {
        //default 1
        const zoom = 20; // Increase to zoom in

        //default 0
        const leftward = -2; // Increase to move the fractal leftward relative to the view pane

        //default 0
        const upward = 17; // Increase to move the fractal upward relative to the view pane

        //TODO: rename
        this.a = 4 / (this.height * zoom);
        this.b = (leftward - 2 * (this.width / this.height)) / zoom;

        this.c = 4 / (this.height * zoom);
        this.d = (upward - 2) / zoom;

        this.usePrecalc = true;
    }
}

export default MandelbrotAnimationZoom;
