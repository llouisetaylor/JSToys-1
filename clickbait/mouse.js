function hasTouch() {
    return !!('ontouchstart' in window);
}
function hasMouse() {
    return !!('onmousemove' in window);
}

if (hasMouse) {
    if (hasTouch) {
        // remove all event listeners
    };
    document.body.style.cursor = 'none';

    var mouse = document.createElement('img');
    var isMac = window.navigator.platform.toLowerCase().indexOf('mac') != -1;
    mouse.src = isMac
        ? 'http://tobiasahlin.com/static/cursors/default@2x.png'
        : ''
    mouse.style.position = 'absolute';
    document.body.appendChild(mouse);
    document.body.addEventListener('mousemove', function(event) {
        mouse.style.top = `${event.pageY}px`;
        mouse.style.left = `${event.pageX}px`;
    })
    document.body.addEventListener('onmouseleave', function(event) {
        console.log('out');
        document.removeChild(mouse);
    })
};

