import StateMachineAnimation from "../Engine/StateMachineAnimation";

// TODO: cleanup and comment
class MandelbrotAnimation extends StateMachineAnimation {

    constructor (height, width) {

        const zoom = 1.5; // Increase to zoom in
        const leftward = -1; // Increase to move the fractal leftward relative to the view pane
        const upward = 0; // Increase to move the fractal upward relative to the view pane

        const a = 4 / (width * zoom);
        const b = (leftward - 2) / zoom;

        const c = 4 / (height * zoom);
        const d = (upward - 2) / zoom;

        const escaped = (real, imag) => {
            return real*real + imag*imag > 4;
        };

        const initialStateGenerator = (i, j) => {
            const real_seed = i*a + b;
            const imag_seed = j*c + d;

            return {
                real: 0,
                imag: 0,
                real_seed: i*a + b,
                imag_seed: j*c + d,
                iter: 0,
                escaped: escaped(real_seed, imag_seed),
                dead: false
            };
        };

        const stateTransition = (state) => {
            if (!(state.escaped || state.dead)) {

                // The mandelbrot equation
                let newReal = (state.real + state.imag) * (state.real - state.imag);
                let newImag = 2 * state.real * state.imag;

                state.real = newReal + state.real_seed;
                state.imag = newImag + state.imag_seed;


                state.iter++;
                state.escaped = escaped(state.real, state.imag);

                // Stop iterating after this many iterations
                if (state.iter > 100) {
                    state.dead = true;
                }
            }
        };

        // Precalculate some colors, so they don't need to be calculated every time a color is generated
        // Useful for large renders
        const usePrecalc = false;
        if (usePrecalc) {
            let precalcColors = [];
            for (let e=0; e < 100000; e++) {
                let f = Math.abs(Math.sin(e/17)) * 5;
                let g = Math.abs(Math.sin(e/29)) * 5;
                let h = Math.abs(Math.sin(e/13)) * 5;
                precalcColors[e] = [];
                for(let m=0; m<102; m++) {
                    precalcColors[e][m] = {
                        red: (m * f) % 256,
                        green: (m * g) % 256,
                        blue: (m * h) % 256,
                        alpha: 255
                    }
                }
            }
        }


        const colorGenerator = (cellState, framesElapsed) => {
            if (cellState.dead) {
                return null;
            }

            if (cellState.escaped) {
                if (usePrecalc && precalcColors[framesElapsed] && precalcColors[framesElapsed][cellState.iter]) {
                    return precalcColors[framesElapsed][cellState.iter];
                }
                return {
                    red: (cellState.iter * Math.abs(Math.sin(framesElapsed/31)) * 20) % 256,
                    green: (cellState.iter * Math.abs(Math.sin(framesElapsed/29)) * 20) % 256,
                    blue: (cellState.iter * Math.abs(Math.sin(framesElapsed/47)) * 20) % 256,

                    /*
                    red: (cellState.iter + framesElapsed * 3) % 256,
                    green: (cellState.iter + framesElapsed * 13) % 256,
                    blue: (cellState.iter + framesElapsed * 29) % 256,
                    */
                    alpha: 255
                };
            } else {
                return null;
                /*
                return {
                    red: 0,
                    green: 0,
                    blue: 0,
                    alpha: 255
                };
                */
            }

        };

        super(height, width, initialStateGenerator, stateTransition, colorGenerator );
    }

}

export default MandelbrotAnimation;