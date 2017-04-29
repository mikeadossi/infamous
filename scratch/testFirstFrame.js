
// Causes a Node to added and removed over and over, and we should not see any
// visual artifact from the node being added then styling being applied in the
// following frame after the Node is already visible (which would cause a flicker
// glitch).
testFirstFrame()
async function testFirstFrame() {

    document.body.innerHTML = (`
        <motor-scene absoluteSize="400, 300, 100" sizeMode="absolute, absolute, absolute">
          <motor-node id="node" absoluteSize="400, 300, 100" align="0.5, 0.5, 0" mountPoint="0.5, 0.5, 0" rotation="0, 30, -10" opacity="1"
              style="
                  outline: 5px solid blue;
                  background: lightskyblue;
              ">

            <motor-node class="outer" sizeMode="proportional, proportional, absolute" proportionalSize="0.25, 0.25, 0" mountPoint="0.5, 0.5, 0"
                align="0.2, 0.2, 0"
                style="outline: 1px solid red" >
                <motor-node class="inner" sizeMode="proportional, proportional, absolute" proportionalSize="0.25, 0.25, 0" mountPoint="0.5, 0.5, 0"
                    align="0.2, 0.2, 0"
                    style="outline: 1px solid red" >
                </motor-node>
            </motor-node>

          </motor-node>
        </motor-scene>
    `)

    const threeDee = document.querySelector('#node')

    await threeDee.mountPromise

    let {imperativeCounterpart: node} = threeDee
    let {parent} = node
    let isAdded = true
    let rotation = 0
    let {Motor} = infamous.motor

    Motor.addRenderTask(async function() {
        rotation += 1
        //node.rotation = [rotation, rotation, 0]
        node.rotation = {x:rotation, y:rotation, z:0}

        if (rotation % 60 === 0) {
            if (isAdded) {
                parent.removeChild(node)
                isAdded = false

                await node.mountPromise
                console.log(' -- node mounted!')
            }
            else {
                parent.addChild(node)
                isAdded = true
            }
        }
    })
}
