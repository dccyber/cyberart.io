

import SoundResponsiveFunctionGenerator from "../../Engine/SoundResponsiveFunctionGenerator";
import Circle from "../../Engine/Polygons/Circle";
import Circle2 from "../../Engine/Polygons/Circle2";
import Square from "../../Engine/Polygons/Square";
import PoppinSquare from "../../Engine/Polygons/PoppinSquare";
import PoppinSquare2 from "../../Engine/Polygons/PoppinSquare2";
import EqRect from "../../Engine/Polygons/EqRect";
import EqSpark from "../../Engine/Polygons/EqSpark";

class RectEqualizer {
    constructor (height, width, title = 'Polygon Sound Visualizer - Tetris Confetti Equalizer') {
        this.title = title;
        this.framesElapsed = 0;

        this.height = height;
        this.width = width;


        this.soundGenerator = new SoundResponsiveFunctionGenerator(
            (note, frequencyData) => this.soundEventCallback(note, frequencyData, this),
            0.0001
        );

        this.note = 0;
        this.frequencyData = [];

        this.soundEventCallback = this.soundEventCallback.bind(this);

        this.soundGenerator.toggleLiveInput();

        this.polygons = [];

        this.shapeIdx = 0;

        this.sortable = 'idx';
        this.sortOrder = 1;

        let rectWidth = 1;
        let defaultHeight = 10;
        for (let a=0; a < 1024; a++) {


            let x = 330 + a*rectWidth;
            let y = 1354;

            let square = new EqRect(x, y, rectWidth, defaultHeight, a);
            square.sortOrder = this.sortOrder;
            square.sortable = this.sortable;
            this.polygons.push(square);
        }

        this.returningHome = false;


    }

    soundEventCallback (note, frequencyData) {
        this.note = note;
        this.frequencyData = frequencyData;

        //console.log(note);
        for(let a=0; a < frequencyData.length; a++) {
            this.polygons[a].heightStack.push(this.polygons[a].height);
            if (this.polygons[a].heightStack.length > 7) {
                this.polygons[a].heightStack.splice(0,1);
            }

            this.polygons[a].height = Math.max(1, Math.floor(frequencyData[a] + 170) * 3);
            this.polygons[a].strength = Math.max(1, Math.floor(frequencyData[a] + 110) * 3);
            //this.polygons[a].radius = Math.max(0, Math.floor(frequencyData[a] + 110) * 3);
        }

    }

    avg (a, b) {
        return Math.floor((a+b)/2);
    }

    moveToNextFrame() {
        this.framesElapsed++;

        const distanceAbove = 0;
        for (let a = 0; a < 1024; a++) {



            if (!this.polygons[a].isDescending && this.polygons[a].heightStack.length === 7 && this.polygons[a].height > 1) {
                let descending = true;
                    descending = descending &&
                        (this.polygons[a].heightStack[0] < this.polygons[a].heightStack[1]) &&
                        (this.polygons[a].heightStack[1] < this.polygons[a].heightStack[2]) &&
                        (this.polygons[a].heightStack[2] < this.polygons[a].heightStack[3]) &&
                        (this.polygons[a].heightStack[3] < this.polygons[a].heightStack[4]) &&
                        (this.polygons[a].heightStack[4] > this.polygons[a].heightStack[5]) &&
                        (this.polygons[a].heightStack[5] > this.polygons[a].heightStack[6]);

                if (descending && this.polygons[a].height > 150 + Math.random() * 20) {
                    this.polygons[a].isDescending = true;
                    this.polygons.push(new EqSpark(this.polygons[a].x, this.polygons[a].y - this.polygons[a].height - 1 - distanceAbove, 2, 2, a, a));
                }
            }


            // Brownian motion Drift
            /*
            this.polygons[a].x = (
                this.polygons[a].x + (
                    Math.floor(Math.random() * driftSpeed * 2- driftSpeed + 0.5)
                )
            ) % this.width;

            if (this.polygons[a].x < 0) {
                this.polygons[a].x += this.width;
            }

            this.polygons[a].y = (
                this.polygons[a].y + (
                    Math.floor(Math.random() * driftSpeed * 2- driftSpeed + 0.5)
                )
            ) % this.height;

            if (this.polygons[a].y < 0) {
                this.polygons[a].y += this.height;
            }
            */
        }

        const deleteMe = [];
        const driftSpeed = 5;

        const windSpeed = Math.sin(this.framesElapsed / 1000) * 2;

        for (let b = 1024; b < this.polygons.length; b++) {

            if (this.polygons[b].age < 80) {
                this.polygons[b].width = Math.max(1, this.polygons[b].width + 0.5);
                this.polygons[b].height = Math.max(1, this.polygons[b].height + 0.5);
                this.polygons[b].age++;
                this.polygons[b].y = this.polygons[b].y - Math.min(5, (50 - this.polygons[b].height));
            } else if (this.polygons[b].age < 120) {
                this.polygons[b].age++;
                this.polygons[b].y = this.polygons[b].y - Math.min(5, (50 - this.polygons[b].height));
            } else if (this.polygons[b].age < 160) {
                this.polygons[b].width = Math.max(5, this.polygons[b].width - 0.3);
                this.polygons[b].height = Math.max(2, this.polygons[b].height - 0.3);
                this.polygons[b].age++;
                this.polygons[b].y = this.polygons[b].y - Math.min(5, (50 - this.polygons[b].height));
            } else if (this.polygons[b].age < 500) {
                this.polygons[b].age++;
                this.polygons[b].width = Math.max(5, this.polygons[b].width - 1);
                this.polygons[b].height = Math.max(2, this.polygons[b].height - 1);


                // Brownian motion Drift
                this.polygons[b].x = (
                    this.polygons[b].x + (
                        Math.floor(Math.random() * driftSpeed * 2- driftSpeed + 0.5)
                    )
                );

                if (this.polygons[b].x < 0 || this.polygons[b].x > 1684 ||
                   this.polygons[b].y < 0 || this.polygons[b].y > 1684
                   ) {
                    //this.polygons[b].x += this.width;
                    deleteMe.push(b);
                    continue;
                }

                this.polygons[b].y += 2;
                this.polygons[b].x += windSpeed;

                
            } else {
                deleteMe.push(b);
            }
        }


        for(let c=0; c < deleteMe.length; c++) {
            const parentIdx = this.polygons[deleteMe[c]].parentIdx;
            this.polygons[parentIdx].isDescending = false;
        }

        for (let d=0; d < deleteMe.length; d++) {
            this.polygons.splice(deleteMe[d] - d, 1);
        }
    }
}

export default RectEqualizer;
