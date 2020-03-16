const { sz, tab } = require("../../utils");

// TODO: add Stack positioneds

class Children {
    /**
    * @param {string} type (Column, Row or Stack)
    * @param {No} node
    */
    constructor(type, node) {
        this.type = type;
        this.node = node;
        this.distances = [];
    }

    toDart(depth) {
        let widgets = [];
        this.updateBounds();
        this.node.children.forEach(child => {
            widgets.push(`${tab(depth + 2)}${child.toDart(depth + 2)}`);
        });
        this.updateDistances();
        this.addDistancesToWidget(widgets, depth);
        return `${this.type}(\n${tab(depth + 1)}children:[${widgets},${tab(depth + 1)}],${tab(depth)})`;
    }

    /**
    * Call distanceToDart() in distance and put in Widgets list
    * widgets.push(distanceToDart(distance));
    */
    addDistancesToWidget(widgets, depth) {
        if (this.distances.length > 0) {
            const withSpacer = true;
            this.withSpacer = withSpacer;
            for (let i = 0, qtd = 0; i < widgets.length; i += 2, qtd++) {
                const distance = this.distanceToDart(this.distances[qtd], depth + 2);
                if (distance != ``) {
                    widgets.splice(i, 0, distance);
                }
            }
            if (withSpacer) {
                const distance = this.distanceToDart(this.distances[this.distances.length - 1], depth + 2);
                if (distance != ``) {
                    widgets.push(distance);
                }
            }
        }
    }

    /**
    * This function update Children Bounds to be compatible with Father's Bounds
    */
    updateBounds() {
        if (this.node.father != null) {
            const type = this.type;
            // const fatherType = this.node.father.type; 
            const fatherIsChildren = this.node.father.isChildren();
            if (type == `Column` || type == `Stack` || !fatherIsChildren) {
                this.node.bounds.y1 = this.node.father.bounds.y1;
                this.node.bounds.y2 = this.node.father.bounds.y2;
            }
            if (type == `Row` || type == `Stack` || !fatherIsChildren) {
                this.node.bounds.x1 = this.node.father.bounds.x1;
                this.node.bounds.x2 = this.node.father.bounds.x2;
            }
        }
    }

    /**
    * Add distances between widgets in Row or Column (no effect on Stack)
    */
    updateDistances() {
        this.distances = [];
        if (this.type != 'Stack') {
            let bounds = this.
                getBounds1(this.node);
            this.distances.push(this.
                getBounds1(this.node.children[0]) - bounds);
            for (let i = 1; i < this.node.children.length; i++) {
                const child = this.node.children[i];
                const antChild = this.node.children[i - 1];
                this.distances.push(this.
                    getBounds1(child) - this.getBounds2(antChild));
            }
            bounds = this.getBounds2(this.node);
            this.distances.push(bounds - this.getBounds2(this.node.children[this.node.children.length - 1]));
        }
    }

    /**
    * @return {String} Distance Dart code (Spacer or SizedBox)
    */
    distanceToDart(distance, depth) {
        if (distance > 0) {
            if (this.withSpacer) {
                return `${tab(depth)}Spacer(flex:${Math.round(distance)})`
            }
            const width = this.type == 'Row' ? `width:${sz(distance, true)}` : ``;
            const height = this.type == 'Column' ? `height:${sz(distance, false)}` : ``;
            if (width != `` || height != ``) {
                return `${tab(depth)}SizedBox(${width}${height})`
            }
        }
        return ``;
    }

    /**
    * @return {number} x1 or y1 No bounds
    */
    getBounds1(no) {
        return (this.type == 'Row' ? no.bounds.x1 : no.bounds.y1);
    }

    /**
    * @return {number} x2 or y2 No bounds
    */
    getBounds2(no) {
        return (this.type == 'Row' ? no.bounds.x2 : no.bounds.y2);
    }

    alignment() {
        // TODO: improve row and column distances: Unnecessary distances to MainAlignment.better
        /*
        ? Row and Column
       start
       center
       end
       spaceAround
       spaceBetween
       spaceEvenly
       */
    }
}

module.exports = {
    Children: Children,
};