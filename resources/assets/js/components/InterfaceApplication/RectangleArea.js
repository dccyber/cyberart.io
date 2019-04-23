export default class RectangleArea {
    static draw(ctx, color, position) {
        ctx.fillStyle = color;

        ctx.fillRect(
            position.left,
            position.top,
            position.width,
            position.height
        );
    }
}
