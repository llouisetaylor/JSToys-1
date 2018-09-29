let currentStyle = 'brush';
const CONTAINER = document.querySelector('#container');

class Line {
    constructor(initialPoint, color) {
        this.vertices = [initialPoint];
        this.edges = [];
        this.color = color;
        this.previousVertex = initialPoint;
        this.div = document.createElement('div');
        this.div.style.color = color;
        this.div.className = currentStyle;
        CONTAINER.appendChild(this.div);
    }

    addPoint(nextPoint) {
        const prevPoint = this.vertices[this.vertices.length - 1];
        const dX = nextPoint[0] - prevPoint[0];
        const dY = nextPoint[1] - prevPoint[1];
        const midpoint = [(nextPoint[0] + prevPoint[0]) / 2, (nextPoint[1] + prevPoint[1]) / 2];
        const length = (dX ** 2 + dY ** 2) ** 0.5;
        const radians = Math.atan(dX / -dY);

        const newEdge = document.createElement('span');
        newEdge.className = 'canvas line';

        Object.assign(newEdge.style, {
            height: `${length}px`,
            transform: `rotate(${radians}rad)`,
            left: `${midpoint[0]}px`,
            top: `${midpoint[1] - length / 2}px`,
        });

        this.div.appendChild(newEdge);
        this.vertices.push(nextPoint);
        this.edges.push(newEdge);
    }
}

let isDown = false;
const lines = [];
CONTAINER.addEventListener('mousedown', function(event) {
    isDown = true;
    const hue = document.getElementById('colour').value;
    lines.push(new Line([event.clientX, event.clientY], `hsl(${hue}, 100%, 50%)`));
});
CONTAINER.addEventListener('mousemove', function(event) {
    if (isDown == true) {
        lines[lines.length - 1].addPoint([event.clientX, event.clientY]);
    }
    event.preventDefault();
});
document.addEventListener('mouseup', function() {
    isDown = false;
});

function popLines() {
    if (lines.length) {
        lines[lines.length - 1].div.remove();
        lines.pop();
    }
}
function clearCanvas() {
    while (lines.length) {
        popLines();
    }
}
