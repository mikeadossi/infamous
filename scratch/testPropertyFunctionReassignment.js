
// rotation of the pink square should not get faster.
testPropertyFunctionReassignment()
function testPropertyFunctionReassignment() {
    const {Motor, Node, Scene} = infamous.motor

    const scene = new Scene
    scene.mount(document.body)

    const node = new Node({
        absoluteSize: [200, 200],

        // place it in the middle of it's parent
        align: [0.5, 0.5],
        mountPoint: [0.5, 0.5],
    })

    node.element.innerHTML = 'Hello.'
    node.element.style.cssText = ' backface-visibility: visible; background: pink; padding: 5px; '

    scene.addChild(node)

    let count = 0

    setInterval(function() {
        node.rotation = function(x,y,z,time) {
            return count++ <= 5000 && [x+1, y+1]
        }
    }, 100)
}
