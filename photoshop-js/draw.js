var currentColor = 'red';
var currentWeight = 10;

function Line(initialPoint, color, weight) {
  var _this = this;
  var vertices = [initialPoint];
  this.color = color;
  this.weight = weight;
  this.segments = [];

  this.addPoint = function(point) {
    var lastPoint = vertices[vertices.length - 1];
    vertices.push(point);
    var dX = point[0] - lastPoint[0];
    var dY = point[1] - lastPoint[1];
    var midpoint = [(point[0] + lastPoint[0]) / 2, (point[1] + lastPoint[1]) / 2];
    var length = (dX ** 2 + dY ** 2) ** 0.5
    var rad = Math.atan(dX / -dY);
    var lineSegment = document.createElement('div');
    lineSegment.className = 'canvas line-segment';
    lineSegment.style.height = length + 'px';
    lineSegment.style.width = 0;
    lineSegment.style.border = (weight / 2) + 'px solid ' + color;
    lineSegment.style.borderRadius = weight / 2 + 'px';
    lineSegment.style.transform = 'rotate(' + rad + 'rad)';
    lineSegment.style.left = midpoint[0] + 'px';
    lineSegment.style.top = midpoint[1] - length / 2 + 'px';
    _this.segments.push(lineSegment);
    document.body.append(lineSegment);
  }
  this.remove = function() {
    while(_this.segments.length > 0) {
      _this.segments[0].remove();
      _this.segments.shift();
    }
  }
}
var isDown = false;
var lines = [];
var currentLine;
document.addEventListener('mousedown', function(event) {
  isDown = true;
  currentLine = new Line([event.clientX, event.clientY], currentColor, currentWeight)
  lines.push(currentLine);
});
document.addEventListener('mousemove', function(event) {
  if(isDown == true) {
    currentLine.addPoint([event.clientX, event.clientY]);
  }
});
document.addEventListener('mouseup', function() {
  isDown = false;
});

function remove() {
  lines[0].remove();
  lines.shift();
}
