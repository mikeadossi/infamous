
imperativeAddRemove()
function imperativeAddRemove() {
    var {Node, Scene, Motor} = infamous.motor

    var scene = new Scene({
        //sizeMode: {x:'absolute', y:'absolute'},
        sizeMode: {x:'proportional', y:'proportional'},
        absoluteSize: [200, 200],
        proportionalSize: [0.5, 0.5],
    })
    scene.element.style.border = `1px solid red`

    var node = new Node({
        //sizeMode: {x:'absolute', y:'absolute', z:'absolute'},
        sizeMode: ['proportional', 'proportional'],
        proportionalSize: [.5, .5],
        absoluteSize: [100, 100],
        rotation: {y: 55},
        position: [20, 20],
    })
    node.element.style.border = '1px solid teal'

    scene.addChild(node)

    Motor.addRenderTask(function() {
        scene.proportionalSize.x += 0.000025
        node.rotation.y += 0.1
    })

    ~async function() {
        console.log('scratch: awaiting node mountPromise')
        await node.mountPromise
        console.log('scratch: node is mounted')
    }()

    ~async function() {
        console.log('scratch: awaiting scene mountPromise')
        await scene.mountPromise
        console.log('scratch: scene is mounted')
    }()

    console.log(' ################## scratch: Done with first turn.')

    setTimeout(() => {
        console.log('scratch: mounting the scene')
        scene.mount(document.body)
    }, 100)

    setTimeout(() => {
        console.log('scratch: Unmount node.')
        scene.removeChild(node)
    }, 200)

    setTimeout(() => {
        console.log('scratch: get mountPromise and await again')
        ~async function() {
            await node.mountPromise
            console.log('scratch: Node mounted again.')
        }()
    }, 300)

    setTimeout(() => {
        console.log('scratch: remount node.')
        scene.addChild(node)
    }, 400)

    setTimeout(() => {
        ~async function() {
            console.log(' ################## scratch: await mountPromise after mount.')
            await node.mountPromise
            console.log('scratch: Node mounted.')
        }()

        console.log('scratch: Remove node.')
        scene.removeChild(node)
    }, 500)

    setTimeout(() => {
        scene.addChild(node)
    }, 700)

}
