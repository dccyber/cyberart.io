class PoppinSquare2 {
  constructor(x, y, width, idx) {
    this.x = x;
    this.prevX = x;
    this.y = y;
    this.prevY = y;
    this.rotation = 0;
    this.width = width;
    this.idx = idx;
    this.strength = 0;

    this.redRate = 0.5;
  }

  goodColor(color) {
    return Math.min(256, Math.max(10, color));
  }

  avg(a, b) {
    return Math.round((a + b) / 2);
  }

  red(ctx, framesElapsed) {
    const multiplier = Math.ceil(this.idx / 256) * 64;

    return Math.floor(
      (multiplier *
        Math.sin((Math.PI * this.idx) / 1024) *
        (Math.sin(framesElapsed / 40) + 1)) /
        2
    );
  }

  blue(ctx, framesElapsed) {
    const multiplier = 2.5 - 0.5 * Math.ceil(this.idx / 256);

    return Math.floor(this.strength * multiplier);
  }

  green(ctx, framesElapsed) {
    const rateAdjustment = 100 + Math.ceil(this.idx / 256);
    const rateMultiplier = 1 / ((rateAdjustment - this.strength) * 256);

    return Math.floor(
      256 * Math.sin(Math.PI * this.idx * framesElapsed * rateMultiplier)
    );
  }

  draw(ctx, framesElapsed) {
    let red = this.goodColor(this.red(ctx, framesElapsed));
    let green = this.goodColor(this.green(ctx, framesElapsed));
    let blue = this.goodColor(this.blue(ctx, framesElapsed));

    ctx.fillStyle = `rgb(${red},${green},${blue})`;
    ctx.beginPath();
    /*
        ctx.rotate((this.idx / 128) * Math.PI / 180);
        ctx.translate(-842, -842);
        ctx.rect(this.x - this.width/2, this.y - this.width/2, this.width, this.width);
        */

    const rotationAmount = (this.idx * (framesElapsed + this.strength)) / 256;

    ctx.translate(this.x, this.y);
    ctx.rotate((rotationAmount * Math.PI) / 180);
    ctx.translate(-this.x, -this.y);

    ctx.rect(
      this.x - this.width / 2,
      this.y - this.width / 2,
      this.width,
      this.width
    );
    ctx.fill();

    ctx.translate(this.x, this.y);
    ctx.rotate((-rotationAmount * Math.PI) / 180);
    ctx.translate(-this.x, -this.y);
  }
}

export default PoppinSquare2;
