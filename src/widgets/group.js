const { randomColor } = require("./util/widgets_util");
const { Bounds } = require("../bounds");

class GroupWidget {
    constructor(XdNode) {
        this.XdNode = XdNode;
        this.bounds = new Bounds(XdNode);
    }

    toDart() {
        const { itemsToDart } = require("../items_to_dart");
        const { removeItemsFromGroup } = require("../util");
        const ungroupedItems = removeItemsFromGroup(this.XdNode.children);
        const itemsDart = itemsToDart(ungroupedItems);
        //TODO: put SizedBox
        return `
        // ${this.XdNode.name} Group
        SizedBox(
            width: ${this.XdNode.localBounds.width},
            height: ${this.XdNode.localBounds.height},
            child: ${itemsDart},
        )`;
    }

}

exports.GroupWidget = GroupWidget;