const { Bounds } = require("../bounds");

class GridWidget {
    constructor(xdNode) {
        this.xdNode = xdNode;
        this.bounds = new Bounds(xdNode);
    }

    toDart() {
        let withStyledWidget = document.querySelector('input[name="simpleType"]');
        withStyledWidget = withStyledWidget != null ? withStyledWidget.checked : null;
        if (withStyledWidget) {
            return `Container(
            // [${this.xdNode.name}] Repeat grid aren't supported
        ).w(${this.xdNode.localBounds.width}).h(${this.xdNode.localBounds.height}).bgColor(Colors.red)`;
        }
        return `
        Container(
            // [${this.xdNode.name}] Repeat grid aren't supported.
            width: ${parseInt(this.xdNode.localBounds.width, 10)},
            height: ${parseInt(this.xdNode.localBounds.height, 10)},
            color: Colors.red,
        )`;
    }

}

exports.GridWidget = GridWidget;