import SoundResponsiveFunctionGenerator from "../../Engine/SoundResponsiveFunctionGenerator";
import Circle from "../../Engine/Polygons/Circle";
import Circle2 from "../../Engine/Polygons/Circle2";
import Square from "../../Engine/Polygons/Square";

class SquareSpiral {
  constructor(
    height,
    width,
    title = "Polygon Sound Visualizer - Square Spiral"
  ) {
    this.title = title;
    this.framesElapsed = 0;

    this.height = height;
    this.width = width;

    this.soundGenerator = new SoundResponsiveFunctionGenerator(
      (note, frequencyData) =>
        this.soundEventCallback(note, frequencyData, this),
      0.0001
    );

    this.note = 0;
    this.frequencyData = [];

    this.soundEventCallback = this.soundEventCallback.bind(this);

    this.soundGenerator.toggleLiveInput();

    this.polygons = [];

    this.shapeIdx = 0;

    this.sortable = "idx";
    this.sortOrder = 1;

    for (let a = 0; a < 1024; a++) {
      let square = new Square(842, 842, a, a);
      square.sortOrder = this.sortOrder;
      square.sortable = this.sortable;
      this.polygons.push(square);
    }

    this.returningHome = false;
  }

  soundEventCallback(note, frequencyData) {
    this.note = note;
    this.frequencyData = frequencyData;

    //console.log(note);
    for (let a = 0; a < frequencyData.length; a++) {
      this.polygons[a].strength = Math.max(
        0,
        Math.floor(frequencyData[a] + 110) * 3
      );
      //this.polygons[a].height = Math.max(0, Math.floor(frequencyData[a] + 110) * 3);
    }
  }

  avg(a, b) {
    return Math.floor((a + b) / 2);
  }

  moveToNextFrame() {
    this.framesElapsed++;
  }
}

export default SquareSpiral;
