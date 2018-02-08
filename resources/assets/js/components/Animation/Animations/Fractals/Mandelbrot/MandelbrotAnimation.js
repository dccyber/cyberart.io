import StateMachineAnimation from "../../../Engine/StateMachineAnimation";

// TODO: cleanup and comment
/**
 * Copyright Aaron Boyarsky, 2018
 */
class MandelbrotAnimation extends StateMachineAnimation {

    constructor (width, height, title = 'Mandelbrot Set') {
        super(width, height, title );
    }

    generateParams () {
        //default 1
        const zoom = 1; // Increase to zoom in

        //default 0
        const leftward = 0; // Increase to move the fractal leftward relative to the view pane

        //default 0
        const upward = 0 // Increase to move the fractal upward relative to the view pane

        //TODO: rename
        this.a = 4 / (this.height * zoom);
        this.b = (leftward - 2 * (this.width / this.height)) / zoom;

        this.c = 4 / (this.height * zoom);
        this.d = (upward - 2) / zoom;

        this.usePrecalc = false;
    }

    initialStateGenerator (i, j) {

        if (!this.a) {

            this.generateParams();

            // when width/height = 2, coefficient should be 1
            // when width/height = 1, coefficient should be 2\
            // when width/height = 4, coefficient should be

            // Precalculate some colors, so they don't need to be calculated every time a color is generated
            // Useful for large renders

            if (this.usePrecalc) {
                this.precalcColors = [];
                for (let e=0; e < 1000; e++) {
                    let f = Math.abs(Math.sin(e/17)) * 5;
                    let g = Math.abs(Math.sin(e/29)) * 5;
                    let h = Math.abs(Math.sin(e/13)) * 5;
                    this.precalcColors[e] = [];
                    for(let m=0; m<102; m++) {
                        this.precalcColors[e][m] = {
                            red: (m * f) % 256,
                            green: (m * g) % 256,
                            blue: (m * h) % 256,
                            alpha: 255
                        }
                    }
                }
            }
        }


        const real_seed = i*this.a + this.b;
        const imag_seed = j*this.c + this.d;

        return {
            real: 0,
            imag: 0,
            real_seed: real_seed,
            imag_seed: imag_seed,
            iter: 0,
            escaped: this.escaped(real_seed, imag_seed),
            dead: false
        };
    }

    stateTransition (i, j, width, height, state, nextState) {
        const cellState = state[i][j];

        if (!(cellState.escaped || cellState.dead)) {

            // The mandelbrot equation
            let newReal = (cellState.real + cellState.imag) * (cellState.real - cellState.imag);
            let newImag = 2 * cellState.real * cellState.imag;

            cellState.real = newReal + cellState.real_seed;
            cellState.imag = newImag + cellState.imag_seed;


            cellState.iter++;
            cellState.escaped = this.escaped(cellState.real, cellState.imag);

            // Stop iterating after this many iterations
            if (cellState.iter > 100) { //TODO: use constant
                //cellState.dead = true;
            }
        }
    }

    colorGenerator (cellState, framesElapsed)  {
        if (cellState.dead) {
            //return null;
        }

        if (cellState.escaped) {
            if (this.usePrecalc && this.precalcColors[framesElapsed] && this.precalcColors[framesElapsed][cellState.iter]) {
                return this.precalcColors[framesElapsed][cellState.iter];
            }
            return {
                red: (cellState.iter * Math.abs(Math.sin(framesElapsed/101)) * 89) % 256,
                green: (cellState.iter * Math.abs(Math.sin(framesElapsed/61)) * 67) % 256,
                blue: (cellState.iter * Math.abs(Math.sin(framesElapsed/107)) * 20) % 256,

                /*
                red: (cellState.iter + framesElapsed * 3) % 256,
                green: (cellState.iter + framesElapsed * 13) % 256,
                blue: (cellState.iter + framesElapsed * 29) % 256,
                */
                alpha: 255
            };
        } else {
            // TODO: this is an interesting effect. Animations can blend together if you send up no colors.
            // return null;

            return {
                red: 0,
                green: 0,
                blue: 0,
                alpha: 255
            };

        }

    }

    escaped (real, imag) {
        return real*real + imag*imag > 4;
    };

}

export default MandelbrotAnimation;