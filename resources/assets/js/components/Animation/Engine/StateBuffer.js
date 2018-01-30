class StateBuffer {

    //life doesn't work with buffer size less than 2
    constructor(initialState, bufferSize = 2, unlimitedBuffer = false) {
        this.bufferSize = bufferSize;
        this.unlimitedBuffer = unlimitedBuffer;

        this.buffer = [];
        for (let i = 0; i < bufferSize; i++) {
            this.buffer[i] = initialState;
        }

        this.currentIndex = 0;
    }

    at (idx) {
        return this.buffer[idx];
    }

    current () {
        return this.at(this.currentIndex);
    }

    next () {
        return this.at(this.getNextIdx());
    }

    tick () {
        this.currentIndex = this.getNextIdx();
    }

    getNextIdx () {
        return this.unlimitedBuffer ?
            (this.currentIndex + 1) :
            (this.currentIndex + 1) % this.bufferSize;
    }

}

export default StateBuffer;