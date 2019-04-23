import RectangleArea from "./RectangleArea";

export default class Window {
  constructor(left, top, width, height) {
    this.position = { left, top, width, height };
    this.color = "#BBBBBB";
  }

  draw(ctx) {
    RectangleArea.draw(ctx, this.color, this.position);
  }
}
