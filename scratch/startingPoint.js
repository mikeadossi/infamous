
startingPoint()
function startingPoint() {
    const {Motor} = infamous.motor

    document.body.innerHTML = `
        <motor-scene>
            <motor-node
                absoluteSize="200 200" align="0.5 0.5" mountPoint="0.5 0.5"
                style=" backface-visibility: visible; background: pink; padding: 5px; "
                >

                Hello.

            </motor-node>
        </motor-scene>
    `

    window.addEventListener('load', function() {
        var node = document.querySelector('motor-node')
        var tween = new TWEEN.Tween(node.rotation)
          .to({y: 360}, 5000)
          .easing(TWEEN.Easing.Elastic.InOut)
          .start()

        Motor.addRenderTask(now => {
            tween.update(now)
        })
    })
}
