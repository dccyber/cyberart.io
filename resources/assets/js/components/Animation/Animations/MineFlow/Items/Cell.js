const EARTH = "earth";
const WATER = "water";
const GRASS = "grass";
const CONTENT_COLORS = {
  [EARTH]: {
    r: 139,
    g: 69,
    b: 19
  },
  [WATER]: {
    r: 30,
    g: 144,
    b: 255
  },
  [GRASS]: {
    r: 124,
    g: 252,
    b: 0
  }
};

class Cell {
  constructor(x, y, width, idx, content, depth) {
    this.x = x;
    this.prevX = x;
    this.y = y;
    this.prevY = y;
    this.width = width;
    this.idx = idx;
    this.strength = 0;
    this.contents = content;
    this.depth = depth;
    this.adjacent = [];
  }

  goodColor(color) {
    return Math.min(256, Math.max(10, color));
  }

  avg(a, b) {
    return Math.floor((a + b) / 2);
  }

  red(ctx, framesElapsed) {
    return 200;
  }

  blue(ctx, framesElapsed) {
    return 50;
  }

  green(ctx, framesElapsed) {
    let green = 100;
    return Math.max(green, 0);
  }

  draw(ctx, framesElapsed) {
    let red = this.red(ctx, framesElapsed);

    //let green = this.goodColor(this.height);
    let green = this.green(ctx, framesElapsed);

    let blue = this.blue(ctx, framesElapsed);

    ctx.fillStyle = `rgb(${red},${green},${blue})`;
    ctx.beginPath();

    ctx.rect(this.x, this.y, this.width, this.width);
    ctx.fill();
  }
}

export default Cell;
