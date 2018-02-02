import React from 'react';
import StateMachineAnimation from "../../Engine/StateMachineAnimation";
import SoundResponsiveFunctionGenerator from "../../Engine/SoundResponsiveFunctionGenerator";

class BasicSoundResponsiveAnimation extends StateMachineAnimation {

    constructor (width, height, title = 'Game of Life') {
        super(width, height, title);
        this.width = width; this.height =height;
        this.soundGenerator = new SoundResponsiveFunctionGenerator((note, frequencyData) => this.soundEventCallback(note, frequencyData, this));

        this.note = 0;
        this.frequencyData = [];

        this.soundEventCallback = this.soundEventCallback.bind(this);
    }

    initialStateGenerator (i, j) {
        this.left = 50;
        this.top = 150;
        this.rectwidth = 50;
        this.rectheight = 50;

        return {
            //isNote: false,
            timeSinceSound: null,
            isRectangle: false,
            rectangleStrength: 0,
            barTop: 0
        };
    };

    soundEventCallback (note, frequencyData, self) {
        //console.log(this.noteStrings[note%12]);
        //console.log(note);
        //console.log(self);
        self.note = note;
        self.frequencyData = frequencyData || [];
    };


    stateTransition (i, j, width, height, state, nextState) {

        let cellState = state[i][j];
/*
        let isPlayingAt = (this.note - 69)*2;

        let maxBarTop = height;
        let playingCondition = i === isPlayingAt || i === isPlayingAt + 1;

        if (playingCondition) {
            cellState.barTop = Math.min(cellState.barTop + Math.ceil((height - cellState.barTop) / 10), maxBarTop);
            cellState.isRectangle = j > height - cellState.barTop && j < height;

        } else {
            cellState.barTop = Math.max(0, cellState.barTop - Math.ceil(cellState.barTop / 30));
            cellState.isRectangle = j > height - cellState.barTop && j < height;

        }

*/
        //width=3 //bufferLength=10
        //b/w = 3.33
        //i=0, a=0,1,2
        //i=1, a=3,4,5
        //i=2, a=6,7,8,

        //i * math.floor(b/w), (i+1)*math.floor(b/w)

        let total = 0;
        let count = 0;

        //Balanced across whole set
        /*
        for( let a = Math.floor(i * 1024/width); a < Math.floor((i+1)*1024/width); a++ ) {
            total += this.frequencyData[a];
            count++;
        }
        */
        for( let a = Math.floor(i * 1024/width); a < Math.floor((i+1)*1024/width); a++ ) {
            total += this.frequencyData[a];
            count++;
        }

        let avg = total/count;
        //console.log(avg);

        //(this.frequencyData[Math.floor(i*1024/width)] + 140) * 2
        cellState.isRectangle = j > height - (avg + 140) * 3//i < width * this.frequencyData.length / 1024;
        //cellState.isNote = i === Math.floor((this.note - 60) * 1.9) && cellState.isRectangle;
        if (cellState.isRectangle) {
            cellState.timeSinceSound = 0;

            //let w = height - (avg + 140) * 3;

            //(height - j) / (height - w) => 1
            //height - j / (height - w) => 0

            let w = (height - j) / ( (avg + 140) * 3);

            cellState.rectangleStrength = w * w;
        } else {
            if (cellState.timeSinceSound !== null) {
                cellState.timeSinceSound = Math.min(256, cellState.timeSinceSound + 20);
            }

        }

    }

    stateTransitionCleanup () {
        //console.log(this.frequencyData.length);
        this.note = -1;
        //console.log(this.frequencyData);
    }


    generateRed (cellState) {
        return cellState.isRectangle ?
            255*cellState.rectangleStrength :
            cellState.timeSinceSound === null ?
                0 :
                Math.max(0, (255 - cellState.timeSinceSound*2));
    }

    generateGreen (cellState) {

        return cellState.isRectangle ?
            0 :
            cellState.timeSinceSound === null ?
                0 :
                Math.max(0, 255 - cellState.timeSinceSound*1.5);

    }

    generateBlue (cellState) {
        return cellState.isRectangle ?
            0 :
            cellState.timeSinceSound === null ?
                0 :
                Math.min(255, (4 * cellState.timeSinceSound - (cellState.timeSinceSound*cellState.timeSinceSound/64)));
    }

    colorGenerator (cellState, framesElapsed) {
        return {
            red: this.generateRed(cellState),
            green: this.generateGreen(cellState),
            blue:this.generateBlue(cellState),

            alpha: 255
        };
    };

    render () {
        return <button onClick={this.soundGenerator.toggleLiveInput}>use live input</button>
    }
}

export default BasicSoundResponsiveAnimation;